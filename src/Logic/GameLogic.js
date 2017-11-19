import PacmanLogic from './PacManLogic';
import GhostLogic from './GhostLogic';
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';
import { randomIntFromInterval, Sqr, matrixOp } from './Utils';

const FILL_SIDES_WALL = true;


export default class GameLogic {
    constructor(onGameStep,settings) {
        this.onGameStepCallback = onGameStep;
        this.gameStepInterval = null;
        if(settings)
            this.init(settings);
    }

    init(settings) {
        let {xBlocks,yBlocks,wallPercent,refreshDelay} = settings;
        this.xBlocks = xBlocks;
        this.yBlocks = yBlocks;
        this.refreshRate = refreshDelay;

        this.initializeGameGrid(this.getValidatedWallPercent(wallPercent), xBlocks, yBlocks);
        this.initializeGameComponents();
    }

    getValidatedWallPercent(wallPercent) {
        let MIN_WP = 0;
        let MAX_WP = 0.9;

        if (wallPercent > MAX_WP || wallPercent < MIN_WP) {
            wallPercent = (MAX_WP + MIN_WP) / 2;
        }

        return wallPercent;
    }

    initializeGameGrid(wallPercent, xBlocks, yBlocks) {
        this.grid = Array(yBlocks).fill().map(() => Array(xBlocks).fill(PIECES_TYPES.UNDEF));
        this.emptyCells = new Set();
        matrixOp(this.grid, (x, y, matrix) => {
            matrix[y][x] = Sqr(PIECES_TYPES.EMPTY, "");
        });
        this.fillWalls(this.grid, 1 - wallPercent);

    }

    fillWalls(grid,fillChance) {
        let up = (x, y) => this.getPieceType(x, y - 1) === PIECES_TYPES.WALL;
        let left = (x, y) => this.getPieceType(x - 1, y) === PIECES_TYPES.WALL;
        let right = (x, y) => this.getPieceType(x + 1, y) === PIECES_TYPES.WALL;
        let down = (x, y) => this.getPieceType(x, y + 1) === PIECES_TYPES.WALL;
        let sides = (x, y) => { return { up: up(x, y), down: down(x, y), left: left(x, y), right: right(x, y) }; };

        var wallList = [];
        matrixOp(grid, (x, y, matrix) => {
            if (Math.random() > fillChance) {
                matrix[y][x].type = PIECES_TYPES.WALL;
            }
            else{
                this.emptyCells.add(`${x},${y}`);
            }
        });

        if (FILL_SIDES_WALL) {
            matrixOp(grid, (x, y, matrix) => {
                if (x == this.xBlocks - 1 || y == this.yBlocks - 1 || x == 0 || y == 0) {
                    matrix[y][x].type = PIECES_TYPES.WALL;
                    this.emptyCells.delete(`${x},${y}`);
                }
            });
        }
        // TODO:FIX 
        //wallList.forEach((val) => {grid[val.y][val.x].value = <Wall sides={sides(val.x, val.y)} /> });
    }

    initializeGameComponents() {
        this.pacman = new PacmanLogic(this.getRandomEmptyLocation());
        //TODO: set game components on grid.
        let pacmanLocation = this.pacman.getLocation();
        this.grid[pacmanLocation.y][pacmanLocation.x].type = PIECES_TYPES.PACKMAN;
        //this.enemies = [new GhostLogic(this.getRandomEmptyLocation())];
    }

    startGame() {
        this.gameStepInterval = setInterval(
            () => {
               this.updatePiece(this.pacman);
                //TODO: go over enemies pieces -> update their locations
                this.onGameStepCallback(this.grid); //TODO: clone or use an immutable object
            },
            this.refreshRate);
    }

    endGame() {
        clearInterval(this.gameStepInterval);
        //TODO: clean state
    }

    getRandomEmptyLocation() {//TODO: Fix logic - this is not guaranteed to be empty.
        let randomEmptyCell = [...this.emptyCells][randomIntFromInterval(this.emptyCells.size)];
        this.emptyCells.delete(randomEmptyCell);
        randomEmptyCell = randomEmptyCell.split(',').map((val) => {
            return parseInt(val)
        });

        let randomEmptyLocation =  {
            x: randomEmptyCell[0],
            y: randomEmptyCell[1]
        };

        return randomEmptyLocation;
    }

    getTypeSurround(location, radius) {
        let {x,y} = location;
        let size = radius * 2 + 1;
        let sourroundingTypes = Array(size);

        let inY = 0;

        for (let i = y - radius; i <= (y + radius); ++i) {
            let inX = 0;
            sourroundingTypes[inY] = Array(size);
            for (let j = x - radius; j <= (x + radius); ++j) {
                sourroundingTypes[inY][inX] = this.getPieceType(j, i);
                inX++;
            }
            inY++;
        }

        return sourroundingTypes;

    }

    getPieceType(x, y) {
        if (x < 0 || x >= this.xBlocks || y < 0 || y >= this.yBlocks)
            return PIECES_TYPES.UNDEF;
        else return this.grid[y][x].type;
    }

    updatePiece(piece) {
        let pieceLocation = piece.getLocation();
        this.swapPiecesLocation(pieceLocation, piece.updateLocation(this.getTypeSurround(pieceLocation, 1)));
    }

    swapPiecesLocation(locA, locB) {
        [this.grid[locA.y][locA.x], this.grid[locB.y][locB.x]] = [this.grid[locB.y][locB.x], this.grid[locA.y][locA.x]];

    }

}
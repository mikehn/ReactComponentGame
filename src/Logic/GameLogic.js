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
        matrixOp(this.grid, (x, y, matrix) => { matrix[y][x] = Sqr(PIECES_TYPES.EMPTY, ""); }); 
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
        });

        if (FILL_SIDES_WALL) {
            matrixOp(grid, (x, y, matrix) => {
                if (x == this.xBlocks - 1 || y == this.yBlocks - 1 || x == 0 || y == 0) {
                    this.grid[y][x].type = PIECES_TYPES.WALL;
                }
            });
        }
        // TODO:FIX 
        //wallList.forEach((val) => {grid[val.y][val.x].value = <Wall sides={sides(val.x, val.y)} /> });
    }

    initializeGameComponents() {
        this.pacman = new PacmanLogic(...this.getRandomEmptyLocation());
        //TODO: set game components on grid.
        this.grid[1][1].type = PIECES_TYPES.PACKMAN;
        this.enemies = [new GhostLogic(...this.getRandomEmptyLocation())];
    }

    startGame() {
        this.gameStepInterval = setInterval(
            () => {
                //TODO: go over pieces -> update their locations
                // send data to renderer (setState via callback)
               //this.updatePiece(this.pacman);
                this.onGameStepCallback(this.grid); //TODO: clone or use an immutable object
            },
            this.refreshRate);

    }

    endGame() {
        clearInterval(this.gameStepInterval);
        //TODO: clean state
    }

    getRandomEmptyLocation() {//TODO: Fix logic - this is not garantied to be empty.
        let randomXLocation = randomIntFromInterval(this.xBlocks);
        let randomYLocation = randomIntFromInterval(this.yBlocks);

        return {
            x: randomXLocation,
            y: randomYLocation
        }
    }

    getTypeSurround(x, y, radius) {

        var size = radius * 2 + 1;
        var sourroundingTypes = Array(size);

        var inY = 0;

        for (var i = y - radius; i <= (y + radius); ++i) {
            var inX = 0;
            sourroundingTypes[inY] = Array(size);
            for (var j = x - radius; j <= (x + radius); ++j) {
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
        this.swapPiecesLocation({ x: piece.x, y: piece.y }, piece.updateLocation(this.getTypeSurround(piece.x, piece.y, 1)));
    }

    swapPiecesLocation(locA, locB) {
        [this.grid[locA.y][locA.x], this.grid[locB.y][locB.x]] = [this.grid[locB.y][locB.x], this.grid[locA.y][locA.x]];
    }

}
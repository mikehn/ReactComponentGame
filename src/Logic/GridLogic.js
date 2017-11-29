import { randomIntFromInterval, matrixOp, blockId } from './Utils';
import NonTypeLogic from './NonTypeLogic';
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';
import WallLogic from "./WallLogic";


let FILL_SIDES_WALL = true;

export default class GridLogic {

    constructor(xBlocks, yBlocks, wallPercent) {
        this.players = new Set();
        this.xBlocks = xBlocks;
        this.yBlocks = yBlocks;
        this.initializeGameGrid(this.getValidatedWallPercent(wallPercent), xBlocks, yBlocks);
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
        this.grid = Array(yBlocks).fill().map(() => Array(xBlocks).fill(new NonTypeLogic(PIECES_TYPES.UNDEF, -1, -1)));
        this.emptyCells = new Set();
        matrixOp(this.grid, (x, y, matrix) => {
            this.addPieceToGrid(new NonTypeLogic(PIECES_TYPES.EMPTY, x, y));
        });
        this.fillWalls(this.grid, 1 - wallPercent);

    }

    fillWalls(grid, fillChance) {
        matrixOp(grid, (x, y, matrix) => {
            if (Math.random() > fillChance) {
                matrix[y][x] = new WallLogic();
            }
            else {
                this.emptyCells.add(`${x},${y}`);
            }
        });

        if (FILL_SIDES_WALL) {
            matrixOp(grid, (x, y, matrix) => {
                if (x == this.xBlocks - 1 || y == this.yBlocks - 1 || x == 0 || y == 0) {
                    matrix[y][x] = new WallLogic();
                    this.emptyCells.delete(`${x},${y}`);
                }
            });
        }

    }

    getRandomEmptyLocation() {
        let randomEmptyCell = [...this.emptyCells][randomIntFromInterval(this.emptyCells.size)];
        this.emptyCells.delete(randomEmptyCell);
        randomEmptyCell = randomEmptyCell.split(',').map((val) => {
            return parseInt(val)
        });

        let randomEmptyLocation = {
            x: randomEmptyCell[0],
            y: randomEmptyCell[1]
        };

        return randomEmptyLocation;
    }

    addPlayerTypeToGrid(piece) {
        let loc = this.getRandomEmptyLocation();
        this.grid[loc.y][loc.x] = piece
        piece.Location(loc.x, loc.y);
        this.players.add(piece);
        return piece;
    }

    addPieceToGrid(piece) {
        let loc = piece.Location();
        this.grid[loc.y][loc.x] = piece
        return piece;
    }

    getPieceType(x, y) {
        if (x < 0 || x >= this.xBlocks || y < 0 || y >= this.yBlocks)
            return PIECES_TYPES.UNDEF;
        else return this.grid[y][x].getType();
    }

    getTypeSurround(location, radius) {
        let { x, y } = location;
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


    getLogicGrid(){
        return this.grid;
    }

    getComponents() {

        let compMat = new Array(this.yBlocks);
        for (var i = 0; i < compMat.length; ++i) {
            compMat[i] = [];
        }
        matrixOp(this.grid, (x, y, mat) => {
            compMat[y][x] = mat[y][x].getComponent();
        });

        return compMat;
    }

    getPlayers() {
        return this.players;
    }

    swapPiecesLocation(locA, locB) {
        let idA = this.grid[locA.y][locA.x].getId();
        let idB = this.grid[locB.y][locB.x].getId();
        if (document.getElementById(idA) != null)
            if (document.getElementById(idB) != null) {            
                document.getElementById(idB).style.gridArea = blockId(locA.x,locA.y);
                document.getElementById(idA).style.gridArea = blockId(locB.x,locB.y);;
            }
        // document.getElementById("m_0_0").style.gridTemplateColumns = `repeat(${this.props.xBlocks},${(this.props.size-1)}px)`;
        [this.grid[locA.y][locA.x], this.grid[locB.y][locB.x]] = [this.grid[locB.y][locB.x], this.grid[locA.y][locA.x]];

    }

}
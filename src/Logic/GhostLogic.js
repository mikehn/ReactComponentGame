import React from 'react';
import { MOVE_DIRECTION, PIECES_TYPES } from "../components/GamePieces/Consts";
import GridPiece from "./GridPiece";
import WinMessage from "../components/WinMessage";


class GhostLogic extends GridPiece {

    constructor(component) {
        super(PIECES_TYPES.GHOST, component);
        this.name = component.type.name;
        this.nextLoc = MOVE_DIRECTION.CENTER;
        this.moveNumber = 0;
        this.lastMoveSuccess = true;
        this.isWin = false;
        this.component = React.cloneElement(
            component,
            {
                setNextMove: (loc) => { this.nextLoc = loc; this.moveNumber++ },
                lastMoveSuccess: this.lastMoveSuccess,
                winMessage: (msg) => ""
            }
        )
    }
    getComponent(sides) {
        this.updateComponent(sides);
        return this.component;
    }

    getSideObject(sides) {
        return {
            topLeft: sides[0][0],
            top: sides[0][1],
            topRight: sides[0][2],
            left: sides[1][0],
            right: sides[1][2],
            bottomLeft: sides[2][0],
            bottom: sides[2][1],
            bottomRight: sides[2][2],
            isNextTo: (type) => {
                let res = false;
                this.sideArray().forEach(element => {
                    if (element === type) {
                        res = true;
                        return;
                    }
                });
                return res;
            },
            directions: () => ["topLeft", "top", "topRight",
                "left", "right",
                "bottomLeft", "bottom", "bottomRight"]
            ,
            elements: () => {
                let sideArr = [];
                let idx = 0;
                for (let i = 0; i < sides.length; ++i) {
                    for (let j = 0; j < sides[i].length; ++j) {
                        if (!(i === 1 && j === 1))
                            sideArr[++idx] = sides[i][j];
                    }
                }
                return sideArr;
            }
        }
    }


    getWinComponent(msg) {
        return <WinMessage name={this.name} msg={msg} />;
    }

    updateLocation(sides) {
        this.updateComponent(sides);
        return this.validateMove(sides);
    }

    updateComponent(sides) {
        this.component = React.cloneElement(
            this.component,
            {
                sides: this.getSideObject(sides),
                lastMoveSuccess: this.lastMoveSuccess,
                winMessage: (this.isWin ? (msg) => this.getWinComponent(msg) : (msg) => "")
            }
        );
    }

    buildCordinateMap() {
        let cordMap = {};
        let selfX = 1;
        let selfY = 1;
        let Loc = (x, y) => ({ x, y });
        cordMap[MOVE_DIRECTION.TOP] = Loc(selfX, 0);
        cordMap[MOVE_DIRECTION.BOTTOM] = Loc(selfX, 2);
        cordMap[MOVE_DIRECTION.LEFT] = Loc(0, selfY);
        cordMap[MOVE_DIRECTION.RIGHT] = Loc(2, selfY);
        cordMap[MOVE_DIRECTION.CENTER] = Loc(selfX, selfY);
        return cordMap;
    }

    /**
     * updates peice location and validates move to be legal.
     * @param {*} sides surround matrix
     */
    validateMove(sides) {
        let Loc = (x, y) => ({ x, y });
        this.sides = sides; // not sure if needed

        if (!MOVE_DIRECTION.DIRECTIONS.includes(this.nextLoc)) {
            this.lastMoveSuccess = false;
            this.nextLoc = MOVE_DIRECTION.CENTER;
        }

        let newSelf = this.buildCordinateMap()[this.nextLoc];
        this.lastMoveSuccess = true;

        switch (sides[newSelf.y][newSelf.x]) {
            case PIECES_TYPES.PACMAN:
                this.isWin = true;
                break;
            case PIECES_TYPES.EMPTY:
                this.x += (newSelf.x - 1);//-1 corrdinate base correction (0,1,2) -> (-1,0,1)
                this.y += (newSelf.y - 1);
                break;
            case PIECES_TYPES.WALL:
            // fall through
            case PIECES_TYPES.GHOST:
                this.lastMoveSuccess = false;
                break;
            default:
                break;
        }
        this.isWinner = this.isWin;
        return this.Location();
    }


}

export default GhostLogic;

import React, { Component } from 'react';
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';
import { GAME_CONSTS } from "../components/GamePieces/Consts";

function Loc(x, y) {
    return { x, y };
}

class GhostLogic {

    constructor(value, location, sides) {
        this.sides = sides;
        this.x = location.x;
        this.y = location.y;
        this.nextLoc = GAME_CONSTS.CENTER;
        this.value = React.cloneElement(
            value,
            {
                setNextMove: (loc) => { this.nextLoc = loc; },
            }
        )

    }


/**
 * updates peice location and validates move to be legal.
 * @param {*} sides surround matrix
 */
    updateLocation(sides) {
       
        this.value = React.cloneElement(
             this.value ,
            {
                sides: sides,
            }
        );
        this.sides = sides; // not sure if needed
        let cordMap = {};
        let selfX = 1;
        let selfY = 1;
        if (!GAME_CONSTS.DIRECTIONS.includes(this.nextLoc)) {
            //TODO: Mark ERROR
            this.nextLoc = GAME_CONSTS.CENTER;
        }
        cordMap[GAME_CONSTS.UP] = Loc(selfX, 0);
        cordMap[GAME_CONSTS.DOWN] = Loc(selfX, 2);
        cordMap[GAME_CONSTS.LEFT] = Loc(0, selfY);
        cordMap[GAME_CONSTS.RIGHT] = Loc(2, selfY);
        cordMap[GAME_CONSTS.CENTER] = Loc(selfX, selfY);

        let newSelf = cordMap[this.nextLoc];

        switch (sides[newSelf.y][newSelf.x]) {
            case PIECES_TYPES.PACKMAN:
            // TODO: win logic
            case PIECES_TYPES.EMPTY:
                this.x += (newSelf.x - 1);//-1 corrdinate base correction (0,1,2) -> (-1,0,1)
                this.y += (newSelf.y - 1);
                break;
            case PIECES_TYPES.WALL:
            case PIECES_TYPES.GHOST:
            // ILLEGAL MOVE

        }

        return this.getLocation();
    }


    getType() {
        return PIECES_TYPES.GHOST;
    }

    getLocation() {
        return {
            x: this.x,
            y: this.y
        }
    }

    getComponent() {
        return this.value;
    }

}

export default GhostLogic;

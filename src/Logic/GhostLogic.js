import React, { Component } from 'react';
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';
import { MOVE_DIRECTION } from "../components/GamePieces/Consts";
import GridPiece from "./GridPiece";



class GhostLogic extends GridPiece{

    constructor(component) {
        super(PIECES_TYPES.GHOST,component);
        this.nextLoc = MOVE_DIRECTION.CENTER;
        this.component = React.cloneElement(
            component,
            {
                setNextMove: (loc) => { this.nextLoc = loc; },
            }
        )
        console.log(component);


    }

    getSideObject(sides){
        return {
            topLeft:sides[0][0],
            top:sides[0][1],
            topRight:sides[0][2],
            left:sides[1][0],
            right:sides[1][2],
            bottomLeft:sides[2][0],
            bottom:sides[2][1],
            bottomRight:sides[2][2]
            
        }
    }


    /**
     * updates peice location and validates move to be legal.
     * @param {*} sides surround matrix
     */
    updateLocation(sides) {
        let Loc = (x, y) => ({ x, y });
        let lastMoveStatus = true;
        this.sides = sides; // not sure if needed
        let cordMap = {};
        let selfX = 1;
        let selfY = 1;
        if (!MOVE_DIRECTION.DIRECTIONS.includes(this.nextLoc)) {
            lastMoveStatus = false;
            this.nextLoc = MOVE_DIRECTION.CENTER;
        }
        cordMap[MOVE_DIRECTION.TOP] = Loc(selfX, 0);
        cordMap[MOVE_DIRECTION.BOTTOM] = Loc(selfX, 2);
        cordMap[MOVE_DIRECTION.LEFT] = Loc(0, selfY);
        cordMap[MOVE_DIRECTION.RIGHT] = Loc(2, selfY);
        cordMap[MOVE_DIRECTION.CENTER] = Loc(selfX, selfY);

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
                lastMoveStatus = false;

        }

        this.component = React.cloneElement(
            this.component,
            {
                sides: this.getSideObject(sides),
                lastMoveStatus
            }
        );

        return this.Location();
    }


}

export default GhostLogic;

import React from 'react';
import Wall from '../components/GamePieces/Wall';
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';
import GridPiece from "./GridPiece";

export default class WallLogic extends GridPiece{
    constructor(){
        let sides = new Array(3).fill((new Array(3)).fill(PIECES_TYPES.EMPTY));
        super(PIECES_TYPES.WALL,<Wall sides={sides} />);
        
    }

    getType(){
        return PIECES_TYPES.WALL;
    }
    updateWallSides(sides){
        // let up = sides[0][1] == PIECES_TYPES.WALL;
        // let left = sides[1][0] == PIECES_TYPES.WALL;
        // let right = sides[1][2] == PIECES_TYPES.WALL;
        // let down = sides[2][1] == PIECES_TYPES.WALL;
        
    }
}
import GridLogic from './GridLogic';
import PacmanLogic from './PacManLogic';
import GhostLogic from './GhostLogic';
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';
import { randomIntFromInterval, Sqr, matrixOp } from './Utils';
import React, { Component}  from 'react';
import Ghost from "../components/GamePieces/Ghost";

 
//TODO: move to settings
const FILL_SIDES_WALL = true;


export default class GameLogic {
    constructor(settings) {
        this.gameStepInterval = null;
        if (settings)
            this.init(settings);
    }

    init(settings) {
        let { xBlocks, yBlocks, wallPercent, refreshDelay,cubeSize } = settings;
        this.xBlocks = xBlocks;
        this.yBlocks = yBlocks;
        this.refreshRate = refreshDelay;
        this.cubeSize = cubeSize;
        this.grid = new GridLogic(xBlocks,yBlocks,wallPercent);
        this.initializeGameComponents();
    }
//TODO: fix
    getComponents(){
        return this.grid.getComponents();
    }

    setNextMove(direction){

    }

    // TODO: remove to external file.
    getGhosComponentSet = () => {
        let gSet = new Set()
        gSet.add(<Ghost size={40} />);
       
        return gSet;
    }

    initGhosts(){
        let gcSet = this.getGhosComponentSet();        
        gcSet.forEach(ghost => {
            this.grid.addPlayerTypeToGrid(new GhostLogic(ghost));
        });
    }

    initializeGameComponents() {
        // Add pacman.
        this.grid.addPlayerTypeToGrid(new PacmanLogic(this.cubeSize));
        this.initGhosts();
    }

    startGame() {
        this.gameStepInterval = setInterval(
           
            () => {
                this.grid.getPlayers().forEach((player)=>{
                    this.updatePiece(player);
                })
            },
            this.refreshRate);
    }

    endGame() {
        clearInterval(this.gameStepInterval);
        //TODO: clean state
    }
    
    updatePiece(piece) {
        let pieceLocation = piece.Location();
        this.grid.swapPiecesLocation(pieceLocation, piece.updateLocation(this.grid.getTypeSurround(pieceLocation, 1)));
    }
}
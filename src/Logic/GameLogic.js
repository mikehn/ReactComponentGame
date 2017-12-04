import GridLogic from './GridLogic';
import PacmanLogic from './PacManLogic';
import GhostLogic from './GhostLogic';
import Ghosts from "../components/GamePieces/Ghosts";
import "./../style/start_button.css";
import { GAME_STATE } from '../components/GamePieces/Consts';


export default class GameLogic {
    constructor(settings) {
        this.gameStepInterval = null;
        if (settings)
            this.init(settings);


    }

    init(settings) {
        let { xBlocks, yBlocks, wallPercent, refreshDelay, cubeSize } = settings;
        this.xBlocks = xBlocks;
        this.yBlocks = yBlocks;
        this.refreshRate = refreshDelay;
        this.cubeSize = cubeSize;
        this.grid = new GridLogic(xBlocks, yBlocks, wallPercent);
        this.gameState = GAME_STATE.PRE_GAME;
        this.initializeGameComponents();

    }
    //TODO: might not be needed
    getComponents() {
        return this.grid.getLogicGrid();
    }

    setNextMove(direction) {

    }


    getGhosComponentSet = () => {
        let gSet = new Set()
        Ghosts.forEach(g => {
            console.log(g);
            gSet.add(g);
        });

        return gSet;
    }

    initGhosts() {
        let gcSet = this.getGhosComponentSet();
        gcSet.forEach(ghost => {
            this.grid.addPlayerTypeToGrid(new GhostLogic(ghost,this.cubeSize));
        });
    }

    initializeGameComponents() {
        // Add pacman.
        this.grid.addPlayerTypeToGrid(new PacmanLogic(this.cubeSize));
        this.initGhosts();
    }

    startGame() {
        this.gameState = GAME_STATE.PLAY;
        this.gameStepInterval = setInterval(

            () => {

                    this.grid.getPlayers().forEach((player) => {
                        this.updatePiece(player);
                        if (player.isWinner) {
                            this.endGame();
                        }

                    });

            },
            this.refreshRate);
    }

    getPieceSurround(piece){
        return this.grid.getTypeSurround(piece.Location(),1);
    }

    endGame() {
        this.gameState = GAME_STATE.WIN;
        clearInterval(this.gameStepInterval);
        //TODO: clean state
    }

    updatePiece(piece) {
        let pieceLocation = piece.Location();
        this.grid.swapPiecesLocation(pieceLocation, piece.updateLocation(this.grid.getTypeSurround(pieceLocation, 1)));
    }
}
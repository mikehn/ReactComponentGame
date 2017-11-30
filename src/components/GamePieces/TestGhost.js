import React, { Component } from 'react';
import "../../style/ghost.css";
import GhostEye from "./GhostEye";
import { MOVE_DIRECTION, PIECES_TYPES } from "../GamePieces/Consts";
import { randomIntFromInterval } from "../../Logic/Utils";

const DEFULAT_COLOR = "#c5a0e5";
const BAD_MOVE_COLOR = "red";

export default class TestGhost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: DEFULAT_COLOR,
        }
        this.lastMove = "right";

        //this.props.setNextMoveLogic(()=>GAME_CONSTS.RIGHT);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.lastMoveSuccess) {
            this.setState(() => ({ backgroundColor: BAD_MOVE_COLOR }))
        } else {
            this.setState(() => ({ backgroundColor: DEFULAT_COLOR }))
        }

        if (nextProps.sides !== this.props.sides) {
            let nextMove = this.getNextMove(nextProps.sides);
            this.props.setNextMove(nextMove);
        }
    }

    /**
     * 
     * @param {Object} sides sides object 
     *  sides =  {topLeft,top,topRight,left,right,bottomLeft,bottom,bottomRight}
     *  can be used as follows:
     *  let whatsOnTop = sides.top;
     *  or 
     *  let whatsOnTop = sides["top"];
     */
    getNextMove = (sides) => {
        let pacmanDirection = null;
        let freeDirections = [];
        MOVE_DIRECTION.DIRECTIONS.forEach(direction => {

            if (sides[direction] === PIECES_TYPES.PACMAN) {
                pacmanDirection = direction;
            } else if (sides[direction] === PIECES_TYPES.EMPTY) {
                freeDirections.push(direction);
            }
        });

        if (pacmanDirection !== null)
            return pacmanDirection;

        if (freeDirections.length === 0)
            return MOVE_DIRECTION.CENTER;

        if (sides[this.lastMove] !== PIECES_TYPES.EMPTY) {
            let randomIdx = randomIntFromInterval(freeDirections.length)
            this.lastMove = freeDirections[randomIdx];
        }

        return this.lastMove;
    };

    render() {
        let size = this.props.size;
        return (
            <div className="ghost" style={{ backgroundColor: this.state.backgroundColor, width: size, height: size }}>
                <GhostEye />
                <GhostEye />
                {this.props.winMessage("i am the champion...")}
            </div>
        );
    }

}


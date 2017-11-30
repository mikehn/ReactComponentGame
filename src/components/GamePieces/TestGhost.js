import React, { Component } from 'react';
import "../../style/ghost.css";
import GhostEye from "./GhostEye";
import { MOVE_DIRECTION, PIECES_TYPES } from "../GamePieces/Consts";


const DEFULAT_COLOR = "#c5a0e5";
const BAD_MOVE_COLOR = "red";

export default class TestGhost extends Component {
    constructor(props) {
        super(props);
        console.log("Ctor");
        this.state = {
            backgroundColor: DEFULAT_COLOR, //TODO: Should be a prop mapping to this.
            lastMove: "right"
        }

        //this.props.setNextMoveLogic(()=>GAME_CONSTS.RIGHT);

        //console.log("ctor");
    }

    componentWillMount() {
        console.log("componentWillMount");
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps");
        if (!nextProps.lastMoveSuccess) {
            this.setState(() => ({ backgroundColor: BAD_MOVE_COLOR }))
        } else {
            this.setState(() => ({ backgroundColor: DEFULAT_COLOR }))
        }

        if (nextProps.sides != this.props.sides) {
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

        MOVE_DIRECTION.DIRECTIONS.forEach(direction => {
           
            if (sides[direction] == PIECES_TYPES.PACKMAN){
                console.log("IM close");
                return direction;
            }
        });

        if (sides[this.state.lastMove] != PIECES_TYPES.EMPTY) {
            let dSize = MOVE_DIRECTION.DIRECTIONS.length
            let nextMove = MOVE_DIRECTION.DIRECTIONS[Math.floor(Math.random() * dSize)];
            this.setState(() => ({ lastMove: nextMove }));
            return nextMove;
        }
        return this.state.lastMove;
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


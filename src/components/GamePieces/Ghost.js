import React, { Component } from 'react';
import "../../style/ghost.css";
import { MOVE_DIRECTION,PIECES_TYPES } from "../GamePieces/Consts";

export default class Ghost extends Component {
    constructor(props) {
        super(props);
        console.log("Ctor");
        this.state = {
            backgroundColor: props.backgroundColor, //TODO: Should be a prop mapping to this.
            lastMove:"right"
        }
        
        //this.props.setNextMoveLogic(()=>GAME_CONSTS.RIGHT);
       
        //console.log("ctor");
    }
   
    componentWillMount() {    
        console.log("componentWillMount");
    }

    componentWillReceiveProps(nextProps) {
       // console.log("componentWillReceiveProps");
       console.log(nextProps.lastMoveStatus);
        if (nextProps.sides != this.props.sides) {
            let nextMove = this.getNextMove(nextProps.sides);
            this.props.setNextMove(nextMove);
        }
    }


    getNextMove = (sides) => {
        if( sides[this.state.lastMove] != PIECES_TYPES.EMPTY ){
            let dSize = MOVE_DIRECTION.DIRECTIONS.length
            let nextMove = MOVE_DIRECTION.DIRECTIONS[Math.floor(Math.random()*dSize)];
            console.log(nextMove);
            this.setState(()=>({lastMove:nextMove}));
            return nextMove;
        }
        return this.state.lastMove;
    };

    render() {
        return (
            <div className="ghost" style={{ backgroundColor: this.state.backgroundColor, width: this.props.size, height: this.props.size }}>
                <div className="eye" id="leftEye"></div>
                <div className="eye" id="rightEye"></div>
            </div>
        );
    }

}


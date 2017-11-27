import React, { Component } from 'react';
import "../../style/ghost.css";
import { GAME_CONSTS } from "../GamePieces/Consts";

export default class Ghost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: props.backgroundColor, //TODO: Should be a prop mapping to this.
            sides: props.sides,
        }
        
        //this.props.setNextMoveLogic(()=>GAME_CONSTS.RIGHT);
       
        console.log("ctor");
    }
   
    componentWillMount() {
        let nextMove = this.getNextMove(this.props.sides);
        this.props.setNextMove(nextMove);
        console.log("componentWillMount");
    }

    
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        if (nextProps.sides != this.state.sides) {
            let nextMove = this.getNextMove(nextProps.sides);
            this.props.setNextMove(GAME_CONSTS.LEFT);
        }
    }

    getNextMove(sides) {
        return GAME_CONSTS.RIGHT;
    }

    render() {
        return (
            <div className="ghost" style={{ backgroundColor: this.state.backgroundColor, width: this.props.size, height: this.props.size }}>
                <div className="eye" id="leftEye"></div>
                <div className="eye" id="rightEye"></div>
            </div>
        );
    }

}


import React, { Component } from 'react';
import "../../style/ghost.css";
import {GAME_CONSTS} from  "../GamePieces/Consts";

export default class Ghost extends Component {
    constructor(props){
        super(props);

        this.state = {
            backgroundColor: props.backgroundColor
        }

        this.props.setNextMove(GAME_CONSTS.DOWN);
    }
    
    render() {
        return (
            <div className="ghost" style={{backgroundColor: this.state.backgroundColor, width: this.props.size, height: this.props.size }}>
                <div className="eye" id="leftEye"></div>
                <div className="eye" id="rightEye"></div>
            </div>
        );
    }

}


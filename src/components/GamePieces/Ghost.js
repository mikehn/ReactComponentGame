import React, { Component } from 'react';
import "../../style/ghost.css";

export default class Ghost extends Component {
    constructor(props){
        super(props);

        this.state = {
            backgroundColor: props.backgroundColor
        }
    }

    render() {
        return (
            <div className="ghost" style={{backgroundColor: this.state.backgroundColor}}>
                <div className="eye" id="leftEye"></div>
                <div className="eye" id="rightEye"></div>
            </div>
        );
    }

}

export default Ghost;
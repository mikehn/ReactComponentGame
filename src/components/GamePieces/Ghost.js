import React, { Component } from 'react';
import "../../style/ghost.css";

export default class Ghost extends Component {
    constructor(props){
        super(props);

        this.state = {
            backgroundColor: props.backgroundColor
        }
    }

    getLocationFunction = (surround) => {
        return ()=>{
            return {x:1,y:1};
        }
    };

    render() {
        return (
            <div className="ghost" style={{backgroundColor: this.state.backgroundColor, width: this.props.size, height: this.props.size }}>
                <div className="eye" id="leftEye"></div>
                <div className="eye" id="rightEye"></div>
            </div>
        );
    }

}


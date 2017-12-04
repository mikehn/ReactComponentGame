import React, { Component } from 'react';
import "../style/start_button.css";



export default class App extends Component {
    render() {
        return (<div className="startButton"
            onClick={this.props.onClick}
            style={{ visibility: this.props.startGame ? "hidden" : "visible" }}>
            START GAME
         </div>);


    }
}


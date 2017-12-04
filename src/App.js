import React, { Component } from 'react';
import GameGrid from './components/GameGrid';
import Banner from './components/Banner';
import GameLogic from './Logic/GameLogic';
import {GameSettings} from './Logic/GameSettings';
import './style/App.css';


export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            startGame: false,
        };
        this.needsToStart = true;
        this.gameLogic = new GameLogic(GameSettings);
        
    }

    updateStartGame(bool){
        this.setState({startGame: bool})
    }

    render() {
        if (this.state.startGame && this.needsToStart) {
            this.gameLogic.startGame();
            this.needsToStart = false;
        }
        return (
            <div className="App">
               <Banner/>
                <div className="startButton" onClick={this.updateStartGame.bind(this, true)} style={{visibility: this.state.startGame ? "hidden" : "visible"}}>START GAME</div>
               <GameGrid
                         size={GameSettings.cubeSize}
                         xBlocks={GameSettings.xBlocks} 
                         yBlocks={GameSettings.yBlocks} 
                         logic= {this.gameLogic}
                />
            </div>
        );
    }
}
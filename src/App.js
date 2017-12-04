import React, { Component } from 'react';
import GameGrid from './components/GameGrid';
import Banner from './components/Banner';
import GameLogic from './Logic/GameLogic';
import {GameSettings} from './Logic/GameSettings';
import StartButton from "./components/StartButton";
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
               <StartButton startGame={this.state.startGame} onClick={()=>this.updateStartGame(true)}/>
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
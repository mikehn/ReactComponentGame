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
            data: []
        };

        this.gameLogic = new GameLogic(this.onGameStep,GameSettings);
    }

    onGameStep =(gridData)=>{
        this.setState(() => {
            data: gridData
        })
    };

    render() {
        return (
            <div className="App">
               <Banner/>
               <GameGrid data={this.state.data} 
                         size={GameSettings.cubeSize}
                         xBlocks={GameSettings.xBlocks} 
                         yBlocks={GameSettings.yBlocks} 
                />
            </div>
        );
    }
}
import React, { Component } from 'react';
import GameGrid from './components/GameGrid';
import Banner from './components/Banner';
import GameLogic from './Logic/GameLogic';
import './style/App.css';


export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        };

        this.gameLogic = new GameLogic(this.onGameStep);
        this.initGameLogic = this.initGameLogic.bind(this);
        this.onGameStep = this.onGameStep.bind(this);
    }

    getElementsCount(size, factor, shrink){
        let scaledSize = Math.floor(size * shrink);
        return (scaledSize - (scaledSize % factor)) / factor;
    }

    componentDidMount(){
        this.setState(() => {
            {
                xBlocks : this.getElementsCount(window.innerWidth, this.props.cubeSize, 0.95);
                yBlocks : this.getElementsCount(window.innerHeight, this.props.cubeSize, 0.86);
            }
        }, this.initGameLogic)
    }

    initGameLogic(){
        this.gameLogic.init(this.state.xBlocks, this.state.yBlocks, 0.1, 480);
    }

    onGameStep(gridData){
        this.setState(() => {
            data: gridData
        })
    }

    render() {
        return (
            <div className="App">
               <Banner/>
               <GameGrid data={this.state.data} size={this.props.cubeSize} xBlocks={this.state.xBlocks} yBlocks={this.state.yBlocks} />
            </div>
        );
    }
}
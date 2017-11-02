import React, { Component } from 'react';
import GameLogic from './GameLogic';
import GridBlock from './GridBlock';
import PacMan from './PacMan';
import Wall from './Wall';
import "../style/grid.css";

class GameGrid extends Component {

    constructor(props) {
        super(props);
        this.state = { clock: 1 };
       
        this.gameLogic = new GameLogic(this.props.xBlocks,this.props.yBlocks,0.1,this.props.size);
    }

    componentWillMount() {

        window.setInterval(
            () => { this.setState((prevState, props) => ({ clock: prevState.clock * -1 })); }
            , this.props.refreshRate
        );
    }

    renderGridBlocks(size, xBlocks, yBlocks) {
        var gridArray = [],key;
        this.gameLogic.matrixOp(this.gameLogic.grid,(x,y,matrix)=> {gridArray.push(this.gameLogic.getGridBlock(x,y,size));});
        this.gameLogic.update();
        return gridArray;
    }
   
    render() {
        var width = this.props.xBlocks * this.props.size ;
        var height = this.props.yBlocks * this.props.size;



        return (
            <div className="main-grid" style={{ width: width, height: height }}>
                {this.renderGridBlocks(this.props.size, this.props.xBlocks, this.props.yBlocks)}
            </div>
        );
    }
}

export default GameGrid;

import React, { Component } from 'react';
import GridBlock from './GridBlock';
import PacMan from './GamePieces/PacMan';
import Wall from './GamePieces/Wall';
import "../style/grid.css";

class GameGrid extends Component {

    constructor(props) {
        super(props);
        console.log(`GameGrid props: ${JSON.stringify(props)}`)
    }

    render() {
        return (
            <div id="pm-grid" className="main-grid">
                {
                    /* TODO: render grid with Pieces*/
                    console.log(this.props.data)
                }
            </div>
        );
    }

    componentDidMount(){
        var width = this.props.xBlocks * this.props.size ;
        document.getElementById("pm-grid").style.gridTemplateColumns = `repeat(${this.props.xBlocks},${(this.props.size-1)}px)`;
    }
}

export default GameGrid;

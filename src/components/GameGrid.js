import React, { Component } from 'react';
import GridBlock from './GridBlock';
import { matrixOp } from '../Logic/Utils';
import "../style/grid.css";


let blockId = (x, y) => `m${x}_${y}`;

class GameGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInited: false,
            tick: false
        }

    }


    render() {
        return (
            <div id="pm-grid" className="main-grid">
                {
                    this.renderGrid(this.props.data)
                }
            </div>
        );
    }

    
    renderGrid(grid) {
        let components = [];
        matrixOp(this.props.logic.getComponents(), (x, y, mat) => {
            components.push(
                <GridBlock key={blockId(x, y)} blocId={blockId(x, y)} size={this.props.size} refreshRate={this.props.logic.refreshRate} state={()=>this.props.logic.gameState}>
                    {mat[y][x]}
                </GridBlock>
            );
        });
        return components;
    }

    componentDidMount() {

        // var width = this.props.xBlocks * this.props.size;
        document.getElementById("pm-grid").style.gridTemplateColumns = `repeat(${this.props.xBlocks},${(this.props.size - 1)}px)`;
        document.getElementById("pm-grid").style.gridTemplateRows = `repeat(${this.props.yBlocks},${(this.props.size - 1)}px)`;
        document.getElementById("pm-grid").style.gridTemplateAreas = this.generateBlockStrings(this.props.xBlocks, this.props.yBlocks);

        for (let y = 0; y < this.props.yBlocks; ++y) {
            for (let x = 0; x < this.props.xBlocks; ++x) {
                document.getElementById(blockId(x, y)).style.gridArea = blockId(x, y);
            }
        }
    }

    generateBlockStrings(width, height) {
        let blockStr = "";
        for (var i = 0; i < height; ++i) {
            blockStr += "'";
            for (var j = 0; j < width; ++j) {
                blockStr += blockId(j, i) + " ";
            }
            blockStr += "' ";
        }
        return blockStr;
    }
}

export default GameGrid;

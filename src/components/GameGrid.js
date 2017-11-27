import React, { Component } from 'react';
import GridBlock from './GridBlock';
import PacMan from './GamePieces/PacMan';
import Wall from './GamePieces/Wall';
import { matrixOp } from '../Logic/Utils';
import "../style/grid.css";
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';

let blockId = (x, y) => `m${x}_${y}`;


class GameGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isInited: false
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
        console.log(grid);
        matrixOp(grid, (x, y, mat) => {

            components.push(<GridBlock key={blockId(x, y)}
                blocId={blockId(x, y)}
                type={mat[y][x].type}
                size={this.props.size}
                surround={this.props.logic.getTypeSurround({ x, y }, 1)} >
                {(mat[y][x].type == PIECES_TYPES.GHOST) ? mat[y][x].value.getComponent() : ""}
            </GridBlock>);

        });
        return components;
    }

    componentDidMount() {

       // var width = this.props.xBlocks * this.props.size;
        document.getElementById("pm-grid").style.gridTemplateColumns = `repeat(${this.props.xBlocks},${(this.props.size - 1)}px)`;
        document.getElementById("pm-grid").style.gridTemplateRows = `repeat(${this.props.yBlocks},${(this.props.size - 1)}px)`;
        document.getElementById("pm-grid").style.gridTemplateAreas = this.generateBlockStrings(this.props.xBlocks, this.props.yBlocks);
        console.log(this.props.data);


        //document.getElementById(blockId(0,0)).style.gridArea = blockId(0,0);

    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.isInited && nextProps.data.length > 0) {
            this.setState(() => ({ isInited: true }),
                () => { 
                    matrixOp(nextProps.data,(x,y,mat)=>{
                        document.getElementById(blockId(x,y)).style.gridArea = blockId(x,y);
                    } );
                });
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

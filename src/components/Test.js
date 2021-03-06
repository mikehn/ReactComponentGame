import React, { Component } from 'react';
import GridBlock from './GridBlock';
import PacMan from './GamePieces/PacMan';
import Wall from './GamePieces/Wall';
import { matrixOp } from '../Logic/Utils';
import "../style/grid.css";
import { PIECES_TYPES } from './../components/GamePieces/PiecesTypes';

class Test extends Component {

    constructor(props) {
        super(props);
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


    renderGrid(grid){
        let components  = [];
        
        matrixOp(grid,(x,y,mat) => {
            components.push(<GridBlock key={`${x},${y}`}
                                       className={`mat_${x}_${y}`}
                                       type={mat[y][x].type}
                                       size={this.props.size}
                                       surround={this.props.logic.getTypeSurround({x,y},1)} >
                {(mat[y][x].type == PIECES_TYPES.GHOST)?mat[y][x].value.getComponent():""}
                </GridBlock>)});
        return components;
    }

    componentDidMount(){
        var width = this.props.xBlocks * this.props.size ;
        document.getElementById("pm-grid").style.gridTemplateColumns = `repeat(${this.props.xBlocks},${(this.props.size-1)}px)`;
    }
}

export default Test;

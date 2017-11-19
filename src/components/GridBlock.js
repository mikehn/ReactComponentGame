import React, { Component } from 'react';
import Pacman from './GamePieces/PacMan';
import Wall from './GamePieces/Wall';
import { PIECES_TYPES } from '../components/GamePieces/PiecesTypes';

class GridBlock extends Component {

  renderBlockType(type) {
    let up = this.props.surround[0][1] == PIECES_TYPES.WALL;
    let left = this.props.surround[1][0] == PIECES_TYPES.WALL;
    let right = this.props.surround[1][2] == PIECES_TYPES.WALL;
    let down = this.props.surround[2][1] == PIECES_TYPES.WALL;
    // console.log(up);
    switch (type) {
      case (PIECES_TYPES.WALL):
        return <Wall sides={{ up, down, left, right }} />
      case (PIECES_TYPES.PACKMAN):  
        return <Pacman size={this.props.size/2}/>
      default:
        return <div></div>
    }

  }


  render() {
    return (

      <div className="grid-block" style={{ width: this.props.size, height: this.props.size, zIndex: 2 }}>
        {this.renderBlockType(this.props.type)}
      </div>
    );
  }
}

export default GridBlock;

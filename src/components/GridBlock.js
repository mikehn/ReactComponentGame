import React, { Component } from 'react';
import { PIECES_TYPES } from "../components/GamePieces/PiecesTypes";
import { GAME_STATE } from "../components/GamePieces/Consts";

class GridBlock extends Component {
  constructor(props) {
    super(props);
    this.componentInterval = null;
    this.sides = null;
    this.state = {
      tick: false
    }
  }


  componentWillMount() {
    if (this.props.children.getType() === PIECES_TYPES.GHOST) {
      this.sides = this.props.logic.getPieceSurround(this.props.children);
      this.componentInterval = setInterval(() => {
        this.sides = this.props.logic.getPieceSurround(this.props.children);
        if (this.props.state() === GAME_STATE.WIN)
          clearInterval(this.componentInterval);
        this.setState((prev) => ({ tick: !prev.tick }));
      },
        this.props.refreshRate /2);
    }
  }

  render() {
    let zIndex = (this.props.children.isWinner) ? 4 : 2;
    return (
      <div className="grid-block" id={this.props.blocId} style={{ width: this.props.size, height: this.props.size, zIndex: zIndex }}>
        {this.props.children.getComponent(this.sides)}
      </div>
    );
  }


  componentWillUnmount() {
    if (this.componentInterval != null) {
      clearInterval(this.componentInterval);
    }
  }

}

export default GridBlock;

import React, { Component } from 'react';
import { PIECES_TYPES } from "../components/GamePieces/PiecesTypes";
import { GAME_STATE } from "../components/GamePieces/Consts";

class GridBlock extends Component {
  constructor(props) {
    super(props);
    this.componentInterval = null;
    this.state = {
      tick: false
    }
  }


  componentWillMount() {
    if (this.props.children.getType() === PIECES_TYPES.GHOST) {
      this.componentInterval = setInterval(() => {
        if (this.props.state() === GAME_STATE.WIN)
          clearInterval(this.componentInterval);
        this.setState((prev) => ({ tick: !prev.tick }))
      },
        this.props.refreshRate);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stop) {
      clearInterval(this.componentInterval);
    }
  }


  render() {
    let zIndex = (this.props.children.isWinner) ? 4 : 2;
    return (
      <div className="grid-block" id={this.props.blocId} style={{ width: this.props.size, height: this.props.size, zIndex: zIndex }}>
        {this.props.children.getComponent()}
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

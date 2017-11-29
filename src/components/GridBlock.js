import React, { Component } from 'react';
import {PIECES_TYPES} from "../components/GamePieces/PiecesTypes";


class GridBlock extends Component {
  constructor(props){
    super(props);
    this.componentInterval=null;
    this.state= {
      tick:false
    }
  }


  componentWillMount() {
    if(this.props.children.getType() == PIECES_TYPES.GHOST){
      this.componentInterval = setInterval( () => {
                     this.setState((prev)=>({tick:!prev.tick}))
              },
        this.props.refreshRate);
    }
  }


  render() {
    return (
      <div className="grid-block" id={this.props.blocId} style={{ width: this.props.size, height: this.props.size, zIndex: 2 }}>
        {this.props.children.getComponent()}
      </div>
    );
  }

  componentWillUnmount() {
    if(this.componentInterval!=null){
      clearInterval(this.componentInterval);
    }
  }
  
}

export default GridBlock;

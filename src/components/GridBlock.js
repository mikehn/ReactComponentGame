import React, { Component } from 'react';


class GridBlock extends Component {
 
  render() {
    return (
        
      <div className="grid-block" style={{width:this.props.size,height:this.props.size, zIndex: 2}}>
            {this.props.children}
      </div>
    );
  }
}

export default GridBlock;

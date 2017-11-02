import React, { Component } from 'react';
import "../style/wall.css";

class Wall extends Component {

  

  render() {

    var left = !this.props.sides.left ? "solid":"none";
    var right = !this.props.sides.right ? "solid":"none";
    var up = !this.props.sides.up ? "solid":"none";
    var down = !this.props.sides.down ? "solid":"none";
    return (
        <div className="outer-wall" style={{zIndex:10}} >
             <div className="wall" style={{zIndex:10 ,borderLeftStyle:left,borderTopStyle:up,borderBottomStyle:down,borderRightStyle:right}}>
             </div>
        </div>
    );
  }
}

export default Wall;

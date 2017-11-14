import React, { Component } from 'react';
import "../../style/wall.css";

export default class Wall extends Component {

  render() {

    let left = !this.props.sides.left ? "solid":"none";
    let right = !this.props.sides.right ? "solid":"none";
    let up = !this.props.sides.up ? "solid":"none";
    let down = !this.props.sides.down ? "solid":"none";

    return (
        <div className="outer-wall" style={{zIndex:10}} >
             <div className="wall" style={{zIndex:10 ,borderLeftStyle:left,borderTopStyle:up,borderBottomStyle:down,borderRightStyle:right}}>
             </div>
        </div>
    );
  }
}

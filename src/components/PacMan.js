import React, { Component } from 'react';
import "../style/pacman.css";

class PacMan extends Component {

    render() {
        return (

            <div className="pacman">
                <div className="pacman-top" style={{width:this.props.size,height:this.props.size/2}}></div>
                <div className="pacman-bottom"  style={{width:this.props.size,height:this.props.size/2}}></div>
               
            </div>

        );
    }

   
}

class PacManLogic {

    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    checkLocation(x,y){
      return (this.x===x && this.y===y);
    }

    updateLocation(env){
        this.x = (this.x+1)%5;
    }

}



export {PacMan,PacManLogic};

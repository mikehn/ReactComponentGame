import React, { Component } from 'react';
import GridBlock from './GridBlock';
import {PacMan,PacManLogic} from './PacMan';
import "../style/grid.css";

class GameGrid extends Component {

    constructor(props){
        super(props);
        this.state = {clock:1};
        this.pm =  new PacManLogic(0,0);
    }
    
    

    componentWillMount(){
        
        window.setInterval(
            ()=> {this.setState((prevState, props) => ({clock: prevState.clock*-1}));}
            ,this.props.refreshRate
        );
    }

    renderGridBlocks(size, xBlocks, yBlocks) {

        var gridArray = [];
        for (var y = 0; y < yBlocks; ++y)
            for (var x = 0; x < xBlocks; ++x) {
                gridArray.push(
                    <GridBlock key={x + "," + y} xPos={x} yPos={y} size={size - 1}>
                       {this.drawPacMan(x,y)}
                    </GridBlock>
                );
            }
        this.pm.updateLocation();
        return gridArray;
    }

    drawPacMan = (x,y) => {
        
        if( this.pm.checkLocation(x,y))
            return  <div className="pm-center"><PacMan size={this.props.size/2}/></div>
        return "";
    }

    render() {
        console.log(this.props.xBlocks);
        var width =  this.props.xBlocks * this.props.size;
        var height = this.props.yBlocks * this.props.size;
        


        return (
            <div className="main-grid" style={{ width:  width, height:height }}>
                {this.renderGridBlocks(this.props.size, this.props.xBlocks , this.props.yBlocks)}
            </div>
        );
    }
}

export default GameGrid;

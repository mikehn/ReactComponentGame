import React, { Component } from 'react';
import GameGrid from './components/GameGrid';
import Banner from './components/Banner';
import './style/App.css';




class App extends Component {

  getElementsCount(size,factor,shrink){
    var scaledSize = Math.floor(size*shrink);
    return (scaledSize-(scaledSize % factor))/factor;
  }

  render() {
    var cubeSize = 60;
    
    var xBlocks = this.getElementsCount(window.innerWidth,cubeSize,0.95); //Math.floor((window.innerWidth*0.95)/size);
    var yBlocks = this.getElementsCount(window.innerHeight,cubeSize,0.86);  //Math.floor((window.innerHeight*0.86)/size);
   
    return (
      <div className="App">
        
       <Banner/>
       <GameGrid refreshRate={480} size={cubeSize} xBlocks={xBlocks} yBlocks={yBlocks} />

      </div>
    );
  }
}

export default App;

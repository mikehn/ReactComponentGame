import React, { Component } from 'react';
import GameGrid from './components/GameGrid';
import './style/App.css';

class App extends Component {
  render() {
    var size = 200;
    var xBlocks = Math.floor(window.innerWidth/size);
    var yBlocks =  Math.floor(window.innerHeight/size);
   
    return (
      <div className="App">
       <GameGrid refreshRate={600} size={size} xBlocks={xBlocks} yBlocks={yBlocks} />

      </div>
    );
  }
}

export default App;

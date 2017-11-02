import React from 'react';
import GridBlock from './GridBlock';
import Wall from "./Wall";
import PacMan from './PacMan';
import PacManLogic from './PacManLogic';

var GAME_CONSTS = {
    UNDEF: -1,
    EMPTY: 0,
    WALL: 1,
    PM: 2
}

function Sqr(type, value) {
    return { type: type, value: value };
}

const FILL_SIDES_WALL = true;

class GameLogic {
    constructor(xBlocks, yBlocks, wallPercent,size) {
        var MIN_WP = 0, MAX_WP = 0.9;
        if (wallPercent > MAX_WP || wallPercent < MIN_WP) {
            wallPercent = (MAX_WP + MIN_WP) / 2;
        }
      
        this.xBlocks = xBlocks;
        this.yBlocks = yBlocks;
        this.size = size;
        this.wallPercent = wallPercent;
        this.grid = Array(yBlocks).fill().map((val, idx) => Array(xBlocks).fill(GAME_CONSTS.UNDEF));
        this.initilizeGameGrid(this.grid);
        var pmLoc = this.initPacMan();
        this.pm = new PacManLogic(pmLoc.x, pmLoc.y);
    }


    initilizeGameGrid(grid) {
        this.matrixOp(grid, (x, y, matrix) => { matrix[y][x] = Sqr(GAME_CONSTS.EMPTY, ""); });
        this.fillWalls(this.grid, 1-this.wallPercent);
       
    }

    getTypeSurround(x,y,rad){
        
        var size = rad*2+1;
        var typeArr=Array(size);
        
        var inY=0;

        
       
        for(var i=y-rad;i<=(y+rad);++i){
            var inX=0;
            typeArr[inY] = Array(size);
            for(var j=x-rad;j<=(x+rad);++j){
                typeArr[inY][inX]=this.getType(j,i);
                inX++;
            }
            inY++;
        }
       
        return typeArr;
       
    }

    update(){
       this.swap({x:this.pm.x,y:this.pm.y},this.pm.updateLocation(this.getTypeSurround(this.pm.x,this.pm.y,1)));
    }

    swap(locA,locB){
        var tmp = this.grid[locA.y][locA.x];
        this.grid[locA.y][locA.x] = this.grid[locB.y][locB.x];
        this.grid[locB.y][locB.x] = tmp;
    }

    initPacMan(){
        var notPlaced = true,x,y;
        while(notPlaced)
        {
            x = Math.floor(Math.random()*this.xBlocks);
            y = Math.floor(Math.random()*this.yBlocks);
            notPlaced = (this.grid[y][x].type !== GAME_CONSTS.EMPTY);
        }
        
        this.grid[y][x] = Sqr(GAME_CONSTS.PM ,(<PacMan size={this.size*0.8}/>));
        return {x:x,y:y};
    }

    getType(x,y){
        if(x<0 || x>=this.xBlocks || y<0 || y>= this.yBlocks)
            return GAME_CONSTS.UNDEF;
        else return this.grid[y][x].type;
    }


    fillWalls(grid, fillChance) {
        var up = (x, y) => this.getType(x,y - 1) === GAME_CONSTS.WALL;
        var left = (x, y) => this.getType(x - 1,y) === GAME_CONSTS.WALL;
        var right = (x, y) => this.getType(x + 1,y) === GAME_CONSTS.WALL;
        var down = (x, y) => this.getType(x,y + 1) === GAME_CONSTS.WALL;
        var sides = (x, y) => { return { up: up(x, y), down: down(x, y), left: left(x, y), right: right(x, y) }; };

        var wallList = [];
        this.matrixOp(grid, (x, y, matrix) => {
            if (Math.random() > fillChance) {
                matrix[y][x].type = GAME_CONSTS.WALL;
                wallList.push({ x: x, y: y });
            }
        });

        if(FILL_SIDES_WALL){
            this.matrixOp(grid, (x, y, matrix) => 
            {
                if(x==this.xBlocks-1||y==this.yBlocks-1||x==0||y==0){
                    this.grid[y][x].type = GAME_CONSTS.WALL;
                    wallList.push({ x: x, y: y });
                }
            });
        }

        wallList.forEach((val) => {grid[val.y][val.x].value = <Wall sides={sides(val.x, val.y)} /> });
    }


    getGridBlock(x, y, size) {
        var key = x + "-" + y;//console.log(this.grid[y][x].type);
        return (
            <GridBlock key={key} xPos={x} yPos={y} size={size - 1}>
                {this.grid[y][x].value}
            </GridBlock>);
    }

    matrixOp(matrix, op) {
        for (var y = 0; y < matrix.length; ++y) {
            for (var x = 0; x < matrix[y].length; ++x) {
                op(x, y, matrix);
            }
        }
    }

}

export default GameLogic;

export {GAME_CONSTS};


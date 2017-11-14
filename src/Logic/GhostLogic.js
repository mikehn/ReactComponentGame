import {PIECES_TYPES} from './../components/GamePieces/PiecesTypes';

class GhostLogic {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    //initGhost(){
    //    var notPlaced = true,x,y;
    //    while(notPlaced)
    //    {
    //        x = Math.floor(Math.random()*this.xBlocks);
    //        y = Math.floor(Math.random()*this.yBlocks);
    //        notPlaced = (this.grid[y][x].type !== GAME_CONSTS.EMPTY);
    //    }
    //
    //    this.grid[y][x] = Sqr(GAME_CONSTS.PM ,(<PacMan size={this.size*0.8}/>));
    //    return {x:x,y:y};
    //}


    //updateGhosts(){
    //    this.swapPiecesLocation({x:this.ghost.x,y:this.ghost.y},this.ghost.updateLocation(this.getTypeSurround(this.ghost.x,this.ghost.y,1)));
    //}

    updateLocation(sides) {
        var size = sides.length;
        var MAX_TRY = size * size *  10;
        var geuss,x,y;
        for(var i=0;i<MAX_TRY;++i){
            geuss=Math.floor(Math.random()*(size*size));
            x = geuss % size;
            y = Math.floor(geuss / size);
            if((y==1 && (x==0 || x==2)) || (x==1 && (y==0 || y==2)))
                if(sides[y][x] === PIECES_TYPES.EMPTY){
                    this.x+=(x-1);
                    this.y+=(y-1);
                    return {x:this.x,y:this.y} ;
                }
        }
        return {x:this.x,y:this.y} ;

    }

}

export default GhostLogic;

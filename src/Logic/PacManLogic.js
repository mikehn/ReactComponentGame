import {PIECES_TYPES} from '../components/GamePieces/PiecesTypes';

class PacManLogic {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    updateLocation(sides) {
        var size = sides.length;
        var MAX_TRY = size * size *  10;
        var geuss,x,y;
        for(var i=0;i<MAX_TRY;++i){
            geuss=Math.floor(Math.random()*(size*size));
            x = geuss % size;
            y = Math.floor(geuss / size);
            if((y===1 && (x===0 || x===2)) || (x===1 && (y===0 || y===2)))
            if(sides[y][x] === PIECES_TYPES.EMPTY){
                this.x+=(x-1);
                this.y+=(y-1);
                return {x:this.x,y:this.y} ;
            }
        }
        return {x:this.x,y:this.y} ;
        
    }

}

export default PacManLogic;
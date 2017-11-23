import {PIECES_TYPES} from '../components/GamePieces/PiecesTypes';

class PacManLogic {

    constructor(location) {
        this.x = location.x;
        this.y = location.y;
    }

    /**
     * update location based on sides type matrix 
     * @param {*} sides type matrix i.e:
     * [[ WALL , EMPTY, EMPTY  ]
     *  [ WALL , YOU  , EMPTY  ]
     *  [ GHOST, WALL , PACMAN ]]
     */
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
                this.x+=(x-1); //-1 corrdinate base correction (0,1,2) -> (-1,0,1)
                this.y+=(y-1);
                return this.getLocation();
            }
        }
        return this.getLocation();
    }

    getType(){
        return PIECES_TYPES.PACKMAN;
    }

    getLocation(){
        return {
            x:this.x,
            y:this.y
        }
    }
}

export default PacManLogic;
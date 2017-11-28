import {blockId} from "../Logic/Utils";

export default class GridPiece {

    constructor(type,component){
        this.type=type;
        this.component =component;
        this.x=-1;
        this.y=-1;
        this.isSet=false;
        this.id=null;
    }



    getType(){
        return this.type;
    }

    Location(x, y) {
        if (Number.isInteger(x) && Number.isInteger(y)){
            if(!this.isSet){
                this.isSet=true;
                this.id = blockId(x,y);
            }
            this.x = x;
            this.y = y;
        }
        return {
            x: this.x,
            y: this.y
        }
    }

    getComponent(){
        return this.component;
    }

    getId(){
        return this.id;
    }
}
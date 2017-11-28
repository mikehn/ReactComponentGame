export const GAME_CONSTS = {
    CENTER:-1,
    UP:0,
    RIGHT:1,
    DOWN:2,
    LEFT:3,
    get DIRECTIONS() {return [this.CENTER,this.UP,this.RIGHT,this.DOWN,this.LEFT]}
};

export const GAME_STATE = {
    PRE_GAME:0,
    PLAY:1,
    WIN:2,
    
    
};

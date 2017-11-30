export const MOVE_DIRECTION = {
    CENTER:"center",
    TOP:"top",
    RIGHT:"right",
    BOTTOM:"bottom",
    LEFT:"left",
    get DIRECTIONS() {return [this.CENTER,this.TOP,this.RIGHT,this.BOTTOM,this.LEFT]}
};

export const PIECES_TYPES = {
    UNDEF: -1,
    EMPTY: 0,
    WALL: 1,
    PACKMAN: 2,
    GHOST: 3
};

export const GAME_STATE = {
    PRE_GAME:0,
    PLAY:1,
    WIN:2,  
};



/*
    We have given you a basic skeleton to work with, 
    feel free to modify anything you need.

    the following props are at your disposal:
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    1) this.props.sides                 : an object containing  
                                            * all side keys (mapping to PIECES_TYPES)
                                             {topLeft,top,topRight,left,right,bottomLeft,bottom,bottomRight}
                                             i.e. if you want to access whats above ghost,
                                             you can use sides.top which will return i.e. PIECES_TYPES.PACMAN
                                            * sides.directions() -> gets all keys above as a list you can iterate
                                            * sides.elements() -> gets all surrounding side elemnts as a list
    2) this.props.size                  :   int representing size of ghost
    3) this.props.setNextMove(direction):   function that will set your components next move.
                                            the function recives a direction which is one of the const in PIECES_TYPES
                                            you can see list below.
    4) this.props.winMessage(msg)       :   function that on win will return a winnig messeage component
                                            with the given msg 
    5) this.props.lastMoveSuccess       :   boolean that indecates if you last move was illegal.


    to complete this component the following must be implemented:
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    1) if lastMoveSuccess is false need color ghost red 
    2) if your ghost close to pacman need to change color to green
    3) if your ghost is close to other ghosts need to change color to blue
    4) implement logic to handle setNextMove to try and catch pacman
    5) finnaly add winMessage using the winMessage props to your render function.
    
    note : in (1),(2),(3) ghost should return to original color if condition is not met.

    when done submit your component to get a chance to win contest.
*/

import React, { Component } from 'react';
import "../style/ghost.css";
/* this imports constant that you will need to use
    Move Direction consts
    > MOVE_DIRECTION.CENTER
    > MOVE_DIRECTION.TOP
    > MOVE_DIRECTION.RIGHT
    > MOVE_DIRECTION.BOTTOM
    > MOVE_DIRECTION.LEFT
    Piece types
    > PIECES_TYPES.EMPTY
    > PIECES_TYPES.WALL
    > PIECES_TYPES.PACMAN
    > PIECES_TYPES.GHOST
*/
import { MOVE_DIRECTION, PIECES_TYPES } from "../components/GamePieces/Consts";


/****************************************************************************
 *  DONT FORGET TO RENAME THE GHOST CLASS NAME AND FILE NAME TO YOUR NAME !!!
 *************************************************************************** */
export default class GhostTemplate extends Component {

    /**
     * This is where you should place initilization code.
     * @param {*} props recive props as described above
     */
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    /**
     * This method is called every time props are updated 
     * The new props will be stored in nextProps, 
     * while old ones will still be available by this.props
     * move logic should be done here as evry time your ghost moved the props will update.
     * @param {*} nextProps next props (props list is described at top of this file)
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.sides !== this.props.sides) {
            // We have helped you here, but feel free to change this if you want
            let nextMove = this.getNextMove(nextProps.sides);
            this.props.setNextMove(nextMove);
        }
    }


    /**
     * feel free to use this to implement you next move logic based on the sides object 
     * the sides object is described at top of file.
     * ( ()=>{} is es6 notation for lambda expresion it is equivilant to definig function(){})
     * 
     */
    getNextMove = (sides) => {
        return MOVE_DIRECTION.RIGHT;
    };

    /**
     * render method is used to tell react what to actually show on screen
     * hint: place here your {this.props.winMessage("your message")}
     */
    render() {
        let size = this.props.size;
        return (
            <div className="ghost" style={{ backgroundColor: "orange", width: size, height: size }}>

            </div>
        );
    }

}


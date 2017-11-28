import React, { Component } from 'react';
import GridPiece from "./GridPiece";


function Empty(props) {
    return <div className="non-move-type"/>;
}

export default class NonTypeLogic extends GridPiece{
    
    constructor(type,x,y){
        super(type,<Empty />);
        super.Location(x,y);
    }

} 
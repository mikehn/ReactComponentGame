import React, { Component } from 'react';
import "../style/ghost.css";


/*

1) implement
 */
export default class GhostTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sides !== this.props.sides) {
            let nextMove = this.getNextMove(nextProps.sides);
            this.props.setNextMove(nextMove);
        }
    }


    getNextMove = (sides) => {

    };

    render() {
        return (
            <div className="ghost">

            </div>
        );
    }

}


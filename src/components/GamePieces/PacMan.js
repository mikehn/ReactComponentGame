import React, { Component } from 'react';
import "../../style/pacman.css";

export default class PacMan extends Component {

    render() {
        return (
            <div className="pm-center">
                <div className="pacman">
                    <div className="pacman-top" style={{ width: this.props.size, height: this.props.size / 2 }}></div>
                    <div className="pacman-bottom" style={{ width: this.props.size, height: this.props.size / 2 }}></div>
                </div>
            </div>
        );
    }

}

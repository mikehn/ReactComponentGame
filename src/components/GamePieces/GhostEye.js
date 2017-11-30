import React, { Component } from 'react';
import "../../style/ghost.css";

export default class Ghost extends Component {
    render() {
        let size = this.props.size;
        return (
            <div className="eye" ></div>
        );
    }
}
import React, { Component } from 'react';
import "../style/win.css";

export default class WinMessage extends Component {
    render() {
        return (
            <div className="win-board middiv">
                <div className="btitle"><a>Winner</a></div>
                <div className="bname"><a>{this.props.name}</a></div>
                <div className="bmsg"><a>{this.props.msg}</a></div>
            </div>
        );
    }
}

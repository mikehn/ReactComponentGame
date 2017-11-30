import React, { Component } from 'react';
import '../style/Banner.css';

export default class Banner extends Component {
    render() {
       
        return (
            <div className="banner">
                <div className="borderBanner">
                    <div className="innerBanner">
                    <h1>React <span id="pc-logo">PacMan</span> component game</h1>
                    </div>
                </div>
            </div>
        );
    }
}
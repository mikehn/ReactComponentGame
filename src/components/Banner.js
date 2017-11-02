import React, { Component } from 'react';
import '../style/Banner.css';

class Banner extends Component {
    render() {
        var size = 60;
        var xBlocks = Math.floor((window.innerWidth * 0.98) / size);
        var yBlocks = Math.floor((window.innerHeight * 0.98) / size);

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

export default Banner;


function getElementsCount(size, factor, shrink){
    
    let scaledSize = Math.floor(size * shrink);
    return (scaledSize - (scaledSize % factor)) / factor;
}

var GameSettings = {
    cubeSize:60,
    get xBlocks(){return getElementsCount(window.innerWidth, this.cubeSize, 0.95)},
    get yBlocks(){return getElementsCount(window.innerHeight, this.cubeSize, 0.86)},
    wallPercent: 0.6,
    refreshDelay: 400
};


export {GameSettings};




function getElementsCount(size, factor, shrink){
    
    let scaledSize = Math.floor(size * shrink);
    return (scaledSize - (scaledSize % factor)) / factor;
}

// Factor represents percentage to shrink board
// on X/Y axis.
const X_FACTOR = 0.95;
const Y_FACTOR = 0.80;

var GameSettings = {
    cubeSize:54,
    get xBlocks(){return getElementsCount(window.innerWidth, this.cubeSize, X_FACTOR)},
    get yBlocks(){return getElementsCount(window.innerHeight, this.cubeSize, Y_FACTOR)},
    wallPercent: 0.1,
    refreshDelay: 400
};


export {GameSettings};


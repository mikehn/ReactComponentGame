export function randomIntFromInterval(intervalMaxBound)
{
    return Math.floor(Math.random() * (intervalMaxBound - 0 + 1) + 0);
}

export function Sqr(type, value) {
    return { type: type, value: value };
}

export function matrixOp(matrix, op) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            op(x, y, matrix);
        }
    }
}
let gameSpeed = 500;
let canvasWidth = 400;
let canvasHeight = 400;
let cellRatio = 0.05;
let cellSize = Math.floor(canvasWidth * cellRatio);

let candvas;
let grid;
let mover;
let blocks = [];
let frameCount = 0;
let gameIsOver = false;
 
function create2DArray(rows, cols) {
    const arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            arr[i][j] = null;
        }
    }
    return arr;
}

function createBlock() {
    let block;
    const j = 0;
    let i = grid.length / 2 - 1;
    const rand = Math.floor(Math.random() * 7);
    if (rand == 0) {
        block = new SquareBlock(i, j);
    } else if (rand == 1) {
        i = grid.length / 2 - 2;
        block = new PipeBlock(i, j);
    } else if (rand == 2) {
        block = new LeftElBlock(i, j);
    } else if (rand == 3) {
        block = new RightElBlock(i, j);
    } else if (rand == 4) {
        block = new LeftZigzagBlock(i, j);
    } else if (rand == 5) {
        block = new RightZigzagBlock(i, j);
    } else {
        block = new TeeBlock(i, j);
    }
    for (let cell of block.cells) {
        grid[cell.i][cell.j] = cell;
    }
    return block;
}

function drawCells() {
    let cells = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] != null) {
                cells.push(grid[i][j]);
            }
        }
    }
    push();
    for (let cell of cells) {
        fill(color(cell.color));
        rect(cell.i * cellSize, cell.j * cellSize, cellSize, cellSize);
    }
    pop();
}

function validateRotation() {
    mover.rotateClockwise();
    for (let cell of mover.cells) {
        if (cell.i >= 0 && cell.i < grid.length && 
            cell.j < grid[cell.i].length && cell.j >= 0) {
                const tester = grid[cell.i][cell.j];
                if (mover.cells.indexOf(tester) == -1 && tester != null) {
                    mover.rotateCounterClockwise();
                    return false;
                }
        } else {
            mover.rotateCounterClockwise();
            return false;
        }
    }
    mover.rotateCounterClockwise();
    return true;
}

function validateMove(dir) {
    let tester;
    for (let cell of mover.cells) {
        if (dir == 'left') {
            if (cell.i - 1 >= 0) {
                tester = grid[cell.i - 1][cell.j];
                if (mover.cells.indexOf(tester) == -1 && tester != null) {
                    return false;
                }
            } else {
                return false;
            }
        } else if (dir == 'down') {
            tester = grid[cell.i][cell.j + 1];
            if ((mover.cells.indexOf(tester) == -1 && tester != null) ||
                cell.j + 1 >= grid[cell.i].length) {
                    if (cell.j == 0) {
                        gameIsOver = true;
                    }
                    mover = null;
                    return false;
            }
        } else {
            if (cell.i + 1 < grid.length) {
                tester = grid[cell.i + 1][cell.j];
                if (mover.cells.indexOf(tester) == -1 && tester != null) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    return true;
}

function rotateClockwise() {
    if (validateRotation()) {
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = null;
        }
        mover.rotateClockwise();
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = cell;
        }      
        return true;
    }
    return false;
}

function moveLeft() {
    if (validateMove('left')) {
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = null;
        }
        mover.moveLeft();
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = cell;
        }
        return true;
    }
    return false;
}

function moveRight() {
    if (validateMove('right')) {
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = null;
        }
        mover.moveRight();
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = cell;
        }
        return true;
    }
    return false;
}

function fall() {
    if (validateMove('down')) {
        for (let cell of mover.cells) {
           grid[cell.i][cell.j] = null;
        }
        mover.fall();
        for (let cell of mover.cells) {
            grid[cell.i][cell.j] = cell;
        }
        return true;
    }
    return false;
}

function keyPressed() {
    if (mover) {
        // W or Up
        if (keyCode == 87 || keyCode == 38) {
            rotateClockwise();
        }
        // A or Left
        else if (keyCode == 65 || keyCode == 37) {
            moveLeft();
        } 
        // S or Down
        else if (keyCode == 83 || keyCode == 40) {
            fall();
        } 
        // D or Right
        else if (keyCode == 68 || keyCode == 39) {
            moveRight();
        } 
        // Space
        else if (keyCode == 32) { // SPACE
            while (fall());
        }
    }
}

function checkRows() {
    for (let j = grid[0].length - 1; j >= 0; j--) {
        let isFull = true;
        for (let i = 0; i < grid.length && isFull == true; i++) {
            if (grid[i][j] == null) {
                isFull = false;
            }
        }
        if (isFull) {
            j += 1;
            for (let k = j; k > 0; k--) {
                for (let i = 0; i < grid.length; i++) {
                    grid[i][k] = grid[i][k - 1];
                    if (grid[i][k] != null) {
                        grid[i][k].j += 1;
                    }
                }
            }
            for (let i = 0; i < grid.length; i++) {
                grid[i][0] = null;
            }
        }
    }
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    grid = create2DArray(canvasHeight / cellSize, canvasWidth / cellSize);
    mover = createBlock();

    createDiv('');
    let button = createButton('Stop');
    button.mouseClicked(() => gameIsOver = true);
    
    setTimeout(update, gameSpeed);
}

function update() {
    if (mover == null) {
        checkRows();
        mover = createBlock();
    } else {
        fall();
    }
    if (!gameIsOver) {
        setTimeout(update, gameSpeed);
    } else {
        console.log('Game Over!');
        noLoop();
    }
}

function draw() {
    background(0);
    drawCells();
}

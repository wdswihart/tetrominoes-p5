let gameSpeed = 1000;
const maxWidth = 400; // pixels
const maxHeight = 600;
let canvasWidth = window.innerWidth < maxWidth ? window.innerWidth - 15 : maxWidth;
let canvasHeight = canvasWidth * (3 / 2);
let cellRatio = 0.05;
let cellSize = Math.floor(canvasWidth * cellRatio);

let candvas;
let grid;
let mover = null;
let blocks = [];
let frameCount = 0;
let gameIsOver = false;
let score = 0;
let scoreP;
let level = 1;
let levelP;
let messageP;
let ppButton;
let gameIsPaused = false;

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
        if (grid[cell.i][cell.j] == null) {
            grid[cell.i][cell.j] = cell;
        } else {
            gameIsOver = true;
            return;
        }
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
    let completedCount = 0;
    for (let j = grid[0].length - 1; j >= 0; j--) {
        let isFull = true;
        for (let i = 0; i < grid.length && isFull == true; i++) {
            if (grid[i][j] == null) {
                isFull = false;
            }
        }
        if (isFull) {
            completedCount += 1;
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
            j += 1; // include the bottom row after drop
        }
    }
    return completedCount;
}

function checkLevelUp() {
    if (level < 10) {
        gameSpeed = 1000 - 100 * level;
        if (score > (level * level) * 350) {
            level++;
        }
    }
}

function updateInfoPanel() {
    scoreP.html('Score: ' + score);
    levelP.html('Level: ' + level);
}

function createInfoPanel() {
    let div = createDiv('');
    messageP = createP('');
    scoreP = createP('Score: 0');
    levelP = createP('Level: 1');
    div.child(messageP);
    div.child(scoreP);
    div.child(levelP);
}

function pause() {
    gameIsPaused = true;
    messageP.style('color: green');
    messageP.html('PAUSED');
    ppButton.html('Play');
    ppButton.mouseClicked(false);
    ppButton.mouseClicked(play);
}

function play() {
    gameIsPaused = false;
    messageP.html('');
    ppButton.html('Pause');
    ppButton.mouseClicked(false);    
    ppButton.mouseClicked(pause);
    setTimeout(update, gameSpeed);
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    createInfoPanel();
    ppButton = createButton('Pause');
    ppButton.mouseClicked(pause);

    grid = create2DArray(Math.floor(canvasHeight / cellSize), 
        Math.floor(canvasWidth / cellSize));
    mover = createBlock();
    setTimeout(update, gameSpeed);
}

function update() {
    if (mover == null) {
        score += 4;
        score += Math.pow(4 * checkRows(), 2);
        checkLevelUp();
        mover = createBlock();
    } else {
        fall();
    }

    if (!gameIsOver) {
        if (!gameIsPaused) {
            updateInfoPanel();
            setTimeout(update, gameSpeed);
        }
    } else {
        messageP.style('color: red');
        messageP.html('Game Over!');
    }
}

function draw() {
    background(0);
    if (!gameIsPaused) {
        drawCells();
    }
}

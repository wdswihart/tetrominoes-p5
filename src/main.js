let gameSpeed = 1000;
let canvasWidth = 400;
let canvasHeight = 400;
let cellRatio = 0.05;
let cellSize = canvasHeight * cellRatio;

let canvas;
let blocks = [];
let frameCount = 0;
let isGameOver = false;

function keyPressed() {
    const mover = blocks.filter(block => block.shouldMove)[0];
    if (mover) {
        // W or Up
        if (keyCode == 87 || keyCode == 38) {
            // rotate clockwise
        }
        // A or Left
        else if (keyCode == 65 || keyCode == 37) {
            mover.x -= cellSize;
        } 
        // S or Down
        else if (keyCode == 83 || keyCode == 40) {
            mover.y += cellSize;
        } 
        // D or Right
        else if (keyCode == 68 || keyCode == 39) {
            mover.x += cellSize;
        } 
        // Space
        else if (keyCode == 32) { // SPACE
            mover.y = canvasHeight - cellSize;
        }
    }
}

function checkBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].cells.length; j++) {
            let checkCell = blocks[i].cells[j];
            if (blocks[i].shouldMove) {
                if (checkCell.y + checkCell.size >= canvasHeight) {
                    blocks[i].shouldMove = false;
                    createBlock();
                }
            }
        }
    }
}

function showBlocks() {
    for (let block of blocks) {
        block.show();
    }
}

function createBlock() {
    let block;
    const id = frameCount;
    let x = canvasWidth / 2 - 2 * cellSize;
    const y = 0 - cellSize;
    const rand = Math.floor(Math.random() * 6);
    if (rand == 0) {
        x = canvasWidth / 2 - 2 * cellSize;
        block = new PipeBlock(id, x, y, cellSize, '', true);
    } else if (rand == 1) {
        block = new PipeBlock(id, x, y, cellSize, '', true);
    } else if (rand == 2) {
        block = new PipeBlock(id, x, y, cellSize, '', true);
    } else if (rand == 3) {
        block = new PipeBlock(id, x, y, cellSize, '', true);
    } else if (rand == 4) {
        block = new PipeBlock(id, x, y, cellSize, '', true);
    } else {
        block = new PipeBlock(id, x, y, cellSize, '', true);
    }
    blocks.push(block);
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    createBlock();
    update();
}

function update() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].shouldMove) {
            blocks[i].y += cellSize;
        }
    }
    if (!isGameOver) {
        setTimeout(update, gameSpeed);
    }
}

function draw() {
    background(0);
    showBlocks();
    checkBlocks();
    frameCount++;
}

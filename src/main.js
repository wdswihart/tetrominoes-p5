let gameSpeed = 1000;
let canvasWidth = 400;
let canvasHeight = 400;
let cellRatio = 0.05;
let cellSize = canvasHeight * cellRatio;

let canvas;
let blocks = [];
let frameCount = 0;
let gameIsOver = false;

function checkBlockCollision(id, x, y, blockWidth, blockHeight) {
    const xMod = x + blockWidth;
    const yMod = y + blockHeight;
    for (let block of blocks) {
        if (block.id != id) {
            if ((x > block.x && x < block.x + block.width) ||
                (xMod > block.x && xMod < block.x + block.width ||
                (x == block.x && xMod == block.x + block.width))) {
                    if (yMod == block.y) {
                        return true;
                    }
                }
        }
    }
    return false;
}

function validateMove(x, y, blockWidth, blockHeight) {
    if (x < 0 || x + blockWidth > canvasWidth) {        
        return false;
    } else if (y + blockHeight > canvasHeight) {
        return false;
    }
    return true;
}
 
function keyPressed() {
    const mover = blocks.filter(block => block.shouldMove)[0];
    if (mover) {
        // W or Up
        if (keyCode == 87 || keyCode == 38) {
            // rotate clockwise
        }
        // A or Left
        else if (keyCode == 65 || keyCode == 37) {
            if (validateMove(mover.x - cellSize, mover.y, mover.width,
                 mover.height)) {
                    mover.x -= cellSize;
                }
        } 
        // S or Down
        else if (keyCode == 83 || keyCode == 40) {
            if (validateMove(mover.x, mover.y + cellSize, mover.width,
                mover.height)) {
                    mover.y += cellSize;
                }
        } 
        // D or Right
        else if (keyCode == 68 || keyCode == 39) {
            if (validateMove(mover.x + cellSize, mover.y, mover.width, 
                mover.height)) {
                    mover.x += cellSize;
                }
        } 
        // Space
        else if (keyCode == 32) { // SPACE
            let minY = canvasHeight ;
            let xMod = mover.x + mover.width;
            for (let block of blocks) {
                if (block.id != mover.id) {
                    if ((mover.x > block.x && mover.x < block.x + block.width) ||
                    (xMod > block.x && xMod < block.x + block.width ||
                    (mover.x == block.x && xMod == block.x + block.width))) {
                        block.y < minY ? minY = block.y : null;
                    }
                }
            }
            mover.y = minY - cellSize;
        }
    }
}

function checkBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].shouldMove) {
            if (checkBlockCollision(blocks[i].id, blocks[i].x, blocks[i].y,
                blocks[i].width, blocks[i].height)) {
                    blocks[i].shouldMove = false;
                    createBlock();
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

function gameOver() {
    gameIsOver = true;
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    createBlock();
    update();

    const button = createButton('Stop');
    button.mouseClicked(gameOver);
}

function update() {
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].shouldMove) {
            if (validateMove(blocks[i].x, blocks[i].y + cellSize, 
                blocks[i].width, blocks[i].height)) {
                    blocks[i].y += cellSize;
            } else {
                blocks[i].shouldMove = false;
                createBlock();
            }
        }
    }
    if (!gameIsOver) {
        setTimeout(update, gameSpeed);
    }
}

function draw() {
    background(0);
    showBlocks();
    checkBlocks();
    frameCount++;
}

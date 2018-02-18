class Block {
    constructor(id, x, y, cellSize, orientation, shouldMove) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.cellSize = cellSize;
        this.orientation = orientation;
        this.shouldMove = shouldMove;
        this.cells;
    }

    update() {}

    show() {
        this.update();
        for (let cell of this.cells) {
            cell.show();
        }
    }
}

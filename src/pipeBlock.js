class PipeBlock extends Block {
    constructor(id, x, y, cellSize, orientation, shouldMove) {
        super(id, x, y, cellSize, orientation, shouldMove);
        this.cells = [];
        for (let i = 0; i < 4; i++) {
            this.cells.push(new Cell(
                this.x + i * this.cellSize,
                this.y,
                this.cellSize,
                color(0, 255, 0)
            ));
        }
        this.width = cellSize * 4;
        this.height = cellSize;
    }

    update() {
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].x = this.x + i * this.cellSize;
            this.cells[i].y = this.y;
        }
    }
}

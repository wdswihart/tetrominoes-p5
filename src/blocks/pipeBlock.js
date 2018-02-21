class PipeBlock extends Block {
    constructor(i, j) {
        super(i, j);
        this.color = color(0, 255, 0);
        this.angle = 0;
        this.cells = [];
        for (let i = 0; i < 4; i++) {
            const cell = new Cell(this.i + i, this.j, this.color);
            this.cells.push(cell);
        }
    }

    update() {
        for (let i = 0; i < 4; i++) {
            if (this.angle == 0) {
                this.cells[i].setIndices(this.i + i, this.j);
            } else if (this.angle == 90) {
                this.cells[i].setIndices(this.i, this.j + i);
            } else if (this.angle == 180) {
                this.cells[i].setIndices(this.i - i, this.j);
            } else {
                this.cells[i].setIndices(this.i, this.j - i);
            }
        }
    }

    rotateCounterClockwise() {
        this.angle - 90 < 0 ? this.angle = 270 : this.angle -= 90;
        this.update();
    }

    rotateClockwise() {
        this.angle + 90 < 360 ? this.angle += 90 : this.angle = 0;
        this.update();
    }
}

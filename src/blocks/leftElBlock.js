class LeftElBlock extends Block {
    constructor(i, j) {
        super(i, j);
        this.color = color(255, 0, 0);
        this.angle = 0;
        this.cells = [];
        this.cells.push(new Cell(this.i, this.j, this.color));
        this.cells.push(new Cell(this.i + 1, this.j, this.color));
        this.cells.push(new Cell(this.i + 2, this.j, this.color));
        this.cells.push(new Cell(this.i + 2, this.j + 1, this.color));
    }

    update() {
        if (this.angle == 0) {
            this.cells[0].setIndices(this.i, this.j);
            this.cells[1].setIndices(this.i + 1, this.j);
            this.cells[2].setIndices(this.i + 2, this.j);
            this.cells[3].setIndices(this.i + 2, this.j + 1);
        } else if (this.angle == 90) {
            this.cells[0].setIndices(this.i, this.j);
            this.cells[1].setIndices(this.i, this.j + 1);
            this.cells[2].setIndices(this.i, this.j + 2);
            this.cells[3].setIndices(this.i - 1, this.j + 2);
        } else if (this.angle == 180) {
            this.cells[0].setIndices(this.i, this.j);
            this.cells[1].setIndices(this.i - 1, this.j);
            this.cells[2].setIndices(this.i - 2, this.j);
            this.cells[3].setIndices(this.i - 2, this.j - 1);
        } else {
            this.cells[0].i = this.i;
            this.cells[0].j = this.j;
            this.cells[1].i = this.i;
            this.cells[1].j = this.j - 1;
            this.cells[2].i = this.i;
            this.cells[2].j = this.j - 2;
            this.cells[3].i = this.i + 1;
            this.cells[3].j = this.j - 2;
            this.cells[0].setIndices(this.i, this.j);
            this.cells[1].setIndices(this.i, this.j - 1);
            this.cells[2].setIndices(this.i, this.j - 2);
            this.cells[3].setIndices(this.i + 1, this.j - 2);
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

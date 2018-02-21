class SquareBlock extends Block {
    constructor(i, j) {
        super(i, j);
        this.color = color(255, 255, 0);
        this.angle = 0;
        this.cells = [];
        this.cells.push(new Cell(this.i, this.j, this.color));
        this.cells.push(new Cell(this.i + 1, this.j, this.color));
        this.cells.push(new Cell(this.i, this.j + 1, this.color));
        this.cells.push(new Cell(this.i + 1, this.j + 1, this.color));
    }

    rotateCounterClockwise() { }

    rotateClockwise() { }
}
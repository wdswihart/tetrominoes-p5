class Block {
    constructor(i, j) {
        this.i = i;
        this.j = j;
    }

    fall() {
        this.j += 1;
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].j += 1;
        }
    }

    moveRight() {
        this.i += 1;
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].i += 1;
        }
    }

    moveLeft() {
        this.i -= 1;
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].i -= 1;
        }
    }
}

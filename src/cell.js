class Cell {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    show() {
        push();
        fill(this.color);
        rect(this.x, this.y, this.size, this.size)
        pop();
    }
}

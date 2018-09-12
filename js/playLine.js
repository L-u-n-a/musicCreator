export class playLine {

    constructor(canv, ctx) {
        this.ctx = ctx;
        this.canv = canv;
    }

    draw(color) {
        if(color) {
        this.ctx.fillStyle = color;
        }
        else {
        this.ctx.fillStyle = "grey";
        }
        this.ctx.fillRect(this.canv.width / 9, 30, 5, this.canv.height);
    }
}

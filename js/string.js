/*jshint esversion: 6*/
export class String {

    constructor(name, canvas, ctx, y, color) {
        // e.g E,A,D,G,B,E
        this.name = name;
        // The canvas this string will draw on/will be drawn onto.
        this.canvas = canvas;
        // The canvas context.
        this.ctx = ctx;
        // The height of this string on the canvas.
        this.y = y;
        // The height of a string.
        this.stringHeight = 5;
        // The color of the string.
        this.color = color;
    }

    drawString() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, this.y, this.canvas.width, this.stringHeight);
    };
}

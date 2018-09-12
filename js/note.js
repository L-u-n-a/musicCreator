export class Note {

    constructor(finger, length, time, canvas, ctx, y, note, playLine) {
        // With which finger the string needs to be pushed down.
        this.finger = finger;
        // The amount of time before the next note.
        this.time = time;
        // The canvas on which to drawn.
        this.canvas = canvas;
        // The context used to draw with.
        this.ctx = ctx;
        // The height, given by the string that paints the note.
        this.y = y;
        // The note name
        this.note = note;
        // The height of a note.
        this.height = 20;
        // Checks if note was played correctly
        this.correct = false;
        // The size of the note itself (is it a 4th, 8th or 16th for example).
        this.length = length;
        this.drawLength = length * 100;
        this.writeLength = length * 50;
        this.writeLength = length * 50;

        this.drawHeight = this.y;
        this.writeHeight = this.y + 7;
        this.x = this.canvas.width;

        // The playerLine
        this.playLine = playLine;

        // Note color
        this.color = 'black';
    }

    writeFinger(finger) {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.finger, this.x, this.writeHeight, this.canvas.width, this.canvas.height);
    };

    drawNote() {
        this.ctx.fillStyle = this.color;

        // Turn shadows on for note
        this.ctx.shadowColor = 'black';
        this.ctx.shadowBlur = 25;
        this.ctx.shadowOffsetX = 10;
        this.ctx.shadowOffsetY = 10;

        this.ctx.beginPath();

        if (this.length === 0.5) {
            this.ctx.ellipse(this.x, this.drawHeight, 15, 21, 0, 0, 7);
        } else if (this.length === 0.25) {
            this.ctx.ellipse(this.x, this.drawHeight, 12, 21, 0, 0, 7);
        }

        this.ctx.stroke();
        this.ctx.fill();

        // Turn shadows off, or all things on the canvas will have a shadow.
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        this.writeFinger(this.finger);

        // If the note touches the playLine, change the color of the playLine.
        if (this.x - 15 < 300 && this.x + 15 > 305) {
            this.playLine.draw("white");

            // The currentNote comes from the pitchdetect.js file.
            if (currentNote === this.note) {
                this.correct = true;
                this.color = "green";
            }
        }
        if (this.x - 15 < (this.canvas.width / 9) && this.x + 15 > (this.canvas.width / 9) && this.correct === false) {
            return this.color = "red";
        }
    };
}

function Note(finger, length, time, canvas, ctx, y, note) {

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
  this.writeHeight = this. y + 7;
  this.x = this.canvas.width;

  this.fingerColor = function() {
    switch(this.finger) {
      case 0:
        return "black";
      case 1:
        return "purple";
      case 2:
        return "green";
      case 3:
        return "blue";
      case 4:
        return "red";
    }
  };

  this.color = this.fingerColor();

  this.writeFinger = function(finger) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(this.finger, this.x, this.writeHeight, canvas.width, canvas.height);
  };

  this.drawNote = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    if(this.length === 0.5) {
      ctx.ellipse(this.x, this.drawHeight, 15, 21, 0, 0, 7);
    }
    else if(this.length === 0.25) {
      ctx.ellipse(this.x, this.drawHeight, 12, 21, 0, 0, 7);
    }

    ctx.stroke();
    ctx.fill();
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.drawHeight, this.drawLength, this.height);
    this.writeFinger(this.finger);

    // If the note touches the playLine, change the color of the playLine.
    if(this.x - 15 < 300 && this.x + 15 > 305) {
      drawPlayLine("white");
        if(currentNote === this.note) {
            this.correct = true;
            this.color = "green";
        }
    }
    if(this.x - 15 < 285 && this.x + 15 > 290 && this.correct === false) {
        return this.color = "red";
    }
  };
}

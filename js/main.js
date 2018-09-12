// Guitar strings
var Ebig;
var A;
var D;
var G;
var B;
var Esmall;

// The player that creates all of the seperate notes.
var notePlayer;

var pause = false;
var background;
var pixelSpeed = 3;

var chords = [];
var chordsInPlay = [];

var tempo = 60;

// Global timer for new chords and notes to be put into played
var globalTime = performance.now();
// initialized when game is pauzed by pressing spacebar
var pauzeDate;

    document.addEventListener("keydown",keyPush);
    canv=document.getElementById("canvas");
    backgroundCanvas = document.getElementById("backgroundCanvas");

    // Set width of canvasses to screen size
    canv.width = window.innerWidth;
    canv.height = 500;
    backgroundCanvas.width = canv.width;
    backgroundCanvas.height = 500;


    ctx=canv.getContext("2d");
    bctx=backgroundCanvas.getContext("2d");
    setup();


function musicNote(name, timeInterval) {
  this.name = name;
  // The +500 ensures all of the text is in place before the chords show up. You can safely rewmove it to see the difference.
  this.position = {x:canvas.width + 500, y:canvas.height/2, drawSize: 0};
  this.timeInterval = timeInterval;
  this.date;
}

function setup() {
  Ebig    = new String("Ebig", canvas, bctx, 140, "grey");
  A       = new String("A", canvas, bctx, 200, "rgb(194, 192, 192)");
  D       = new String("D", canvas, bctx, 260, "rgb(201, 201, 201)");
  G       = new String("G", canvas, bctx, 320, "rgb(215, 215, 149)");
  B       = new String("B", canvas, bctx, 380, "rgba(215, 215, 149, 0.75)");
  Esmall  = new String("Esmall", canvas, bctx, 440, "rgba(215, 215, 149, 0.50)");

  // Create the notePlayer that plays all of the notes.
  notePlayer = new notePlayer();

  // The song.
  notePlayer.notes.push(new Note(0, 0.5, 0, canv, ctx, B.y, "B"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E"));
  notePlayer.notes.push(new Note(0, 0.5, 0, canv, ctx, G.y, "B"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "F"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "G"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "G"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "F"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, B.y, "D"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, B.y, "C"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, B.y, "C"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, B.y, "D"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E"));
  notePlayer.notes.push(new Note(0, 0.5, 0.8, canv, ctx, Esmall.y, "E"));
  notePlayer.notes.push(new Note(3, 0.25, 0.25, canv, ctx, B.y, "D"));
  notePlayer.notes.push(new Note(3, 0.25, 1, canv, ctx, B.y, "D"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, B.y, "A"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, B.y, "A"));
  notePlayer.notes.push(new Note(1, 0.5, 0.5, canv, ctx, B.y, "A"));
  notePlayer.notes.push(new Note(3, 0.5, 0.5, canv, ctx, B.y, "A"));
  notePlayer.notes.push(new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A"));
  notePlayer.notes.push(new Note(3, 0.5, 0.8, canv, ctx, B.y, "A"));
  notePlayer.notes.push(new Note(1, 0.25, 0.25, canv, ctx, B.y, "A"));
  notePlayer.notes.push(new Note(1, 0.25, 1, canv, ctx, B.y, "A"));

  clearCanvas();

  setBackground();

  chords = [
    // new musicNote("Em", 4), new musicNote("G", 4), new musicNote("D", 4), new musicNote("A", 4),
    // new musicNote("Em", 4), new musicNote("G", 4), new musicNote("D", 4), new musicNote("A", 4),
  ];

  chordsInPlay = [];
}

function setBackground() {
    // Set background color
    bctx.fillStyle = "#006747";
    bctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the guitar strings onto the screen.
    Ebig.drawString();
    A.drawString();
    D.drawString();
    G.drawString();
    B.drawString();
    Esmall.drawString();
}

function song() {

  if(!pause) {
    // Clear the canvas for the next drawing cycle;
    clearCanvas();

    notePlayer.addNotesInPlay();

    // Draw the line the player follows.
    drawPlayLine();

    notePlayer.moveNotes();

    // Add the next chord to be played to the chordsInPlay list.
    // drawChords();

    // Draw and move the chords that have been drawn.
    // moveChords();

    requestAnimationFrame(song);
  }
}

// Pushes chords into the chordsInPlay list at the right moment.
// After this function the *moveChords()* function takes over.
// function drawChords() {
//   chords.forEach((chord, index) => {
//     if(performance.now() >= globalTime) {
//       addSecondsToGlobalTimer(chord.timeInterval);
//       chord.date = new Date();
//       chord.endDate = new Date();
//       chord.endDate.setSeconds(chord.endDate.getSeconds() + calculateTempo(chord.timeInterval));
//       chord.number = 0;
//       chordsInPlay.push(chord);
//       chords.splice(index, 1);
//     }
//   });
// }
//
// function moveChords() {
//   // chord.position.x + chord.position.drawSize is the right most position of a chord block.
//   chordsInPlay.forEach((chord, index) => {
//     colorByName(chord);
//     if(chord.date < chord.endDate) {
//       chord.position.drawSize += pixelSpeed;
//       ctx.fillRect(chord.position.x, chord.position.y, chord.position.drawSize, canv.height);
//       chord.date = new Date();
//       chord.number -= pixelSpeed / 2;
//     }
//     else {
//       // chord.position.drawSize -= 2;
//       ctx.fillRect(chord.position.x, chord.position.y, chord.position.drawSize, canv.height);
//     }
//
//     // If a chord is passing the play line, draw the play line a different color.
//     if(chord.position.x < 300 && chord.position.x + chord.position.drawSize > 305) {
//       drawPlayLine("rgb(179, 140, 120)");
//     }
//
//     writeChordName(chord);
//     setChordPosition(chord);
//     removeChord(chord, index);
//   });
// }
//
// function writeChordName(chord) {
//   ctx.fillStyle = "white";
//   ctx.textAlign = "center";
//   ctx.fillText(chord.name, chord.position.x + chord.position.drawSize + chord.number, (chord.position.y + canv.height) / 2, canv.width, canv.height);
// }
//
// function setChordPosition(chord) {
//   chord.position.x -= pixelSpeed;
// }
//
// function removeChord(chord, index) {
//   if(chord.position.x + chord.position.drawSize <= -1000) {
//     chordsInPlay.splice(index, 1);
//   }
// }

function drawPlayLine(color) {
  if(color) {
    ctx.fillStyle = color;
  }
  else {
    ctx.fillStyle = "grey";
  }
  ctx.fillRect(canv.width / 9, 30, 5, canvas.height);
}

function clearCanvas() {
  ctx.clearRect(0,0,canv.width,canv.height);
}

function addSecondsToGlobalTimer(seconds) {
    globalTime = performance.now() + calculateTempo(seconds);
}

function calculateTempo(seconds) {
  let bpm = tempo / 60;
  return seconds / bpm;
}

// The colours of chords.
// function colorByName(chord) {
//   switch(chord.name) {
//     case "C":
//       ctx.fillStyle = "blue";
//       break;
//     case "D":
//       ctx.fillStyle = "red";
//       break;
//     case "F":
//       ctx.fillStyle = "purple";
//       break;
//     case "G":
//       ctx.fillStyle = "green";
//       break;
//     case "Am":
//       ctx.fillStyle = "orange";
//       break;
//     case "E":
//       ctx.fillStyle = "pink";
//       break;
//     case "A":
//       ctx.fillStyle = "#5cd3b8";
//       break;
//     case "Em":
//       ctx.fillStyle = "#d3d35c"
//   }
// }

// Used to pause the game.
function keyPush(evt) {
  switch(evt.keyCode) {
      case 32:
          if(!pause) {
            pause = true;
            pauzeDate = performance.now();
          }
          else {
            var pauzedTime = performance.now();

            // Calculate time the game was pauzed for.
            pauzedTime -= pauzeDate;

            // Set new globalTime. This has to be done this way since new notes are created based the time since the previous note was played.
            globalTime += pauzedTime;
            pause = false;

            // Restart the loop.
            requestAnimationFrame(song);
          }
          break;
      }
    }

requestAnimationFrame(song);
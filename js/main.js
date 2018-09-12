import { notePlayer } from './notePlayer.js';
import { Songs } from './../songs/song.js';
import { playLine } from './playLine.js';

// Guitar strings
var Ebig;
var A;
var D;
var G;
var B;
var Esmall;

var pause = false;
var background;
var pixelSpeed = 3;

var chords = [];
var chordsInPlay = [];

var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");
var bctx = backgroundCanvas.getContext("2d");;

// initialized when game is pauzed by pressing spacebar
var pauzeDate;

// This class keeps track of the current song and notes that need to be put in play.
var theNotePlayer = new notePlayer(performance.now(), 60);
var line = new playLine(canv, ctx);
var availableSongs = new Songs(line);


    document.addEventListener("keydown",keyPush);
    backgroundCanvas = document.getElementById("backgroundCanvas");

    // Set width of canvasses to screen size
    canv.width = window.innerWidth;
    canv.height = 500;
    backgroundCanvas.width = canv.width;
    backgroundCanvas.height = 500;
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

  // The song.
  theNotePlayer.setNotes(availableSongs.marryHadALittleLamp(canv,ctx,Ebig,A,D,G,B,Esmall));

  clearCanvas();

  setBackground();
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

    theNotePlayer.addNotesInPlay();

    // Draw the line the player follows.
    line.draw("grey");

    theNotePlayer.moveNotes();

    requestAnimationFrame(song);
  }
}

// function drawPlayLine(color) {
//   if(color) {
//     ctx.fillStyle = color;
//   }
//   else {
//     ctx.fillStyle = "grey";
//   }
//   ctx.fillRect(canv.width / 9, 30, 5, canvas.height);
// }

function clearCanvas() {
  ctx.clearRect(0,0,canv.width,canv.height);
}

function addSecondsToGlobalTimer(seconds) {
    globalTime = performance.now() + calculateTempo(seconds);
}

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

import { notePlayer } from './notePlayer.js';
import { Songs } from './songs/song.js';
import { playLine } from './playLine.js';
import { String } from './string.js';

class Main {

    constructor() {
        // Guitar strings
        this.Ebig;
        this.A;
        this.D;
        this.G;
        this.B;
        this.Esmall;
        this.pause = false;
        this.background;

        this.canv = document.getElementById("canvas");
        this.ctx = this.canv.getContext("2d");

        // initialized when game is pauzed by pressing spacebar
        this.pauzeDate;

        // global time used for played notes and pausing the game.
        this.globalTime = performance.now();

        // The tempo the song is played at (BPM)
        this.tempo = 60;

        // This class keeps track of the current song and notes that need to be put in play.
        this.theNotePlayer = new notePlayer(this.globalTime, this.tempo);
        this.line = new playLine(this.canv, this.ctx);
        this.availableSongs = new Songs(this.line);

        // Create keylistener for pauze button.
        document.addEventListener("keydown", this.keyPush.bind(this));
    }

    setup() {
        let backgroundCanvas = document.getElementById("backgroundCanvas");
        let bctx = backgroundCanvas.getContext("2d");;

        // Set width of canvasses to screen size
        this.canv.width = window.innerWidth;
        this.canv.height = 500;
        backgroundCanvas.width = this.canv.width;
        backgroundCanvas.height = 500;

        this.Ebig = new String("Ebig", backgroundCanvas, bctx, 140, "grey");
        this.A = new String("A", backgroundCanvas, bctx, 200, "rgb(194, 192, 192)");
        this.D = new String("D", backgroundCanvas, bctx, 260, "rgb(201, 201, 201)");
        this.G = new String("G", backgroundCanvas, bctx, 320, "rgb(215, 215, 149)");
        this.B = new String("B", backgroundCanvas, bctx, 380, "rgba(215, 215, 149, 0.75)");
        this.Esmall = new String("Esmall", backgroundCanvas, bctx, 440, "rgba(215, 215, 149, 0.50)");

        // Add a song to the note player.
        this.theNotePlayer.setNotes(this.availableSongs.marryHadALittleLamp(this.canv, this.ctx, this.Ebig, this.A, this.D, this.G, this.B, this.Esmall));

        this.clearCanvas();

        // The background load the background and strings. These are only loaded once this way.
        this.setBackground(bctx);

        // Start game loop.
        requestAnimationFrame(this.song.bind(this));
    }

    setBackground(bctx) {
        // Set background color
        bctx.fillStyle = "#006747";
        bctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the guitar strings onto the screen.
        this.Ebig.drawString();
        this.A.drawString();
        this.D.drawString();
        this.G.drawString();
        this.B.drawString();
        this.Esmall.drawString();
    }

    // The game loop.
    song() {

        if(!this.pause) {
            // Clear the canvas for the next drawing cycle;
            this.clearCanvas();

            // Draw new notes on the screen.
            this.theNotePlayer.addNotesInPlay();

            // Draw the line the player follows.
            this.line.draw("grey");

            // Move the notes drawn on the screen.
            this.theNotePlayer.moveNotes();

            requestAnimationFrame(this.song.bind(this));
        }
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
    }

    // Used to pause the game.
    keyPush(evt) {
        switch (evt.keyCode) {
            // Case 32 === spacebar
            case 32:
                // Pause game
                if (!this.pause) {
                    this.pause = true;

                    // Start timer when game is paused
                    performance.mark("pause-start");
                // Unpause game
                } else {

                    // Stop timer when game is continued
                    performance.mark("pause-end");

                    // Measure pause time
                    performance.measure(
                       "pause",
                       "pause-start",
                       "pause-end"
                    );

                    // Retrieve paused time
                    var measure = performance.getEntriesByName("pause")[0];

                    console.log(this.globalTime);
                    console.log(this.globalTime + measure.duration);

                    // Set new globalTime. This has to be done this way since new notes are created based the time since the previous note was played.
                    this.globalTime = this.globalTime += measure.duration;
                    this.pause = false;

                    // Restart the loop.
                    requestAnimationFrame(this.song.bind(this));
                }
                break;
        }
    }
}

// Create a new instance of Main to start the game.
// Run setup() to start game loop.
let game = new Main().setup();

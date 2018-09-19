import { notePlayer } from './notePlayer.js';
import { Song } from './songs/song.js';
import { playLine } from './playLine.js';
import { String } from './string.js';

class Main {

    constructor() {
        // Guitar strings, initiated in the setup().
        this.Ebig;
        this.A;
        this.D;
        this.G;
        this.B;
        this.Esmall;
        this.pause = false;
        this.background;

        // The main canvas moving and changing game elements are drawn on.
        // There is also a /*backgroundCanvas*/ for elements that are only drawn once.
        this.canv = document.getElementById("canvas");
        this.ctx = this.canv.getContext("2d");

        // initialized when game is pauzed by pressing spacebar
        this.pauzeDate;

        // The tempo the song is played at (BPM)
        this.tempo = 60;

        // This class keeps track of the current song and notes that need to be put in play.
        this.theNotePlayer = new notePlayer(this.tempo);
        this.line = new playLine(this.canv, this.ctx);
        this.availableSongs = new Song(this.line);

        // Create keylistener for pauze button.
        document.addEventListener("keydown", this.keyPush.bind(this));
    }

    /**
    * This is run once when the program starts.
    * It sets up all of the componente needed to run the game:
    *
    * The canvas on which the game is drawn,
    * The guitar strings,
    * The noteplayer that keeps track of and adds new notes in play,
    * A song is added to the notePlayer,
    * The function then starts the game loop
    *
    **/
    setup() {
        // Get the background canvas we are going to draw on.
        // This canvas is used for elements that only have to be drawn once.
        let backgroundCanvas = document.getElementById("backgroundCanvas");
        let bctx = backgroundCanvas.getContext("2d");;

        // Set canvasses width to screen size.
        this.canv.width = window.innerWidth;
        this.canv.height = 500;
        backgroundCanvas.width = this.canv.width;
        backgroundCanvas.height = 500;

        // Create the guitar strings.
        this.Ebig = new String("Ebig", backgroundCanvas, bctx, 140, "grey");
        this.A = new String("A", backgroundCanvas, bctx, 200, "rgb(194, 192, 192)");
        this.D = new String("D", backgroundCanvas, bctx, 260, "rgb(201, 201, 201)");
        this.G = new String("G", backgroundCanvas, bctx, 320, "rgb(215, 215, 149)");
        this.B = new String("B", backgroundCanvas, bctx, 380, "rgba(215, 215, 149, 0.75)");
        this.Esmall = new String("Esmall", backgroundCanvas, bctx, 440, "rgba(215, 215, 149, 0.50)");

        // Add a song to the note player.
        this.theNotePlayer.setNotes(this.availableSongs.marryHadALittleLamp(this.canv, this.ctx, this.Ebig, this.A, this.D, this.G, this.B, this.Esmall));

        // The background load the background and strings. These are only loaded once this way.
        this.setBackground(bctx);

        // Start game loop.
        requestAnimationFrame(this.GameLoop.bind(this));
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
    GameLoop() {

        if (!this.pause) {
            // Clear the canvas for the next drawing cycle;
            this.clearCanvas();

            // Draw new notes on the screen.
            this.theNotePlayer.addNotesInPlay();

            // Draw the line the player follows.
            this.line.draw("grey");

            // Move the notes drawn on the screen.
            this.theNotePlayer.moveNotes();

            requestAnimationFrame(this.GameLoop.bind(this));
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

                    // Start a timer when game is paused
                    performance.mark("pause-start");

                // Unpause game
                } else {

                    // Stop timer when game is continued
                    performance.mark("pause-end");

                    // Measure time game was paused for
                    performance.measure(
                        "pause",
                        "pause-start",
                        "pause-end"
                    );

                    // Retrieve paused time measured above
                    var measure = performance.getEntriesByName("pause")[0].duration;

                    // Set new globalTime. This has to be done this way since new notes are created based the time since the previous note was played.
                    this.theNotePlayer.setGlobalTime(this.theNotePlayer.getGlobalTime() + measure);

                    // Clear timer results so game can be paused again later.
                    performance.clearMarks();
                    performance.clearMeasures();

                    this.pause = false;

                    // Restart the loop.
                    requestAnimationFrame(this.GameLoop.bind(this));
                }
                break;
        }
    }
}

// Create a new instance of Main to start the game.
// Run setup() to start game loop.
let game = new Main().setup();

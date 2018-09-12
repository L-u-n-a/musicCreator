/*jshint esversion: 6*/
function Chord(name, timeInterval) {

    // The name of the chord. E.g: Em, E, A, G, D, F, etc
    this.name = name;

    // The +500 ensures all of the text is in place before the chords show up. You can safely rewmove it to see the difference.
    this.position = {
        x: canvas.width + 500,
        y: canvas.height / 2,
        drawSize: 0
    };
    // The amount of time the chord has to be played.
    this.timeInterval = timeInterval;
    this.date = null;

    // Pushes chords into the chordsInPlay list at the right moment.
    // After this function the *moveChords()* function takes over.
    this.drawChords = function() {
        chords.forEach((chord, index) => {
            if (new Date() >= globalTime) {
                addSecondsToGlobalTimer(chord.timeInterval);
                chord.date = new Date();
                chord.endDate = new Date();
                chord.endDate.setSeconds(chord.endDate.getSeconds() + calculateTempo(chord.timeInterval));
                chord.number = 0;
                chordsInPlay.push(chord);
                chords.splice(index, 1);
            }
        });
    };

    this.writeChordName = function(chord) {
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(chord.name, chord.position.x + chord.position.drawSize + chord.number, (chord.position.y + canv.height) / 2, canv.width, canv.height);
    };

    this.setChordPosition = function(chord) {
        chord.position.x -= pixelSpeed;
    };

    this.removeChord = function(chord, index) {
        if (chord.position.x + chord.position.drawSize <= -1000) {
            chordsInPlay.splice(index, 1);
        }
    };

    function moveChords() {
        // chord.position.x + chord.position.drawSize is the right most position of a chord block.
        chordsInPlay.forEach((chord, index) => {
            colorByName(chord);
            if (chord.date < chord.endDate) {
                chord.position.drawSize += pixelSpeed;
                ctx.fillRect(chord.position.x, chord.position.y, chord.position.drawSize, canv.height);
                chord.date = new Date();
                chord.number -= pixelSpeed / 2;
            } else {
                // chord.position.drawSize -= 2;
                ctx.fillRect(chord.position.x, chord.position.y, chord.position.drawSize, canv.height);
            }

            // If a chord is passing the play line, draw the play line a different color.
            if (chord.position.x < 300 && chord.position.x + chord.position.drawSize > 305) {
                drawPlayLine("rgb(179, 140, 120)");
            }

            writeChordName(chord);
            setChordPosition(chord);
            removeChord(chord, index);
        });
    }
}
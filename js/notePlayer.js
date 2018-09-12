/*jshint esversion: 6*/
export class notePlayer {

    constructor(globalTime, tempo) {
        this.notes = [];
        this.notesInPlay = [];
        this.globalTime = performance.now();
        this.tempo = tempo;
    }

    addSecondsToGlobalTimer(seconds) {
        this.globalTime += this.calculateTempo(seconds * 1000);
    };

    addNotesInPlay(note) {

        if (performance.now() >= this.globalTime && this.notes.length > 0) {
            let nextNote = this.notes[0]
            this.notesInPlay.push(nextNote);

            this.addSecondsToGlobalTimer(nextNote.time);

            // Remove the note after adding it, or it will be added multible times and speed up.
            // Set to null so it will be gargabe collected.
            this.notes[0] = null;
            this.notes.splice(0, 1);
        }
    };

    removeNote(note) {
        if (note.x <= -100) {
            // Set note to null so it will be garbage collected.
            note = null;
            this.notesInPlay.splice(0, 1);
        }
    };

    moveNotes() {
        this.notesInPlay.forEach((note) => {
            note.drawNote();
            note.x -= 2;
        });

        // Check if the first note in the list is ready to be removed.
        if (this.notesInPlay.length > 0) {
            let nextNote = this.notesInPlay[0];
            this.removeNote(nextNote);
        }
    };

    calculateTempo(seconds) {
        let bpm = this.tempo / 60;
        return seconds / bpm;
    }

    setNotes(notes) {
        this.notes = notes;
    }
}
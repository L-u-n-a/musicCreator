/*jshint esversion: 6*/
function notePlayer() {

  this.notes = [];
  this.notesInPlay = [];

  this.addSecondsToGlobalTimer = function(seconds) {
    globalTime += calculateTempo(seconds * 1000);
  };

  this.addNotesInPlay = function(note) {

      if(performance.now() >= globalTime && this.notes.length > 0) {
          let nextNote = this.notes[0]
          this.notesInPlay.push(nextNote);

          this.addSecondsToGlobalTimer(nextNote.time);

          // Remove the note after adding it, or it will be added multible times and speed up.
          // Set to null so it will be gargabe collected.
          this.notes[0] = null;
          this.notes.splice(0, 1);
      }
  };

  this.removeNote = function(note) {
    if(note.x <= -100) {
      // Set note to null so it will be garbage collected.
      note = null;
      this.notesInPlay.splice(0, 1);
    }
  };

  this.moveNotes = function() {
    this.notesInPlay.forEach((note) => {
      note.drawNote();
      note.x -= 2;
    });

    // Check if the first note in the list is ready to be removed.
    if(this.notesInPlay.length > 0) {
        let nextNote = this.notesInPlay[0];
        this.removeNote(nextNote);
    }
  };
}

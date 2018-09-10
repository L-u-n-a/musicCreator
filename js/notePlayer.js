/*jshint esversion: 6*/
function notePlayer() {

  this.notes = [];
  this.notesInPlay = [];

  this.addSecondsToGlobalTimer = function(seconds) {
    globalTime += calculateTempo(seconds * 1000);
  };

  this.addNotesInPlay = function(note) {

      if(performance.now() >= globalTime) {
          if(this.notes.length > 0) {
              let nextNote = this.notes[0]
              this.notesInPlay.push(nextNote);

              this.addSecondsToGlobalTimer(nextNote.time);

              // Remove the note after adding it, or it will be added multible times and speed up.
              this.notes.splice(0, 1);
          }
      }
  };

  this.removeNote = function(note, index) {
    if(note.x <= -100) {
      this.notesInPlay.splice(index, 1);
      console.log("Removed!")
    }
  };

  this.moveNotes = function() {
    this.notesInPlay.forEach((note) => {
      note.drawNote();
      note.x -= 2;
    });

    // Check if the first note in the list is ready to be removed.
    let nextNote = this.notesInPlay[0];
    this.removeNote(nextNote);
  };
}

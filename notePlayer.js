/*jshint esversion: 6*/
function notePlayer() {

  this.notes = [];
  this.notesInPlay = [];

  this.addSecondsToGlobalTimer = function(seconds) {
    globalTime.setTime(globalTime.valueOf() + calculateTempo(seconds * 1000));
  };

  this.addNotesInPlay = function(note) {
    this.notes.forEach((note, index) => {
      let tempDate = new Date();
      let someTime = tempDate.getMilliseconds() + (tempDate.getSeconds() * 10000);

      let globalTimeInMilli = globalTime.getMilliseconds() + (globalTime.getSeconds() * 10000);
      if(new Date() >= globalTime) {
        this.notesInPlay.push(note);
        // Remove the note after adding it, or it will be added multible times and speed up.
        this.notes.splice(index, 1);
        this.addSecondsToGlobalTimer(note.time);
      }
    });
  };

  this.removeNote = function(note, index) {
    if(note.x <= -100) {
      this.notesInPlay.splice(index, 1);
    }
  };

  this.moveNotes = function() {
    this.notesInPlay.forEach((note) => {
      note.drawNote();
      note.x -= 2;
      this.removeNote(note);
    });
  };
}

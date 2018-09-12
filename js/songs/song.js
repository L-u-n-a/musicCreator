import { Note } from './../note.js'

export class Songs {

    constructor(playLine) {
        this.playLine = playLine;
    }

    marryHadALittleLamp(canv, ctx, Ebig,A,D,G,B,Esmall) {
        return [
            new Note(0, 0.5, 0, canv, ctx, B.y, "B", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E", this.playLine),
            new Note(0, 0.5, 0, canv, ctx, G.y, "B", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "F", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "G", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "G", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "F", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, B.y, "D", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, B.y, "C", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, B.y, "C", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, B.y, "D", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "E", this.playLine),
            new Note(0, 0.5, 0.8, canv, ctx, Esmall.y, "E", this.playLine),
            new Note(3, 0.25, 0.25, canv, ctx, B.y, "D", this.playLine),
            new Note(3, 0.25, 1, canv, ctx, B.y, "D", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, B.y, "A", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, B.y, "A", this.playLine),
            new Note(1, 0.5, 0.5, canv, ctx, B.y, "A", this.playLine),
            new Note(3, 0.5, 0.5, canv, ctx, B.y, "A", this.playLine),
            new Note(0, 0.5, 0.5, canv, ctx, Esmall.y, "A", this.playLine),
            new Note(3, 0.5, 0.8, canv, ctx, B.y, "A", this.playLine),
            new Note(1, 0.25, 0.25, canv, ctx, B.y, "A", this.playLine),
            new Note(1, 0.25, 1, canv, ctx, B.y, "A", this.playLine),
        ];
    };
}

import { Component } from "@angular/core";
import { NoteService } from "./note.service";
import { Note } from "./note";
import { ActivatedRoute, Router } from "../../../node_modules/@angular/router";

@Component({
    selector: 'app-note-form',
    templateUrl: './note-form.component.html'
})
export class NoteFormComponent {
    constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) { }
    note: Note;
    errorMessage: string;

    onSubmit() {
        this.noteService.saveNote(this.note).subscribe(
            note => {
                this.note = note;
                this.router.navigate(['/notes/edit', note.id])
            },
            error => this.errorMessage = <any>error
        );
    }

    deleteNote() {
        this.noteService.deleteNote(this.note).subscribe(
            data => {
                this.router.navigate(['/notes'])
            },
            error => this.errorMessage = <any>error
        );
    }

    ngOnInit(): void {
        let  noteId: string = this.route.snapshot.paramMap.get('id');
        if (noteId) {
            this.noteService.findNote(+noteId).subscribe(
                note => {
                    this.note = note;
                    console.info("the id: " + noteId)
                },
                error => this.errorMessage = <any>error
            );
        }
        else {
            this.noteService.newNote().subscribe(
                note => {
                    this.note = note;
                    console.info("id: " + +noteId)
                },
                error => this.errorMessage = <any>error
            );
        }
    }
}
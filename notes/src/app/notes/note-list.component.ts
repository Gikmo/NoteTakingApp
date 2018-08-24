import { Component } from "@angular/core";
import { NoteService } from "./note.service";
import { Note } from "./note";

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html'
})
export class NoteListComponent {
    constructor(private noteService: NoteService){}
    notes: Note[];
    errorMessage: string;
    
    ngOnInit(): void {
        this.noteService.getNotes().subscribe(
            notes => {
                this.notes = notes["results"];;
            },
            error => this.errorMessage = <any>error
        );
    }
}
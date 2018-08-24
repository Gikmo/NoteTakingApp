import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import {catchError, tap} from 'rxjs/operators'

import { Note } from './note';

@Injectable({
    providedIn: 'root'
})
export class NoteService{
    constructor(private http: HttpClient) {}

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>("http://localhost:5000/getNotes").pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    findNote(id:number): Observable<Note> {
        return this.http.get<Note>(`http://localhost:5000/findNote?id=${id.toString()}`).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    newNote(): Observable<Note> {
        return this.http.get<Note>(`http://localhost:5000/newNote`).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    saveNote(noteToSave:Note): Observable<Note> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Note>(`http://localhost:5000/saveNote`, noteToSave, httpOptions).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    deleteNote(noteToDelete:Note): Observable<Note> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Note>(`http://localhost:5000/deleteNote`, noteToDelete, httpOptions).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
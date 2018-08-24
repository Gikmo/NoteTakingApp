import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { NoteListComponent } from './notes/note-list.component';
import { NoteFormComponent } from './notes/note-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'notes/create', component: NoteFormComponent },
      { path: 'notes/edit/:id', component: NoteFormComponent },
      { path: 'notes', component: NoteListComponent },
      { path: '', redirectTo: 'notes', pathMatch: 'full' }
    ], { useHash: true})
  ],
  providers: [],
  bootstrap: [
    AppComponent]
})
export class AppModule { }

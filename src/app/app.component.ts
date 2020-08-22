import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Note } from './models/note.interface';
import { Observable } from 'rxjs';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  notes$: Observable<Note[]>;
  showSideBar;

  constructor(
    private store: Store<{ notes: Note[] }>,
    private noteService: NoteService
  ) {
    this.notes$ = store.pipe(select('notes'));
    this.noteService.expandSidebarEvent.subscribe(
      (data) => (this.showSideBar = data)
    );
  }
}

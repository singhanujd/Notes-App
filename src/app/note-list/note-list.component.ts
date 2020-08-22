import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Note } from '../models/note.interface';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: Note[];
  constructor(private store: Store<{ notes: Note[] }>) {
    this.store
      .pipe(select('notes'))
      .subscribe((response) => (this.notes = response));
  }

  ngOnInit(): void {}
}

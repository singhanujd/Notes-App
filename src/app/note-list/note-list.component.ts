import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Note } from '../models/note.interface';
import { Observable } from 'rxjs';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes$: Observable<Note[]>;
  searchTerm;

  constructor(
    private store: Store<{ notes: Note[] }>,
    private noteService: NoteService
  ) {
    this.notes$ = this.store.pipe(select('notes'));
    this.noteService.searchTerm.subscribe((data) => {
      this.searchTerm = data;
    });
  }

  ngOnInit(): void {}
}

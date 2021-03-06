import { Component, OnInit, Output, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Note } from '../models/note.interface';
import { addNote, updateNote, deleteNote } from '../store/notes.actions';
import { getSelectedNote } from '../store/notes.selector';
import { v4 as uuidv4 } from 'uuid';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;
  id: string;
  title: string = '';
  description: string = '';
  timestamp: string;
  constructor(
    private noteService: NoteService,
    private store: Store<{ notes: Note[] }>
  ) {
    this.noteService.newNoteEvent.subscribe({
      next: () => {
        this.newNote();
        this.dispatchAddNoteAction();
      },
    });
    this.noteService.deleteNoteEvent.subscribe({
      next: () => {
        this.store.dispatch(deleteNote({ noteId: this.id }));
        this.newNote();
        this.dispatchAddNoteAction();
      },
    });
    this.noteService.selectedNote.subscribe({
      next: (noteId) => {
        this.store
          .pipe(select(getSelectedNote, { noteId: noteId }))
          .subscribe((data) => {
            if (data) {
              this.title = data.title;
              this.description = data.description;
              this.timestamp = data.timestamp;
              this.id = data.id;
            }
          });
      },
    });
  }

  ngOnInit(): void {
    this.newNote();
    this.dispatchAddNoteAction();
  }

  getTitle(event: any) {
    this.title = event.target.textContent;
    this.dispatchUpdateNoteAction();
  }

  getDescription(event: any) {
    this.description = event.target.textContent;
    this.dispatchUpdateNoteAction();
  }

  newNote() {
    this.id = uuidv4();
    this.title = '';
    this.description = '';
    this.timestamp = new Date().toLocaleString();
  }

  placeholderTextVisibility() {
    return this.title.length !== 0 ? 'none' : 'block';
  }

  dispatchAddNoteAction() {
    this.store.dispatch(
      addNote({
        note: {
          id: this.id,
          title: this.title,
          description: this.description,
          timestamp: this.timestamp,
        },
      })
    );
  }

  dispatchUpdateNoteAction() {
    this.store.dispatch(
      updateNote({
        id: this.id,
        note: {
          title: this.title,
          description: this.description,
          timestamp: this.timestamp,
        },
      })
    );
  }
}

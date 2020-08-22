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
      },
    });
    this.noteService.deleteNoteEvent.subscribe({
      next: () => {
        this.store.dispatch(deleteNote({ noteId: this.id }));
        this.newNote();
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
      },
    });
    this.noteService.selectedNote.subscribe({
      next: (noteId) => {
        this.store
          .pipe(select(getSelectedNote, { noteId: noteId }))
          .subscribe((data) => {
            this.title = data.title;
            this.description = data.description;
            this.timestamp = data.timestamp;
            this.id = data.id;
          });
      },
    });
  }

  ngOnInit(): void {
    this.newNote();
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

  getTitle(event: any) {
    this.title = event.target.textContent;
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

  getDescription(event: any) {
    this.description = event.target.textContent;
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

  newNote() {
    this.id = uuidv4();
    this.title = '';
    this.description = '';
    this.timestamp = new Date().toLocaleString();
  }
}

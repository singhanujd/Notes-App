import { createReducer, on } from '@ngrx/store';
import { addNote, deleteNote, updateNote } from './notes.actions';
import { Note } from '../models/note.interface';

export const initialState: Note[] = [];

const _notesReducer = createReducer(
  initialState,
  on(updateNote, (state, { id, note }) => {
    let newState = state;
    newState = newState.map((item) => {
      if (item.id === id) {
        item = { id, ...note };
      }
      return item;
    });
    return newState;
  }),
  on(addNote, (state: Note[], { note }) => [note, ...state]),
  on(deleteNote, (state: Note[], { noteId }) =>
    state.filter((item) => item.id !== noteId)
  )
);

export function notesReducer(state, action) {
  return _notesReducer(state, action);
}

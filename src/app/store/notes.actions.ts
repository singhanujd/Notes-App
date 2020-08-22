import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note.interface';

// export const increment = createAction('[Counter Component] Increment');
// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');

export const getNote = createAction('[] Get Note', props<{ noteId: string }>());
export const addNote = createAction('[] Add Note', props<{ note: Note }>());
export const updateNote = createAction(
  '[] Update Note',
  props<{ id: string; note: Note }>()
);
export const deleteNote = createAction(
  '[] Delete Note',
  props<{ noteId: String }>()
);
export const loadNotes = createAction('[] Load Notes');

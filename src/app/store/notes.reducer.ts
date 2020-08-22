import { createReducer, on } from '@ngrx/store';
import {
  addNote,
  getNote,
  deleteNote,
  loadNotes,
  updateNote,
} from './notes.actions';
import { Note } from '../models/note.interface';

export const initialState: Note[] = [
  {
    id: '1123232',
    title: 'Angular',
    description: 'Learn Angular',
    timestamp: '13232',
  },
];

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

// import { State, Action, on } from '@ngrx/store';
// import { addNote, getNote, deleteNote, loadNotes } from './notes.actions';
// import { Note } from '../models/note.interface';

// const initialState: Note[] = [
//   {
//     title: 'Angular 1',
//     description: 'Hi I am Angular',
//     timestamp: '14',
//     id: '12',
//   },
// ];

// function _noteReducer(state: State<Note[]>, action) {
//   on(addNote, (state: Note[], { note }) => {
//     console.log('HI', state, note);
//     return [{}];
//   }),
//     on(getNote, (state: Note[], { noteId }) => state),
//     on(deleteNote, (state: Note[], { noteId }) =>
//       state.filter((item) => item.id !== noteId)
//     ),
//     on(loadNotes, (state) => state);
// }

// export function noteReducer(state: State<Note[]>, action: Action) {
//   return _noteReducer(state, action);
// }

// // import { createReducer, on } from '@ngrx/store';
// // import { increment, decrement, reset } from './notes.actions';

// // export const initialState = 0;

// // const _counterReducer = createReducer(
// //   initialState,
// //   on(increment, (state) => state + 1),
// //   on(decrement, (state) => state - 1),
// //   on(reset, (state) => 0)
// // );

// // export function counterReducer(state, action) {
// //   return _counterReducer(state, action);
// // }

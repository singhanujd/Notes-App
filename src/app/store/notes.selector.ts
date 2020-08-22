import { createSelector, State, createFeatureSelector } from '@ngrx/store';

export const selectFeature = createFeatureSelector('notes');

export const getSelectedNote = createSelector(selectFeature, (state, props) => {
  const selectedNote = state.find((item) => item.id === props.noteId);
  return selectedNote;
});

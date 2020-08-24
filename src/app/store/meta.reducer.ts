import { ActionReducer, MetaReducer } from '@ngrx/store';
import { LocalStorageService } from 'src/app/services/local-storage.service';
const localStorageKey = '__app_storage__';

export function debugFactory(
  localStorageService: LocalStorageService
): MetaReducer<any> {
  return function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    let onInit = true;
    return function (state, action) {
      if (onInit) {
        onInit = false;
        return localStorageService.getSavedState(localStorageKey) || [];
      }
      localStorageService.setSavedState(localStorageKey, state);
      return reducer(state, action);
    };
  };
}

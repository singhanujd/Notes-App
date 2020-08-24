import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: Note[], searchedTerm: string): Note[] {
    const re = new RegExp(searchedTerm, 'gi');
    if (Boolean(searchedTerm) && value.length > 0)
      return value.filter((item) => {
        return re.test(item.description) || re.test(item.title);
      });
    return value;
  }
}

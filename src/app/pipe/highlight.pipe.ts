import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note.interface';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: Note[], searchedTerm: string): Note[] {
    const re = new RegExp(searchedTerm, 'gi');
    if (Boolean(searchedTerm) && value.length > 0) {
      let newNotes = [];
      for (let item of value) {
        newNotes.push({
          ...item,
          title: item.title.replace(
            re,
            `<span class='highlight'>${searchedTerm}</span>`
          ),
          description: item.description.replace(
            re,
            `<span class='highlight'>${searchedTerm}</span>`
          ),
        });
      }
      return newNotes;
    }
    return value;
  }
}

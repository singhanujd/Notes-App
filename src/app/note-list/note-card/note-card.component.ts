import { Component, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Note } from 'src/app/models/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as moment from 'moment';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NoteCardComponent implements OnDestroy {
  timer: number;
  currentNote: Note;
  timestamp;
  @Input() set note(value: Note) {
    this.currentNote = value;
    this.timestamp = moment(this.currentNote.timestamp).fromNow();
  }

  constructor(
    private noteService: NoteService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.timer = setInterval(() => {
      this.timestamp = moment(this.currentNote.timestamp).fromNow();
    }, 1000);
  }

  isNoteNotEmpty() {
    return this.currentNote.title || this.currentNote.description;
  }

  openSelectedNote() {
    this.noteService.selectedNote.next(this.currentNote.id);
    if (this.deviceDetectorService.isMobile()) {
      this.noteService.toggleSideBar();
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/models/note.interface';
import { NoteService } from 'src/app/services/note.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note;

  constructor(
    private noteService: NoteService,
    private deviceDetectorService: DeviceDetectorService
  ) {}

  ngOnInit(): void {}

  getTime(date: string) {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  isNoteNotEmpty() {
    return this.note.title || this.note.description;
  }

  openSelectedNote() {
    this.noteService.selectedNote.next(this.note.id);
    if (this.deviceDetectorService.isMobile()) {
      this.noteService.toggleSideBar();
    }
  }
}

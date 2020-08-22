import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSidebar;
  constructor(private noteService: NoteService) {
    this.noteService.expandSidebarEvent.subscribe(
      (data) => (this.showSidebar = data)
    );
  }

  ngOnInit(): void {}

  createNewNote() {
    this.noteService.newNoteEvent.next();
  }

  deleteCurrentNote() {
    this.noteService.deleteNoteEvent.next();
  }

  toggleSidebar() {
    this.noteService.toggleSideBar();
  }
}

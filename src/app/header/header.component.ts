import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showSidebar$;
  searchKey;

  constructor(
    private noteService: NoteService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.noteService.toggleSideBar();
    this.showSidebar$ = this.noteService.expandSidebarEvent;
  }

  searchText(event) {
    this.noteService.searchTerm.next(event.target.value);
  }

  createNewNote() {
    this.noteService.newNoteEvent.next();
    if (this.deviceDetectorService.isMobile()) {
      this.noteService.collapseSidebar();
    }
  }

  deleteCurrentNote() {
    this.noteService.deleteNoteEvent.next();
  }

  toggleSidebar() {
    this.noteService.toggleSideBar();
  }
}

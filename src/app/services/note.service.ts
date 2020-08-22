import { BehaviorSubject, Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public deleteNoteEvent = new Subject();
  public expandSidebarEvent = new Subject();
  public newNoteEvent = new Subject();
  public selectedNote = new Subject();
  showSidebar;

  constructor(private deviceDetectorService: DeviceDetectorService) {
    if (this.deviceDetectorService.isMobile()) {
      this.showSidebar = false;
    } else {
      this.showSidebar = true;
    }
  }

  newNote() {
    this.newNoteEvent.next();
  }

  toggleSideBar() {
    this.showSidebar = !this.showSidebar;
    this.expandSidebarEvent.next(this.showSidebar);
  }
}

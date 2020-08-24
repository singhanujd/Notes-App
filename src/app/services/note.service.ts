import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  public deleteNoteEvent = new Subject();
  public expandSidebarEvent = new Subject();
  public newNoteEvent = new Subject();
  public selectedNote = new Subject();
  public searchTerm = new Subject();
  showSidebar: boolean = true;

  constructor() {}

  newNote() {
    this.newNoteEvent.next();
  }

  toggleSideBar() {
    this.showSidebar = !this.showSidebar;
    this.expandSidebarEvent.next(this.showSidebar);
  }

  expandSidebar() {
    this.showSidebar = true;
    this.expandSidebarEvent.next(this.showSidebar);
  }

  collapseSidebar() {
    this.showSidebar = false;
    this.expandSidebarEvent.next(this.showSidebar);
  }
}

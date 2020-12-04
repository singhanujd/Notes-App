import { Component } from '@angular/core';
import { NoteService } from './services/note.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSideBar$: any;

  constructor(
    private noteService: NoteService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.showSideBar$ = this.noteService.expandSidebarEvent;
    // sdfdsfdg
  }

  ngAfterViewInit() {
    if (this.deviceDetectorService.isDesktop()) {
      this.noteService.expandSidebar();
    }
  }
}

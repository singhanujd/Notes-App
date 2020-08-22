import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { notesReducer } from 'src/app/store/notes.reducer';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { HeaderComponent } from './header/header.component';
import { NoteCardComponent } from './note-list/note-card/note-card.component';
import { NoteService } from './services/note.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailsComponent,
    HeaderComponent,
    NoteCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    StoreModule.forRoot({ notes: notesReducer }),
  ],
  providers: [NoteService],
  bootstrap: [AppComponent],
})
export class AppModule {}

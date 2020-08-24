import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, META_REDUCERS } from '@ngrx/store';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { notesReducer } from 'src/app/store/notes.reducer';
import { debugFactory } from 'src/app/store/meta.reducer';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { HeaderComponent } from './header/header.component';
import { NoteCardComponent } from './note-list/note-card/note-card.component';
import { NoteService } from './services/note.service';
import { HighlightPipe } from './pipe/highlight.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailsComponent,
    HeaderComponent,
    NoteCardComponent,
    HighlightPipe,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DeviceDetectorModule.forRoot(),
    StoreModule.forRoot({ notes: notesReducer }),
  ],
  providers: [
    NoteService,
    {
      provide: META_REDUCERS,
      deps: [LocalStorageService],
      useFactory: debugFactory,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatAutocompleteModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MatBadgeModule,
  MatSelectModule,
  MatTableModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatCheckboxModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatNativeDateModule
} from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MessengerComponent } from './messenger/messenger.component';
import { HomeComponent } from './home/home.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { USE_VALUE } from '@angular/core/src/di/injector';
import { StaffComponent } from './staff/staff.component';
import { BoardComponent } from './board/board.component';
import { StaffService } from './services/staff.service';
import { EventsComponent } from './events/events.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsService } from './services/events.service';
import { EventbydayComponent } from './eventbyday/eventbyday.component';
import { EventEditorComponent } from './event-editor/event-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    MessengerComponent,
    HomeComponent,
    StaffComponent,
    BoardComponent,
    EventsComponent,
    CalendarComponent,
    EventbydayComponent,
    EventEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'zh-TW' },
    StaffService,
    EventsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EventsComponent,
    EventbydayComponent,
    EventEditorComponent]
})
export class AppModule { }

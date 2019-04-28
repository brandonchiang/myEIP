import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { StaffComponent} from './staff/staff.component';
import { MessengerComponent} from './messenger/messenger.component';
import { BoardComponent } from './board/board.component';
import { EventsComponent } from './events/events.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TodoComponent } from './todo/todo.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'board', component: BoardComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'events', component: EventsComponent},
  {path: 'staff', component: StaffComponent},
  {path: 'todo', component: TodoComponent},
  {path: 'timesheet', component: TimesheetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

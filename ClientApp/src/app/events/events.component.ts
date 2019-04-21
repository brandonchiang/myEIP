import { Component, OnInit, Inject } from '@angular/core';
import { EventModel } from '../model/events';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { EventEditorComponent } from '../event-editor/event-editor.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['edit', 'data_seq', 'date', 'name', 'desc',  'delete'];
  public dataSource$: Observable<EventModel[]>;
  eventDataSource: MatTableDataSource<any>;

  filterFrom: Date;
  filterTo: Date;
  filterWords: string;
  today: Date;

  constructor(private eventService: EventsService,
    public dialog: MatDialog) {
    this.today = new Date();
  }

  ngOnInit() {
    this.dataSource$ = this.getEvents();
  }

  private getEvents() {
    return this.eventService.getEvents()
      .pipe(map(data => data.sort((d1: any, d2: any) => {
        if (d1.WORK_DATE > d2.WORK_DATE) {
          return 1;
        }
        if (d1.WORK_DATE < d2.WORK_DATE) {
          return -1;
        }
        return 0;
      })));
  }

  filterEvents(keyword: string) {
    if (this.filterFrom || this.filterTo || this.filterWords) {
      this.dataSource$ = this.eventService.searchEvents(this.filterFrom, this.filterTo, this.filterWords);
    } else {
      this.dataSource$ = this.getEvents();
    }
  }

  edit(row: EventModel) {
    this.dialog.open(EventEditorComponent, {
      width: '50vw',
      data: { data_seq: row.DATA_SEQ, date: new Date(row.WORK_DATE) }
    });
  }

  delete(row: EventModel, index: number) {
    // this.eventService.delete(row.DATA_SEQ, this.today).subscribe(
    //   data => {
    //     this.eventDataSource = new MatTableDataSource(data);
    //   },
    //   error => console.log(error)
    // );
  }
}

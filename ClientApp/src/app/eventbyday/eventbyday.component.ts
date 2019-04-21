import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../model/events';
import { EventsService } from '../services/events.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { EventEditorComponent } from '../event-editor/event-editor.component';

@Component({
  selector: 'app-eventbyday',
  templateUrl: './eventbyday.component.html',
  styleUrls: ['./eventbyday.component.css']
})
export class EventbydayComponent implements OnInit {
  work_date: Date;

  displayedColumns: string[] = ['data_seq', 'name', 'desc', 'edit', 'delete'];
  public eventDataSource$: Observable<EventModel[]>;
  eventDataSource: MatTableDataSource<any>;

  constructor(private eventService: EventsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private data) {

  }

  ngOnInit() {
    // this.eventDataSource$ = this.eventService.getEvents(new Date(this.date), new Date(this.date));
    this.work_date = this.data.date;
    // console.log(this.work_date);
    this.eventService.getEvent(new Date(this.work_date)).subscribe(
      data => {
        this.eventDataSource = new MatTableDataSource(data);
      },
      error => console.log(error)
    );
  }

  addnew($event) {
    this.dialog.open(EventEditorComponent, {
      width: '50vw',
      data: { data_seq: 0 , date: new Date(this.work_date) }
    });
  }

  edit(row: EventModel) {
    this.dialog.open(EventEditorComponent, {
      width: '50vw',
      data: { data_seq: row.DATA_SEQ, date: new Date(row.WORK_DATE)  }
    });
  }

  delete(row: EventModel, index: number) {
    // this.eventService.delete(row.DATA_SEQ);
    this.eventService.delete(row.DATA_SEQ, this.work_date).subscribe(
      data => {
        this.eventDataSource = new MatTableDataSource(data);
      },
      error => console.log(error)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

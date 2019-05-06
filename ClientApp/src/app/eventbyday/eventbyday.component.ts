import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from '../model/events';
import { EventsService } from '../services/events.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-eventbyday',
  templateUrl: './eventbyday.component.html',
  styleUrls: ['./eventbyday.component.css']
})
export class EventbydayComponent implements OnInit {
  work_date: Date;

  displayedColumns: string[] = ['edit', 'data_seq', 'name', 'desc',  'delete'];
  public eventDataSource$: Observable<IEvent[]>;
  eventDataSource: MatTableDataSource<any>;

  constructor(private eventService: EventsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EventEditorComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data) {
    // alert(JSON.stringify(data));
  }

  ngOnInit() {
    // this.eventDataSource$ = this.eventService.getEvents(new Date(this.date), new Date(this.date));
    this.work_date = this.data.date;
    // this.work_date.setHours(0, 0, 0);
    this.getEvents();
  }

  private getEvents() {
    this.eventService.getEvent(this.work_date).subscribe(data => {
      this.eventDataSource = new MatTableDataSource(data);
    }, error => console.log(error));
  }

  addnew($event) {
    // console.log(this.work_date);
    this.openEditDialog({ DATA_SEQ: 0, WORK_DATE: this.work_date });
  }

  edit(row: IEvent) {
    // console.log(row.WORK_DATE);
    this.openEditDialog(row);
  }

  openEditDialog(row?) {
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '50vw',
      data: row
    });

    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();

        // mat-select 的結果是 array ，傳給API前要轉成 string
        // row.EMP_NAME = row.EMP_NAME.join(',');
        if (row.DATA_SEQ === 0) {
          this.snackBar.open('資料儲存中', 'addnew...', {
            duration: 200,
          });
          // alert(JSON.stringify(row));
          // console.log('WORK_DATE @ component:' + row.WORK_DATE.toISOString());

          this.eventService.addnew(row)
            .subscribe((data) => {
              this.getEvents();
            });
        } else {
          this.snackBar.open('資料儲存中', 'update...', {
            duration: 200,
          });
          // alert(JSON.stringify(row));

          this.eventService.update(row)
            .subscribe((data) => {
              this.getEvents();
            });
        }
      }
    });
  }


  delete(row: IEvent, index: number) {
    this.openDeleteDialog(row);
  }

  openDeleteDialog(row: IEvent) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '確認刪除 #' + row.DATA_SEQ + ':' + row.WORK_DESC + '?',
        buttonText: {
          ok: '是',
          cancel: '否'
        }
      }
    });
    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('資料刪除中', 'delete...', {
          duration: 200,
        });

        this.eventService.delete(row.DATA_SEQ)
          .subscribe((data) => {
            this.getEvents();
            // this.eventDataSource = new MatTableDataSource(data);
          });
      }
    });
  }


  onClose(): void {
    this.dialogRef.close();
  }
}

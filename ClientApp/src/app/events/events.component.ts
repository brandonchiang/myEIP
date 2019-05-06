import { Component, OnInit, Inject } from '@angular/core';
import { IEvent } from '../model/events';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['edit', 'data_seq', 'date', 'name', 'desc',  'delete'];
  public dataSource$: Observable<IEvent[]>;
  eventDataSource: MatTableDataSource<any>;

  filterFrom: Date;
  filterTo: Date;
  filterWords: string;
  today: Date;

  constructor(private eventService: EventsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.today = new Date();
  }

  ngOnInit() {
    this.dataSource$ = this.getEvents();
  }

  private getEvents() {
    return this.eventService.getEvents();
  }

  filterEvents(keyword: string) {
    if (this.filterFrom || this.filterTo || this.filterWords) {
      this.dataSource$ = this.eventService.searchEvents(this.filterFrom, this.filterTo, this.filterWords);
    } else {
      this.dataSource$ = this.getEvents();
    }
  }

  edit(row: IEvent) {
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

}

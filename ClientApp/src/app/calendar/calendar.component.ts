import { Component, OnInit } from '@angular/core';
import { IEvent } from '../model/events';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { EventbydayComponent } from '../eventbyday/eventbyday.component';
import { EventEditorComponent } from '../event-editor/event-editor.component';

// tslint:disable-next-line:class-name
interface event {
  date: Date;
  dateString: string;
  day: number;
  weekday: number;
  event_desc: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  weekday_name = ['日', '一', '二', '三', '四', '五', '六'];

  // list = this.originalList;
  event_list: event[] = [];
  public dataSource$: Observable<IEvent[]>;
  breakpoint = 7;
  date: Date;
  today: Date;
  yyyymm: any;

  public dataSource: IEvent;

  constructor(public eventService: EventsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    // public dialogRef: MatDialogRef<EventbydayComponent>,
    ) {
    this.date = new Date();
  }

  ngOnInit() {
    this.date = new Date();
    this.date.setHours(0, 0, 0, 0);
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.showCalendar(this.date);
  }


  showCalendar(_date: Date) {
    const dd = _date.getDate();
    const mm = _date.getMonth() + 1;
    const yyyy = _date.getFullYear();
    const firstDay = new Date(yyyy, mm - 1, 1);
    const lastDay = new Date(yyyy, mm - 1, this.lastday(yyyy, mm));
    this.eventService.getEvents(firstDay, lastDay).subscribe(
      (data: IEvent[]) => {
        this.fillCalendar(_date, data);
      }
    );
  }

  fillCalendar(_date: Date, item: IEvent[]) {
    this.yyyymm = _date.toString();
    const dd = _date.getDate();
    const mm = _date.getMonth() + 1;
    const yyyy = _date.getFullYear();
    const firstDay = new Date(yyyy, mm - 1, 1, 0, 0, 0);
    const lastDay = new Date(yyyy, mm - 1, this.lastday(yyyy, mm), 0, 0, 0);
    const first_weekday = new Date(yyyy, mm - 1, 1).getDay(); // 這個月的第一天是星期幾?
    const empty_d = { date: _date, dateString: _date.toLocaleDateString(), day: 0, weekday: 0, event_desc: '' };
    this.event_list = [];
    // 塞空白日期：如果3/1是星期五，就塞5個空白日期
    for (let index = 0; index < first_weekday; index++) {
      this.event_list.push(empty_d);
    }

    const monthDays = this.lastday(yyyy, mm);
    // console.log(yyyy + '/' + mm + ':' + lastday);
    for (let index = 1; index <= monthDays; index++) {
      const xdate = new Date(yyyy, mm - 1, index, 0, 0, 0); // 抓今天星期幾。月份要減一，因為 js 的月份是 0 base
      const xdateEvents = item.filter(x => new Date(x.WORK_DATE) >= xdate && new Date(x.WORK_DATE) <= xdate)
        .map(x => '<li><strong>' + x.EMP_NAME + '</strong>:' + x.WORK_DESC + '</li>');

      let event_desc = '';
      if (xdateEvents.length === 0) {
        event_desc = '';
      } else {
        event_desc = '<ul>' + xdateEvents.join('') + '</ul>';
      }

      // console.log(xdate);
      this.event_list.push({
        date: xdate, dateString: xdate.toLocaleDateString(), day: index, weekday: xdate.getDay(), event_desc: event_desc
      });
    }
  }

  isToday(dd) {
    // console.log(this.today + '~' + dd);
    return (dd.getFullYear() === this.today.getFullYear()) &&
      // getMonth is 0-indexed
      (dd.getMonth() === this.today.getMonth()) &&
      (dd.getDate() === this.today.getDate());
  }

  lastday = function (y: any, m: any) {
    return new Date(y, m, 0).getDate();
  };

  previousMonth($event) {
    this.date.setMonth(this.date.getMonth() - 1);
    this.date.setDate(1);
    this.showCalendar(this.date);
    // console.log(this.yyyymm);
  }

  nextMonth($event) {
    this.date.setMonth(this.date.getMonth() + 1);
    this.date.setDate(1);
    this.showCalendar(this.date);
    // console.log(this.yyyymm);
  }

  getWorkDesc(date: Date) {
    // const ret = this.eventService.getEvent(date).pipe(
    //   map((x: any) => x.WORK_DESC)
    // );
    // console.log(ret);
    const ret = '';
    this.eventService.getEvent(date).subscribe(
      (x: any) => x
    );

    return ret;
  }


  edit(data) {
    // alert(JSON.stringify(data));
    const dialogRef = this.dialog.open(EventbydayComponent, {
      width: '50vw',
      data: { date: data }
    });

    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (true) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('更新畫面資料', 'refresh...', {
          duration: 200,
        });

        this.showCalendar(this.date);
      }
    });

  }

}

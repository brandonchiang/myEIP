import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../model/events';
import { Observable } from 'rxjs';
import { map, filter, catchError, tap, flatMap } from 'rxjs/operators';
import { MatCardLgImage } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events$: any;
  maxDate = new Date(8640000000000000);
  minDate = new Date(-8640000000000000);

  constructor(private httpClient: HttpClient) {
    // this.httpClient.get('/./assets/Events.json').subscribe(
    //   data => {
    //     this.events$ = data;
    //   }
    // );
  }

  lastday = function (y: any, m: any) {
    return new Date(y, m, 0).getDate();
  };

  getEvents(fromDate?: Date, toDate?: Date): Observable<EventModel[]> {
    if (fromDate === undefined) {
      return this.httpClient.get('/./assets/Events.json').pipe(
        map((data: EventModel[]) => data.sort()));
    } else {
      const d1 = new Date(fromDate);
      const d2 = new Date(toDate);
      // console.log(d1 + '~' + d2);
//      this.events$ = this.httpClient.get('/./assets/Events.json').pipe(
        this.events$ = this.httpClient.get('/api/events').pipe(
        map((data: EventModel[]) => {
          return data.filter(event => new Date(event.WORK_DATE) >= d1 && new Date(event.WORK_DATE) <= d2);
        }
        ));

      return this.events$;
    }
  }

  getEvent(date: Date): Observable<EventModel[]> {
    return this.getEvents(date, date);
  }

  searchEvents(from: Date, to: Date, keyword: string): Observable<EventModel[]> {
    if (from === undefined) { from = this.minDate; }
    if (to === undefined) { to = this.maxDate; }
    if (keyword === undefined) { keyword = ''; }

    this.events$ = this.httpClient.get<EventModel[]>('/api/events');
    return this.events$.pipe(
      map((data: EventModel[]) => {
        let filterData = data.filter(evt => new Date(evt.WORK_DATE) >= from && new Date(evt.WORK_DATE) <= to);
        if (keyword !== '') {
          filterData = filterData.filter(evt =>
            (((evt.EMP_NAME === null) ? '' : evt.EMP_NAME).indexOf(keyword) !== -1)
            || ((evt.WORK_DESC === null) ? '' : evt.WORK_DESC).indexOf(keyword) !== -1);
        }

        return filterData;
      }));

  }

  delete(data_seq: number, date: Date) {
    this.events$ = this.httpClient.get('/./assets/Events.json').pipe(
      map((data: EventModel[]) => {
        return data.filter(event => event.DATA_SEQ !== data_seq && new Date(event.WORK_DATE) >= date && new Date(event.WORK_DATE) <= date);
      }
      ));
    // console.log(this.events$);
    return this.events$;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
  http: any;

  constructor(private httpClient: HttpClient) {

  }

  lastday = function (y: any, m: any) {
    return new Date(y, m, 0).getDate();
  };

  getEvents(fromDate?: Date, toDate?: Date): Observable<EventModel[]> {
    if (fromDate === undefined) {
      return this.httpClient.get<EventModel[]>('/api/events');
    } else {
      // alert(fromDate + '/' + toDate);
      const d1 = new Date(fromDate);
      const d2 = new Date(toDate);
      // console.log(d1 + '~' + d2);
      // this.events$ = this.httpClient.get('/./assets/Events.json').pipe(
        let params = new HttpParams();
        params = params.append('startDate', d1.toDateString());
        params = params.append('endDate', d2.toDateString());
        // alert(params);
        this.events$ = this.httpClient.get('/api/events', {params: params});
      return this.events$;
    }
  }

  getEvent(date: Date): Observable<EventModel[]> {
    // alert('getEvent:' + date);
    return this.getEvents(new Date(date), new Date(date));
  }

  searchEvents(fromDate?: Date, toDate?: Date, keyword?: string): Observable<EventModel[]> {
    if (fromDate === undefined) { fromDate = this.minDate; }
    if (toDate === undefined) { toDate = this.maxDate; }
    if (keyword === undefined) { keyword = ''; }

    let params = new HttpParams();
    params = params.append('startDate', fromDate.toDateString());
    params = params.append('endDate', toDate.toDateString());
    params = params.append('keyword', keyword);
    this.events$ = this.httpClient.get('/api/events', {params: params});
    return this.events$;
  }

  addnew(data: EventModel): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        data,
      },
    };

    console.log('WORK_DATE @ service:' + data.WORK_DATE.toISOString());
    data.ENTRY_ID = '@usc';
    data.ENTRY_TIME = new Date();

    return this.httpClient.post('/api/events', data);
  }

  update(data: EventModel): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        data,
      },
    };
    data.ENTRY_ID = '@usc';
    data.ENTRY_TIME = new Date();
    return this.httpClient.put('/api/events', data);
  }

  delete(data_seq: number) {
    // this.events$ = this.httpClient.get('/./assets/Events.json').pipe(
    // this.events$ = this.httpClient.get('/api/events').pipe(
    //   map((data: EventModel[]) => {
    //     return data.filter(event => event.DATA_SEQ !== data_seq && new Date(event.WORK_DATE) >= date && new Date(event.WORK_DATE) <= date);
    //   }
    //   ));
    // console.log(this.events$);
    this.events$ = this.httpClient.delete('/api/events/' + data_seq);
    return this.events$;
  }
}

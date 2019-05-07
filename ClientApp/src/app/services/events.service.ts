import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IEvent } from '../model/events';
import { Observable, Subject } from 'rxjs';
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

  private eventsSubject = new Subject<any>();
  public events = this.eventsSubject.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  lastday = function (y: any, m: any) {
    return new Date(y, m, 0).getDate();
  };

  getEvents(fromDate?: Date, toDate?: Date): Observable<IEvent[]> {
    if (fromDate === undefined) {
      return this.httpClient.get<IEvent[]>('/api/events');
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
        this.events$ = this.httpClient.get('/api/events', {params: params}).subscribe(data =>
          this.eventsSubject.next(data)
        );
      // return this.events$;

      return this.eventsSubject;
    }
  }

  getEvent(date: Date): Observable<IEvent[]> {
    // alert('getEvent:' + date);
    return this.getEvents(new Date(date), new Date(date));
  }

  searchEvents(fromDate?: Date, toDate?: Date, keyword?: string): Observable<IEvent[]> {
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

  addnew(data: IEvent): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        data,
      },
    };

    // console.log('WORK_DATE @ service:' + data.WORK_DATE.toISOString());
    data.ENTRY_ID = '@usc';
    data.ENTRY_TIME = new Date();

    return this.httpClient.post('/api/events', data);
  }

  update(data: IEvent): Observable<any> {
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
    this.events$ = this.httpClient.delete('/api/events/' + data_seq);
    return this.events$;
  }
}

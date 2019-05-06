import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard } from '../model/board';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnInit {

  board$: Observable<IBoard[]>;

  constructor(private httpClient: HttpClient) {  }

  ngOnInit(): void {

  }

  getBoard$(): Observable<IBoard[]> {
    return this.httpClient.get<any>('/api/board');
    // return this.http.get('/api/board')
    // .pipe(
    //   tap((data: any) => console.log(data)),
    //   map((data: any) => this.board$ =  data)
    // );
  }

  addnew(data: IBoard): Observable<any> {
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

    return this.httpClient.post('/api/board', data);
  }

  update(data: IBoard): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        data,
      },
    };

    return this.httpClient.put('/api/board', data);
  }

  delete(data_seq: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      // body: {
      //   id: data_seq,
      // },
    };

    return this.httpClient.delete('/api/board/' + data_seq, options);
  }

}

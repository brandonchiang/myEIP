import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard } from '../interface/board';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService implements OnInit {

  board$: Observable<IBoard[]>;

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {

  }

  getBoard$(): Observable<IBoard[]> {
    return this.http.get<any>('/api/board');
    // return this.http.get('/api/board')
    // .pipe(
    //   tap((data: any) => console.log(data)),
    //   map((data: any) => this.board$ =  data)
    // );
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

    return this.http.put('/api/board', data);
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

    return this.http.delete('/api/board/' + data_seq, options);
  }

}

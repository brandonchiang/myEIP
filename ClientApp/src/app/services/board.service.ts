import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get('/api/board').pipe(
      tap((data: any) => console.log(data)),
      map((data: any) => this.board$ =  data)
    );
  }


}

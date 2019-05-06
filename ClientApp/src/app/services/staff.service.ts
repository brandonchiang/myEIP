import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IStaff } from './../model/staff';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  staff$: Observable<IStaff[]>;

  constructor(private httpClient: HttpClient) { }

  getStaffs$(): Observable<IStaff[]> {
    // return this.http.get('/./assets/staff.json').pipe(
    //   map((data: any) => this.staff$ =  data)
    // );
    // var result: IStaff[];
    return this.httpClient.get<IStaff[]>('/api/staff');

  }

}

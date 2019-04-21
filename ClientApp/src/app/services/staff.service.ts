import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IStaff } from './../model/staff';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

// private staffs: StaffModel[] = [
//   {position: 1, name: '鄧先生', ext: 601, email: 'dengusc@uscsoft.com.tw', schedule: ''},
//   {position: 2, name: '江育勳', ext: 615, email: 'brandon@uscsoft.com.tw', schedule: '富邦例會'},
//   {position: 3, name: '楊偉良', ext: 621, email: 'weiluang@uscsoft.com.tw', schedule: ''},
//   {position: 4, name: '黃克農', ext: 613, email: 'knhuang@uscsoft.com.tw', schedule: ''},
//   {position: 5, name: 'Boron', ext: 10.811, email: 'B', schedule: ''},
//   {position: 6, name: 'Carbon', ext: 12.0107, email: 'C', schedule: ''},
//   {position: 7, name: 'Nitrogen', ext: 14.0067, email: 'N', schedule: ''},
//   {position: 8, name: 'Oxygen', ext: 15.9994, email: 'O', schedule: ''},
//   {position: 9, name: 'Fluorine', ext: 18.9984, email: 'F', schedule: ''},
//   {position: 10, name: 'Neon', ext: 20.1797, email: 'Ne', schedule: ''},
// ];

  staff$: Observable<IStaff[]>;

  constructor(private http: HttpClient) { }

  getStaffs$(): Observable<IStaff[]> {
      // return this.http.get('/./assets/staff.json').pipe(
      //   map((data: any) => this.staff$ =  data)
      // );
      return this.http.get('/api/staff').pipe(
        // tap((data: any) => console.log(data)),
        map((data: any) => this.staff$ =  data)
      );
  }

}

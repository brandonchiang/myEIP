import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { IStaff } from '../model/staff';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'ext', 'email', 'schedule'];
  public dataSource: IStaff[];
  data$: Observable<IStaff[]>;
  constructor(private staffService: StaffService) { }

  ngOnInit() {
    // this.dataSource = this.staffService.getStaffs();
    this.data$ = this.staffService.getStaffs$();
  }

}

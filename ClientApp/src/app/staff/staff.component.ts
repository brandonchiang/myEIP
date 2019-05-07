import { Component, OnInit } from '@angular/core';
import { StaffService } from '../services/staff.service';
import { EventsService } from '../services/events.service';
import { IStaff } from '../model/staff';
import { Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { IEvent } from '../model/events';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'ext', 'email', 'schedule'];
  public dataSource: IStaff[];
  staffData: IStaff[];
  eventData: any;
  constructor(private staffService: StaffService,
    private eventService: EventsService
    ) { }

  ngOnInit() {
    this.staffService.getStaffs$().subscribe(
      data => this.staffData = data
    );

    this.eventService.getEvents(new Date(), new Date()).subscribe(
      data => this.eventData = data
    );

    // this.staffData$ = this.staffService.getStaffs$().pipe(
    //   tap(data => data.forEach(d => console.log(d.EMP_NAME))),
    //   // flatMap(data => data)
    //   map(data => data)
    // );
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { FormGroup, FormControl, ValidatorFn, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatStepperIntl, ErrorStateMatcher, MatDatepickerInputEvent, MatDatepicker } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  corpControl = new FormControl();
  corpForm = FormGroup;
  filteredOptions: Observable<string[]>;

  corps$;
  CTR_function1 = 0;
  CTR_function2 = 0;
  pickedDate;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.corps$ = this.httpClient.get<any[]>('/assets/corpNo.json');
    this.filteredOptions = this.corpControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.corps$.filter(corp => corp.toLowerCase().includes(filterValue));
  }

  CTR_add1(event) {
    this.CTR_function1++;
  }

  CTR_add2(event) {
    this.CTR_function2++;
  }
}

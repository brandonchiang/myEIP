import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import { IEvent } from '../model/events';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

  staffs = new FormControl();
  staffList: string[] = ['鄧寬敏', '江育勳', '鄭興國', '黃克農', '吳玉惠', '莊志鴻', '吳茂仁', '楊偉良', '王淑娥', '劉俐伶', '林粹倫', '郭永才', '張桂鳳', '謝安琪'];

  quickInput1: string[] = ['外出', '請假', '上午', '下午'];
  quickInput2: string[] = [];

  quickSelect1: string;
  quickSelect2: string;
  work_desc: string;

  constructor(
    public dialogRef: MatDialogRef<EventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {
    // console.log('constructor:' + JSON.stringify(data));

    this.bindData();
  }

  ngOnInit() {
  }

  bindData() {
    // const selectedList: any[] = this.data.EMP_NAME.split(',');
    if (this.data.EMP_NAME !== null) {
      this.staffs.setValue(this.data.EMP_NAME.split(','));
    }
  }

  selected1($event) {
    // const target = event.source.selected._element.nativeElement;
    // const selectedData = {
    //   value: event.value,
    //   text: target.innerText.trim()
    // };
    // console.log($event);
  }

  selected2($event) {
    // const target = event.source.selected._element.nativeElement;
    // const selectedData = {
    //   value: event.value,
    //   text: target.innerText.trim()
    // };
    // console.log($event);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    this.data.WORK_DATE = event.value;
  }

  empNameSelectionChange($event) {
    // console.log($event.join(','));
    this.data.EMP_NAME = $event.join(',');
  }

  onUpdate(): void {
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.dialogRef.close();
  }


}

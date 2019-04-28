import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.css']
})
export class BoardEditorComponent implements OnInit {

  board = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<BoardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) {
      // console.log(data);
  }
  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

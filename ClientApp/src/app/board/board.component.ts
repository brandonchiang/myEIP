import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../interface/board';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material';
import { BoardEditorComponent } from '../board-editor/board-editor.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  breakpoint = 1;

  public dataSource$: Observable<IBoard[]>;


  constructor(private boardService: BoardService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource$ = this.boardService.getBoard$();
  }

  edit(row) {
    this.dialog.open(BoardEditorComponent, {
      width: '50vw',
      data: row
    });
  }

  delete(row: IBoard, index: number) {
    // this.eventService.delete(row.DATA_SEQ, this.today).subscribe(
    //   data => {
    //     this.eventDataSource = new MatTableDataSource(data);
    //   },
    //   error => console.log(error)
    // );
  }
}


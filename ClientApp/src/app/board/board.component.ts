import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../interface/board';
import { BoardService } from '../services/board.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { BoardEditorComponent } from '../board-editor/board-editor.component';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  breakpoint = 1;

  public dataSource$: Observable<IBoard[]>;


  constructor(private boardService: BoardService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

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

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
          duration: 2000,
        });
      }
    });
  }
}


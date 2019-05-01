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

  add() {
    this.openEditDialog({ DATA_SEQ: 0, TITLE: '', CONTENT: '' } );
  }


  edit(row) {
    this.openEditDialog(row);
  }

  openEditDialog(row?) {
    const dialogRef = this.dialog.open(BoardEditorComponent, {
      width: '50vw',
      data: row
    });

    const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        snack.dismiss();
        const a = document.createElement('a');
        a.click();
        a.remove();
        snack.dismiss();
        this.snackBar.open('資料儲存中', 'update...', {
          duration: 2000,
        });

        if (row.DATA_SEQ === 0) {
          this.boardService.addnew(row)
          .subscribe((s) => {
            console.log(s);
            this.dataSource$ = this.boardService.getBoard$();
          });
        } else {
          this.boardService.update(row)
          .subscribe((s) => {
            console.log(s);
            this.dataSource$ = this.boardService.getBoard$();
          });
        }
      }
    });
  }

  openDeleteDialog(row: IBoard, idx: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: '確認刪除 #' + row.DATA_SEQ + ':' + row.TITLE + '?',
        buttonText: {
          ok: '是',
          cancel: '否'
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
        this.snackBar.open('資料刪除中', 'delete...', {
          duration: 2000,
        });

        this.boardService.delete(row.DATA_SEQ)
          .subscribe((s) => {
            console.log(s);
            this.dataSource$ = this.boardService.getBoard$();
          });
      }
    });
  }
}


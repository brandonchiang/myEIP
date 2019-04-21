import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoard } from '../interface/board';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  // originalList = [
  //   {
  //     'title': '電話雜音',
  //     'slug': 'zp7yqc',
  //     'body': '有同仁反應講電話會有雜音，今天電話公司已更換1線、7線及8線共3條的線路，若發現仍有雜音請再告知是哪一條線路，謝謝！',
  //     'createdAt': '2018-05-11T21:58:27.358Z',
  //     'updatedAt': '2018-05-11T21:58:27.358Z',
  //     'tagList': [],
  //     'description': '有同仁反應講電話會有雜音，今天電話公司已更換1線、7線及8線共3條的線路，若發現仍有雜音請再告知是哪一條線路，謝謝！',
  //     'author': {
  //       'username': '林粹倫 <annie.lin@uscsoft.com.tw>',
  //       'bio': 'Eliseo',
  //       'image': 'http://placekitten.com/200/300',
  //       'following': false
  //     },
  //     'favorited': false,
  //     'favoritesCount': 1
  //   },
  //   {
  //     'title': '花蓮薯',
  //     'slug': 'p3vcsw',
  //     'body': ' 樓下管理員伯伯放一盒花蓮薯在茶水區,請大家自行取用！',
  //     'createdAt': '2018-05-11T21:55:00.722Z',
  //     'updatedAt': '2018-05-11T21:55:00.722Z',
  //     'tagList': [],
  //     'description': '樓下管理員伯伯放一盒花蓮薯在茶水區,請大家自行取用！',
  //     'author': {
  //       'username': 'Jayne_Kuhic@sydney.com',
  //       'bio': 'Jayne_Kuhic',
  //       'image': 'http://placekitten.com/200/300',
  //       'following': false
  //     },
  //     'favorited': false,
  //     'favoritesCount': 3
  //   },
  //   {
  //     'title': ' teamviewer 的使用人數',
  //     'slug': '3c69lg',
  //     'body': '除了TeamViewer 外，還有一種連線軟體，叫 AnyDesk ，免安裝，我自已用過一段時間，效能還不錯。如果 teamviewer 經常不夠用的同仁，建議可以試試看。',
  //     'createdAt': '2018-05-11T19:49:35.917Z',
  //     'updatedAt': '2018-05-11T19:49:35.917Z',
  //     'tagList': [],
  //     'description': '除了TeamViewer 外，還有一種連線軟體，叫 AnyDesk ，免安裝，我自已用過一段時間，效能還不錯。如果 teamviewer 經常不夠用的同仁，建議可以試試看。',
  //     'author': {
  //       'username': '江育勳 <yohun@uscsoft.com.tw>',
  //       'bio': 'Lew',
  //       'image': 'http://placekitten.com/200/300',
  //       'following': false
  //     },
  //     'favorited': false,
  //     'favoritesCount': 5
  //   },    {
  //     'title': ' 浴室的燈炮',
  //     'slug': '3c69lg',
  //     'body': '除了TeamViewer 外，還有一種連線軟體，叫 AnyDesk ，免安裝，我自已用過一段時間，效能還不錯。如果 teamviewer 經常不夠用的同仁，建議可以試試看。',
  //     'createdAt': '2019-03-12T19:49:35.917Z',
  //     'updatedAt': '2018-05-11T19:49:35.917Z',
  //     'tagList': [],
  //     'description': '冰箱那側浴室的燈泡壞了 我先拿休息室的燈泡換上了 那浴室外側有一個燈泡 休息室有兩個燈泡 目前所知需至少要三個燈泡需更換 負責人員請採購再裝上 謝謝',
  //     'author': {
  //       'username': '莊志鴻 <ccchung@uscsoft.com.tw>',
  //       'bio': 'Lew',
  //       'image': 'http://placekitten.com/200/300',
  //       'following': false
  //     },
  //     'favorited': false,
  //     'favoritesCount': 5
  //   }
  // ];

  // list = this.originalList;
  breakpoint = 1;

  public dataSource$: Observable<IBoard[]>;


  constructor(private boardService: BoardService) { }

  ngOnInit() {
    this.dataSource$ = this.boardService.getBoard$();
  }

}


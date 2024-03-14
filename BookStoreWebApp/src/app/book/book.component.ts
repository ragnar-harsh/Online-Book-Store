import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../Service-Repo/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  // injector: any;
  bookId;
  book : any;
  editMode = false;

  // activeInbox = false;


  constructor(private activatedRoute : ActivatedRoute, private bookService : BooksService) {}

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.editMode = Boolean(param.get('edit'));
    })

    this.GetBook();
  }


  GetBook(){
    this.bookService.GetBookById(this.bookId).subscribe((res : any) => {
      this.book = res;
    })
  }

}

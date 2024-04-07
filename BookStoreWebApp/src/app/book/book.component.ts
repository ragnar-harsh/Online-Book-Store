import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../Service-Repo/books.service';
import { UserStoreService } from '../Service-Repo/user-store.service';
import { AuthenticationService } from '../Service-Repo/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  // injector: any;
  bookId;
  book: any;
  editMode = false;
  userType: string;


  constructor(private activatedRoute: ActivatedRoute, private bookService: BooksService,
    private userStore: UserStoreService, private authService: AuthenticationService,
    private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.editMode = Boolean(param.get('edit'));
    })

    this.userStore.getRoleFromStore().subscribe((data: any) => {
      var roleFromtoken = this.authService.getRoleFromToken();
      this.userType = data || roleFromtoken;
    })

    this.GetBook();
  }


  GetBook() {
    this.bookService.GetBookById(this.bookId).subscribe((res: any) => {
      this.book = res;
    })
  }

  OnSave() {
    if (this.book.title && this.book.catagory && this.book.description) {
      this.bookService.UpdateBook(this.book).subscribe((res: any) => {
        this.toastr.success(res.message);
        this.editMode = false;
      },
        (error) => {
          this.toastr.error("Some error Occurred");
        })
    } else {
      this.toastr.warning("Form is Invalid");
    }
  }

  RemoveBook() {
    console.log(this.bookId);
    this.bookService.DeleteBook(this.bookId).subscribe((res: any) => {
      this.toastr.info(res.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
      (error) => {
        this.toastr.error("Some went Wrong");
      })
  }

}

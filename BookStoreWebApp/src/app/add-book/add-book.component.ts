import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service-Repo/authentication.service';
import { UserStoreService } from '../Service-Repo/user-store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BooksService } from '../Service-Repo/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  userType : string;
  BookForm : FormGroup;
  title : string;
  catagory : string;
  description : string;

  constructor(private authService : AuthenticationService, private storeService : UserStoreService,
    private formBuilder : FormBuilder, private toastr : ToastrService, private bookService : BooksService){}

  ngOnInit(): void {
    this.storeService.getRoleFromStore().subscribe((data : any) => {
      var roleFromToken = this.authService.getRoleFromToken();
      this.userType = data || roleFromToken;
    })

    this.BookForm = this.formBuilder.group( {
      title : ['', [Validators.required, Validators.maxLength(50)]],
      catagory : ['', [Validators.required, Validators.maxLength(30)]],
      description : ['', [Validators.required]]
    });
  }

  OnSubmit(){
    if(this.BookForm.valid){
      this.bookService.AddNewBook(this.BookForm.value).subscribe((res : any) => {
        this.toastr.success(res.message);
        this.BookForm.reset();
      },
      (error) => {
        this.toastr.error("Some Error Occured");
      })
    }
    else{
      this.toastr.warning("Form is Invalid");
    }
  }

}

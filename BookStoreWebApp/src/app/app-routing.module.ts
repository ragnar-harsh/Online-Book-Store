import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { authenticationGuard } from './Guards-Repo/authentication.guard';
import { BookComponent } from './book/book.component';
import { AddBookComponent } from './add-book/add-book.component';

const routes: Routes = [

  { path : '', redirectTo : 'home', pathMatch : 'full'},
  { path : 'home', component : HomeComponent},
  { path : 'addBook', component : AddBookComponent},
  { path: 'login', component : LoginComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'books', canActivate : [authenticationGuard], component : BooksComponent,
  children : [{
    path : ':id', component : BookComponent, pathMatch : 'full'
  }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

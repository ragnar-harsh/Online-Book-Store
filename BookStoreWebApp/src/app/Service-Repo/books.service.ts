import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  apiUrl = "http://localhost:5100/api/Book/";

  constructor(private http: HttpClient) { }


  //Get All Books
  GetAllBook(): Observable<any[]> {
    var url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }


  GetBookById(id: number): Observable<any[]> {
    var url = `${this.apiUrl}` + id;
    return this.http.get<any>(url);
  }

  AddNewBook(BookModel: any): Observable<any[]> {
    var url = `${this.apiUrl}addBook`;
    var urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Title', BookModel.title);
    urlSearchParams.append('Catagory', BookModel.catagory);
    urlSearchParams.append('Description', BookModel.description);
    return this.http.post<any>(url, urlSearchParams, httpOptions);
  }


  UpdateBook(BookModel: any): Observable<any[]> {

    var url = `${this.apiUrl}updateBook/` + BookModel.id;
    var urlBodyParmas = new URLSearchParams();
    urlBodyParmas.append('Title', BookModel.title);
    urlBodyParmas.append('Catagory', BookModel.catagory);
    urlBodyParmas.append('Description', BookModel.description);
    return this.http.post<any>(url, urlBodyParmas, httpOptions);
  }


  DeleteBook(Id: number): Observable<any[]> {
    var url = `${this.apiUrl}removeBook/` + Id;
    return this.http.delete<any>(url);
  }
}

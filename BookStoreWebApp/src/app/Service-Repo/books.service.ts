import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const httpOptions = {
  Headers : new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded'})
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  apiUrl = "http://localhost:5100/api/Book/";

  constructor(private http : HttpClient) { }


  //Get All Books
  GetAllBook() : Observable<any[]> {
    var url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }


  GetBookById(id : number) : Observable<any[]> {
    var url = `${this.apiUrl}`+ id;
    return this.http.get<any>(url);
  }
}

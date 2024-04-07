import { Component, OnInit } from '@angular/core';
import { BooksService } from '../Service-Repo/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any = [];

  RadioButtons = [
    'All', 'Fiction', 'Crime', 'Thriller', 'Fantasy', 'Classic', 'Adventure', 'Mystery', 'Horror', 'Adult',
    'Literature', 'Historical', 'Artificial Intelligence', 'Cybersecurity', 'Blockchain', 'Networking', 'Cloud Computing',
    'Programming Languages', 'Series', 'Comics'
  ]

  filteredBooks: any[];
  selectedCategory: string = 'All';


  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.bookService.GetAllBook().subscribe((res) => {
      this.books = res;
    });

    setTimeout(() => {
      this.filterBooks();
    }, 500);
  }

  filterBooks() {
    if (this.selectedCategory === 'All') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book =>
      // book.catagory === this.selectedCategory
      {
        return book.catagory.includes(this.selectedCategory);
        // return book.category && typeof book.category === 'string' && book.catagory.includes(this.selectedCategory);
      }
      );
    }
  }

  truncateDescription(description: string): string {
    // Split the description into words
    const words = description.split(' ');

    // Take the first 20 words
    const truncatedWords = words.slice(0, 30);

    // Join the words back into a string
    const truncatedDescription = truncatedWords.join(' ');

    return truncatedDescription + '...';
  }
}

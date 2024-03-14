import { Component, OnInit } from '@angular/core';
import { BooksService } from '../Service-Repo/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  // books = [
  //   { title: 'Book 1', description: 'Description for Book 1. This is a longer description to demonstrate truncation.', category: 'fiction' },
  //   { title: 'Book 2', description: 'Description for Book 2. Another longer description for demonstration purposes.', category: 'nonfiction' },
  //   { title: 'Book 1', description: 'Description for Book 1. This is a longer description to demonstrate truncation.', category: 'fiction' },
  //   { title: 'Book 1', description: 'Description for Book 1. This is a longer description to demonstrate truncation.', category: 'fiction' },
  //   { title: 'Book 1', description: 'Description for Book 1. This is a longer description to demonstrate truncation.', category: 'fiction' },
  //   { title: 'Book 2', description: 'Description for Book 2. Another longer description for demonstration purposes.', category: 'nonfiction' },
  //   { title: 'Book 2', description: 'Description for Book 2. Another longer description for demonstration purposes.', category: 'nonfiction' },
  //   { title: 'Book 2', description: 'Description for Book 2. Another longer description for demonstration purposes.', category: 'nonfiction' },
  //   { title: 'Book 2', description: 'Description for Book 2. Another longer description for demonstration purposes.', category: 'nonfiction' },
  //   // Add more book data as needed
  // ];
  books : any = [];

  filteredBooks: any[];
  selectedCategory: string = 'all';


  constructor(private bookService : BooksService) {}

  ngOnInit() {
    this.bookService.GetAllBook().subscribe((res) => {
      this.books = res;
    });
    
    setTimeout(() => {
      this.filterBooks();
    }, 500);
  }

  filterBooks() {
    if (this.selectedCategory === 'all') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => book.category === this.selectedCategory);
    }
  }

  truncateDescription(description: string): string {
    // Split the description into words
    const words = description.split(' ');

    // Take the first 20 words
    const truncatedWords = words.slice(0, 20);

    // Join the words back into a string
    const truncatedDescription = truncatedWords.join(' ');

    return truncatedDescription + '...';
  }
}

using BookStoreWebAPI.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace BookStoreWebAPI.Repository
{
    public interface IBookRepository
    {
        Task<List<BookModel>> GetAllBooksAsync();
        Task<BookModel> GetBookByIdAsync(int bookId);
        Task<int> AddBookAsync(BookModel bookModel);
        Task UpdateBookAsync(int bookId, BookModel bookModel);
        Task UpdateBookPatchAsync(int bookId, JsonPatchDocument bookModel);
        Task<int> DeleteBookAsync(int bookId);
    }
}
// using Microsoft.AspNetCore.Components;
using BookStoreWebAPI.Models;
using BookStoreWebAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreWebAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }


        [HttpGet("")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookRepository.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById([FromRoute] int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if(book == null)
            {
                return NotFound("This Book Does Not Exist in the Book Store!");
            }
            return Ok(book);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddNewBook([FromBody]BookModel bookModel)
        {
            var id = await _bookRepository.AddBookAsync(bookModel);
            return CreatedAtAction(nameof(GetBookById), new {id = id, Controller = "book"}, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook([FromBody]BookModel bookModel, [FromRoute] int id)
        {
            await _bookRepository.UpdateBookAsync(id, bookModel);
            return Ok(new { Message = "Book Updated!"});
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpadatBookPatch([FromBody] JsonPatchDocument bookModel, [FromRoute]int id)
        {
            await _bookRepository.UpdateBookPatchAsync(id, bookModel);
            return Ok(new { Message = "Book Modified!"});
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int id)
        {
            await _bookRepository.DeleteBookAsync(id);
            return Ok(new { Message = "Book Removed From the Book Store."});
        }

        
        // [HttpGet("")]
        // public string getName()
        // {
        //     return "hello";
        // }

    }
}
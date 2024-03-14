using System.ComponentModel.DataAnnotations;

namespace BookStoreWebAPI.Models
{
    public class BookModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please Enter the Title of the Book")]
        public required string Title { get; set; }

        public required string Catagory { get; set; }
        public required string Description { get; set; }
    }
}
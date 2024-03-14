using System.ComponentModel.DataAnnotations;

namespace BookStoreWebAPI.Models
{
    public class SignInModel
    {
        [Required, EmailAddress]
        public required string Email { get; set; }
        
        [Required]
        public required string Password { get; set; }
    }
}
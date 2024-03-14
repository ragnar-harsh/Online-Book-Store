using Microsoft.AspNetCore.Identity;

namespace BookStoreWebAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string Gender { get; set; }
        public required string  UserType { get; set; }
    }
}
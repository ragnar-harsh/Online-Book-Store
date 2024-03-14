using BookStoreWebAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace BookStoreWebAPI.Repository
{
    public interface IAccountRepository
    {
        Task<IdentityResult> SignupAsync(SignupModel signupModel);
        Task<string> LoginAsync(SignInModel signInModel);
    }
}
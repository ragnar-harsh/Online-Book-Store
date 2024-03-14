using BookStoreWebAPI.Models;
using BookStoreWebAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreWebAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromForm] SignupModel signupModel)
        {
            Console.WriteLine(signupModel.LastName);
            var result = await _accountRepository.SignupAsync(signupModel);
            if(result.Succeeded)
            {
                return Ok(new { Message = "User Registered Successfully"});
            }
            return Unauthorized();
            // return Ok(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] SignInModel signInModel)
        {
            var result = await _accountRepository.LoginAsync(signInModel);
            if(string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }
            return Ok(new { Message = "Login Successfully", Token = result});
            // return Ok(result.Errors);
        }
    }
}
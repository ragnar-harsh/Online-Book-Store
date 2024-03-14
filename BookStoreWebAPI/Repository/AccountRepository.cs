using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookStoreWebAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace BookStoreWebAPI.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly IConfiguration _configuration;
        // private readonly BookStoreContext _context;
        public AccountRepository(UserManager<ApplicationUser> userManager,
         SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signinManager = signInManager;
            _configuration = configuration;
            // _context = bookStoreContext;
        }

        public async Task<IdentityResult> SignupAsync(SignupModel signupModel)
        {
            var user = new ApplicationUser()
            {
                FirstName = signupModel.FirstName,
                LastName = signupModel.LastName,
                Email = signupModel.Email,
                UserName = signupModel.Email,
                Gender = signupModel.Gender,
                UserType = signupModel.UserType
            };
            return await _userManager.CreateAsync(user, signupModel.Password);
        }

        public async Task<string> LoginAsync(SignInModel signInModel)
        {
            // var result = await _signinManager.PasswordSignInAsync(signInModel.Email, signInModel.Password, false, false);
            // if(!result.Succeeded)
            // {
            //     return null;
            // }
            // var user = await _userManager.FindByEmailAsync(signInModel.Email);
            // var authClamis = new List<Claim>
            // {
            //     new Claim(ClaimTypes.Name, user.FirstName),
            //     new Claim(ClaimTypes.Role, user.UserType)
            // };
            // var authSigninKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:Secret"]));
            // var token = new JwtSecurityToken(
            //     issuer : _configuration["JWT:ValidIssuer"],
            //     audience : _configuration["JWT:ValidAudience"],
            //     expires : DateTime.Now.AddDays(1),
            //     claims : authClamis,
            //     signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256Signature)
            // );

            // return new JwtSecurityTokenHandler().WriteToken(token);


            var result = await _signinManager.PasswordSignInAsync(signInModel.Email, signInModel.Password, false, false);
            if(!result.Succeeded)
            {
                return null;
            }
            var user = await _userManager.FindByEmailAsync(signInModel.Email);
            
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("OnlineBookStore0SecureKey0ForSecurity12345678");
            var identity = new ClaimsIdentity(new Claim[] {
                new Claim(ClaimTypes.Name, user.FirstName),
                new Claim(ClaimTypes.Role, user.UserType)
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = identity,
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = credentials                
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);

        }
    }
}
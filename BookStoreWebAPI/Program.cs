using System.Text;
using BookStoreWebAPI.Data;
using BookStoreWebAPI.Models;
using BookStoreWebAPI.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


//Enabling Services of Login with JWT
// builder.Services.AddAuthentication(options =>
//     {
//         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//         options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
//     }).AddJwtBearer(options =>
//         {
//             options.SaveToken = true;
//             options.RequireHttpsMetadata = false;
//             options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
//             {
//                 ValidateIssuer = true,
//                 ValidateAudience = true,
//                 ValidAudience = builder.Configuration["JWT:ValidAudience"],
//                 ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
//                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
//             };
//         });


builder.Services.AddAuthentication(opt => {
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt => {
    opt.RequireHttpsMetadata = false;
    opt.SaveToken = true;
    opt.TokenValidationParameters = new TokenValidationParameters{
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("OnlineBookStore0SecureKey0ForSecurity12345678")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
});


//Adding Controller and // also JSON Patch Service
builder.Services.AddControllers().AddNewtonsoftJson();


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Mapping Repositories Interfaces
builder.Services.AddTransient<IBookRepository, BookRepository>();
builder.Services.AddTransient<IAccountRepository, AccountRepository>();


//Using AutoMapper
builder.Services.AddAutoMapper(typeof(Program));


//Configuring DB-Context Class and Mapping Database
builder.Services.AddDbContext<BookStoreContext>(options => options.UseNpgsql(
    builder.Configuration.GetConnectionString("PostgresConnectionString")
));


//Identity Core//  // For Signup
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
.AddEntityFrameworkStores<BookStoreContext>().AddDefaultTokenProviders();





//Enabling CORS Services
builder.Services.AddCors(options => 
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();


app.UseCors();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();


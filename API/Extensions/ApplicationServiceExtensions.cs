using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using AutoMapper;
using Google.Apis.Auth.AspNetCore3;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
       public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
       {
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite("Data source=GPDataBase.db");
        });
       

        
    
          

        return services;

       }
    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var user = new AppUser(){
                UserName = "shahin",
                Email = "shahin2122@gmail.com",
                FirstName = "شاهین",
                LastName = "محمدپور",
                EmailConfirmed = true,
                
            };

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            await userManager.CreateAsync(user, "117361332645133577867");
            await userManager.AddToRolesAsync(user, new[] { "Admin", "Moderator"});
        }
    }
}
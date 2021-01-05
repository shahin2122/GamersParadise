using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
         public string PictureUrl { get; set; }
         public ICollection<AppUserRole> UserRoles { get; set; }
         public DateTime Created { get; set; }
         public ICollection<UserWithCourse> UserWithCourses { get; set; }
       
    }
}
using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class AdminUpdateMemberDto 
    {
      
         public string Username { get; set; }
         public string FirstName { get; set; }
         public string LastName { get; set; }
         public string email { get; set; }
         public bool emailConfirmed { get; set; }
         public string PictureUrl { get; set; }
         public ICollection<string> Roles { get; set; }
         public DateTime Created { get; set; } 
         public string Provider { get; set; } 
         public string phoneNumber { get; set; }
         public bool phoneNumberConfirmed { get; set; }
    }
}
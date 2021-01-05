using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
         public int UserId { get; set; }
         public string Username { get; set; }
         public string email { get; set; }
         public string PictureUrl { get; set; }
         public ICollection<string> Roles { get; set; }
         public DateTime Created { get; set; }
        
       
    }
}
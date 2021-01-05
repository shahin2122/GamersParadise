using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {   
        [Required]
        public string Username { get; set; }
         [Required]
         [EmailAddress]
        public string Email { get; set; }
         [Required]
         [StringLength(16, MinimumLength = 4)]
         public string Password { get; set; }
         public string FirstName { get; set; }
         public string LastName { get; set; }
         public string PictureUrl { get; set; }
         public string Provider { get; set; }
        
    }
}
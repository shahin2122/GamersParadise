using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
      
         [Required]
        public string Email { get; set; }
         [Required]
         [StringLength(10, MinimumLength = 4)]
        public string Password { get; set; }
        
    }
}
namespace API.DTOs
{
    public class UserDto
    {
        public int id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
         public string Provider { get; set; }
        public string Password { get; set; }
         public string FirstName { get; set; }
         public string LastName { get; set; }
         public string PictureUrl { get; set; }
     
    }
}
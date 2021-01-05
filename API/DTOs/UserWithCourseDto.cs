namespace API.DTOs
{
    public class UserWithCourseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public int[] CourseId { get; set; }
        public string[] CourseName { get; set; }
    }
}
namespace API.Entities
{
    public class UserWithCourse 
    {
        public AppUser User { get; set; }
        public int UserId { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }
    }
}
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Course : BaseEntity
    {
        public string CourseName { get; set; }
        public string MainPicUrl { get; set; }
        public string IntroVideoUrl { get; set; }
        public string Difficulty { get; set; }
        public DateTime Duration { get; set; }
        public bool IsFree { get; set; }
        public int Price { get; set; }
        public int SubScribers { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<Section> Sections { get; set; }
        public ICollection<UserWithCourse> UserWithCourses { get; set; }
        public ICollection<CourseComment> CourseComments { get; set; }
    }
}
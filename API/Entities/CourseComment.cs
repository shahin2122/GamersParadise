using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class CourseComment : BaseEntity
    {
        public Course Course { get; set; }
        public int CourseId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedTime { get; set; }
        public ICollection<Answer> Answer { get; set; }
        

    }
}
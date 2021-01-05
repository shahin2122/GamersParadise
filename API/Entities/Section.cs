using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Section :BaseEntity
    {
        public string Name { get; set; }
        public DateTime Duration { get; set; }
        public string VideoUrl { get; set; }
        public string Description { get; set; }
        public ICollection<Question> Questions { get; set; }
        public Course Course { get; set; }
        public int CourseId { get; set; }

    }
}
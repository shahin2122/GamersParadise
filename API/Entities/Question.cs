using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Question : BaseEntity
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public DateTime CreatedTime { get; set; }
        public Section section { get; set; }
        public int SectionId { get; set; }
        public AppUser User { get; set; }
        public int UserId { get; set; }
        public ICollection<Answer> Answer { get; set; }
    }
}
using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Answer :BaseEntity
    {
        public AppUser User { get; set; }
        public int UserId { get; set; }
        public string Text { get; set; }
        public DateTime CreatedTime { get; set; }
        public Question Question { get; set; }
        public int? QuestionId { get; set; }
        public CourseComment CourseComment { get; set; }
        public int? CourseCommentId { get; set; }
    }
}
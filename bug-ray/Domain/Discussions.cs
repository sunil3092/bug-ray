using System;

namespace Domain
{
    public class Discussions
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public Project Project { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
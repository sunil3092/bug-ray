using System;

namespace Domain
{
    public class Effort
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Catagory { get; set; }
        public DateTime Date { get; set; }
        public DateTime Estimate { get; set; }
        // public Guid Assignee { get; set; }   
        // public Guid Owner { get; set; }   
        public int Priority { get; set; }

    }
}

using System;

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Estimate { get; set; }
        public bool IsFavourate { get; set; }

    }
}
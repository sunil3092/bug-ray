using System;
using System.Collections.Generic;

namespace Domain
{
    public class Project
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Estimate { get; set; }
        public bool IsFavourate { get; set; }
        public bool IsCancelled { get; set; }

        public ICollection<ProjectContributor> Contributors { get; set; } = new List<ProjectContributor>();
        public ICollection<Discussions> Discussions { get; set; } = new List<Discussions>();


    }
}
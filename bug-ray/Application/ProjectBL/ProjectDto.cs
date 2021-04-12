using System;
using System.Collections.Generic;
using Application.ProfileBL;

namespace Application.ProjectBL
{
    public class ProjectDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Estimate { get; set; }
        public bool IsFavourate { get; set; }
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<ContributorDto> Contributors { get; set; }

    }
}
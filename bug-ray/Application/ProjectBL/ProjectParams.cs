using System;
using Application.Core;

namespace Application.ProjectBL
{
    public class ProjectParams : PagingParams
    {
        public DateTime Estimate { get; set; } = DateTime.UtcNow;
        public bool IsOwner { get; set; }
        public bool IsContributing { get; set; }
    }
}
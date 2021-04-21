using System;
using System.Text.Json.Serialization;

namespace Application.ProfileBL
{
    public class UserContributionDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Estimate { get; set; }

        [JsonIgnore]
        public string HostUsername { get; set; }
    }
}
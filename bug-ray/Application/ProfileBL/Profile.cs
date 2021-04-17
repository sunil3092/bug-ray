using System.Collections.Generic;
using Domain;

namespace Application.ProfileBL
{
    public class Profile
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }

        public bool Tracking { get; set; }
        public int TrackingCount { get; set; }
        public int TrackedCount { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}
using System.Linq;
using Application.Discussions;
using Application.ProjectBL;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUserName = null;

            CreateMap<Effort, Effort>();

            CreateMap<Project, Project>();

            CreateMap<Project, ProjectDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Contributors.FirstOrDefault(x => x.IsOwner).AppUser.UserName));

            CreateMap<ProjectContributor, ContributorDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.TrackedCount, o => o.MapFrom(s => s.AppUser.Trackers.Count))
                .ForMember(d => d.TrackingCount, o => o.MapFrom(s => s.AppUser.Trackings.Count))
                .ForMember(d => d.Tracking, o => o.MapFrom(s => s.AppUser.Trackers.Any(x => x.Observer.UserName == currentUserName)));
            ;

            CreateMap<AppUser, ProfileBL.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.TrackedCount, o => o.MapFrom(s => s.Trackers.Count))
                .ForMember(d => d.TrackingCount, o => o.MapFrom(s => s.Trackings.Count))
                .ForMember(d => d.Tracking, o => o.MapFrom(s => s.Trackers.Any(x => x.Observer.UserName == currentUserName)));

            CreateMap<Domain.Discussions, DiscussionDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

        }
    }
}
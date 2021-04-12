using System.Linq;
using Application.ProjectBL;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Effort, Effort>();
            CreateMap<Project, Project>();
            CreateMap<Project, ProjectDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Contributors.FirstOrDefault(x => x.IsOwner).AppUser.UserName));
            CreateMap<ProjectContributor, ContributorDto>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMaina).Url));

            CreateMap<AppUser, ProfileBL.Profile>()
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMaina).Url));
        }
    }
}
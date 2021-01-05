using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, RegisterDto>();

            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src =>
                src.UserRoles.Select(x => x.Role.Name).ToList()));
          
        }
    }
}
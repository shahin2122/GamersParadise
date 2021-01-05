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
            

            CreateMap<AppUser, MemberDto>()
                .ForMember(dest=> dest.id, opt => opt.MapFrom(src=> 
                src.Id))
                .ForMember(dest => dest.Roles, opt => opt.MapFrom(src =>
                src.UserRoles.Select(x => x.Role.Name).ToList()));
          
           CreateMap<AppUser, RegisterDto>();
           CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<AdminUpdateMemberDto, AppUser>();
        }
    }
}
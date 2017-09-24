using AutoMapper;
using Dynappix.Bastogne.DTOs;
using Dynappix.Bastogne.Models;
using System;

namespace Dynappix.Bastogne.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>()
                .ForMember(dest => dest.Organisation, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.Organisation) ? Guid.Empty : Guid.Parse(src.Organisation)));
        }
    }
}

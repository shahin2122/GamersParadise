using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public UsersController(IUserRepository userRepository, IMapper mapper, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _userRepository.GetUserByIdAsync(id);

        }

        [HttpGet("/get-by-username/{userName}")]
        public async Task<ActionResult<AppUser>> GetUserByUsername(string userName)
        {
            return await _userRepository.GetUserByUsernameAsync(userName);
        }

        [HttpPut]
        public async Task<ActionResult> SelfUpdateUser(MemberUpdateDto memberUpdateDto)
        {
              var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
              var user = await _userRepository.GetUserByIdAsync(id);
           

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("ویرایش موفقیت امیز نبود");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> AdminUpdateUser([FromBody] AdminUpdateMemberDto adminMemberUpdateDto, [FromRoute] int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);

            _mapper.Map(adminMemberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("ویرایش موفقیت امیز نبود");
        }

    }
}
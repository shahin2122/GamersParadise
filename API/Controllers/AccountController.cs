using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Google.Apis.Auth.AspNetCore3;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using System.Linq;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {

        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;

        }



        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            
            AppUser user = null;
            IdentityResult result;

            if(registerDto.Provider == "Internal")
            {
                 if (await UserExists(registerDto.Email)) return BadRequest("ایمیل قبلا ثبت شده است");

               user = new AppUser
                {
                Email = registerDto.Email,
                UserName = registerDto.Username,
                Provider = registerDto.Provider,
                EmailConfirmed = false
                };
            
                result = await _userManager.CreateAsync(user, registerDto.Password);

                if (!result.Succeeded) return BadRequest(result.Errors);
            }else
            {
                user = new AppUser
                {
                    
                    Email = registerDto.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PictureUrl = registerDto.PictureUrl,
                    UserName = registerDto.Username,
                    Provider = registerDto.Provider,
                    EmailConfirmed = true
                };

                result = await _userManager.CreateAsync(user, registerDto.Password);

                if (!result.Succeeded) return BadRequest(result.Errors);
            }


            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {   id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }



        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                    .SingleOrDefaultAsync(x => x.Email == loginDto.Email.ToLower());

            if (user == null) return Unauthorized("ایمیل اشتباه است");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("رمز عبور اشتباه است");

            return new UserDto
            {
                id = user.Id,
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PictureUrl = user.PictureUrl,
                Token = await _tokenService.CreateToken(user)
            };
        }
        
        [HttpPost("external-login")]
        public async Task<ActionResult<UserDto>> ExternalLogin(MemberDto memberDto)
        {
            if(memberDto == null) return Unauthorized("اطلاعات اشتباه است") ;

            if(await UserExists(memberDto.email)) 
            {
                var user = new LoginDto
                {
                    
                    Password = memberDto.id,
                    Email = memberDto.email,
                };
               return await Login(user);
               

            }else
            {
                var user = new RegisterDto
                {
                    Username = memberDto.email,
                    Password = memberDto.id,
                    FirstName = memberDto.FirstName,
                    LastName = memberDto.LastName,
                    Email = memberDto.email,
                    PictureUrl = memberDto.PictureUrl,
                    Provider = memberDto.Provider
                };
              return await Register(user);
              
            }
        }


         private async Task<bool> UserExists(string email)
        {
            return await _userManager.Users.AnyAsync(x => x.Email == email);
        }


    }
}
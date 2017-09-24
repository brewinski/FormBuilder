using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Dynappix.Bastogne.Models;
using Dynappix.Bastogne.Helpers;
using Dynappix.Bastogne.DTOs;
using Microsoft.AspNetCore.Authorization;
using Dynappix.Bastogne.Services;
using AutoMapper;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Dynappix.Bastogne.Controllers
{
    //[Authorize]
    //[Produces("application/json")]
    //[Route("api/[controller]")]
    //public class UsersController : Controller
    //{
    //    private IUserService _userService;
    //    private IMapper _mapper;
    //    private readonly AppSettings _appSettings;

    //    private readonly BastogneContext _context;

    //    public UsersController(
    //       IUserService userService,
    //       IOptions<AppSettings> appSettings)
    //   {
    //       _userService = userService;
    //       _appSettings = appSettings.Value;
    //   }

    //    // GET: api/Users
    //    [AllowAnonymous]
    //    [HttpGet]
    //    public IEnumerable<User> GetUser()
    //    {
    //        var users = _userService.GetAll();
    //        return users;
    //    }

    //    // GET: api/Users/5
    //    [HttpGet("{id}")]
    //    public async Task<IActionResult> GetUser([FromRoute] int id)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        var user = await _context.User.SingleOrDefaultAsync(m => m.Id == id);

    //        if (user == null)
    //        {
    //            return NotFound();
    //        }

    //        return Ok(user);
    //    }

    //    // PUT: api/Users/5
    //    [HttpPut("{id}")]
    //    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] User user)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        if (id != user.Id)
    //        {
    //            return BadRequest();
    //        }

    //        _context.Entry(user).State = EntityState.Modified;

    //        try
    //        {
    //            await _context.SaveChangesAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!UserExists(id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return NoContent();
    //    }

    //    // POST: api/Users
    //    [AllowAnonymous]
    //    [HttpPost]
    //    public async Task<IActionResult> Register([FromBody] User user)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        _context.User.Add(user);
    //        try
    //        {
    //            await _context.SaveChangesAsync();
    //        }
    //        catch (DbUpdateException)
    //        {
    //            if (UserExists(user.Id))
    //            {
    //                return new StatusCodeResult(StatusCodes.Status409Conflict);
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }

    //        return CreatedAtAction("GetUser", new { id = user.Id }, user);
    //    }

    //    // DELETE: api/Users/5
    //    [HttpDelete("{id}")]
    //    public async Task<IActionResult> Delete([FromRoute] int id)
    //    {
    //        if (!ModelState.IsValid)
    //        {
    //            return BadRequest(ModelState);
    //        }

    //        var user = await _context.User.SingleOrDefaultAsync(m => m.Id == id);
    //        if (user == null)
    //        {
    //            return NotFound();
    //        }

    //        _context.User.Remove(user);
    //        await _context.SaveChangesAsync();

    //        return Ok(user);
    //    }

    //    private bool UserExists(int id)
    //    {
    //        return _context.User.Any(e => e.Id == id);
    //    }
    //}

    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] UserDto userDto)
        {
            var user = _userService.Authenticate(userDto.Email, userDto.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Id = user.Id,
                Username = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserDto userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            try
            {
                // save 
                _userService.Create(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UserDto userDto)
        {
            // map dto to entity and set id
            var user = _mapper.Map<User>(userDto);
            user.Id = id;

            try
            {
                // save 
                _userService.Update(user, userDto.Password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
    }
}
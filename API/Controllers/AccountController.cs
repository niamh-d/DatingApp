using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
    {

        var user = new AppUser
        {
            DisplayName = dto.DisplayName,
            Email = dto.Email,
            UserName = dto.Email,
            Member = new Member
            {
                DisplayName = dto.DisplayName,
                Gender = dto.Gender,
                Country = dto.Country,
                City = dto.City,
                DateOfBirth = dto.DateOfBirth
            }
        };

        var result = await userManager.CreateAsync(user, dto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("identity", error.Description);
            }
            return ValidationProblem();
        }

        return user.ToDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto dto)
    {
        var user = await userManager.FindByEmailAsync(dto.Email);

        if (user == null)
        {
            return Unauthorized("Invalid email");
        }

        var result = await userManager.CheckPasswordAsync(user, dto.Password);

        if (!result)
        {
            return Unauthorized("Invalid password");
        }

        return user.ToDto(tokenService);
    }
}

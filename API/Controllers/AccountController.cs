using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
    {

        if (await EmailExists(dto.Email))
        {
            return BadRequest("Email already exists");
        }

        using var hmac = new HMACSHA512();

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

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user.ToDto(tokenService);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto dto)
    {
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email!.ToLower() == dto.Email.ToLower());

        if (user == null)
        {
            return Unauthorized("Invalid email");
        }

        return user.ToDto(tokenService);
    }

    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(x => x.Email!.ToLower() == email.ToLower());
    }
}

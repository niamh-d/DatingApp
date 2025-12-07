using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await memberRepository.GetMembersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

            if (member == null)
            {
                return NotFound();
            }
            return member;
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotosForMember(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto dto)
        {
            var memberId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (memberId == null) return BadRequest("Oops – no id found in the token");

            var member = await memberRepository.GetMemberByIdAsync(memberId);

            if (member == null) return BadRequest("Member not found");

            member.DisplayName = dto.DisplayName ?? member.DisplayName;
            member.Description = dto.Description ?? member.Description;
            member.City = dto.City ?? member.City;
            member.Country = dto.Country ?? member.Country;

            memberRepository.Update(member);

            if (await memberRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update member");
        }
    }
}

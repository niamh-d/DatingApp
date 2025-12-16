using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;

namespace API.Data
{
    public class MessageRepository(AppDbContext context) : IMessageRepository
    {
        public void AddMessage(Message message)
        {
            context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            context.Messages.Remove(message);
        }

        public async Task<Message?> GetMessage(string id)
        {
            return await context.Messages.FindAsync(id);
        }

        public async Task<PaginatedResult<MessageDto>> GetMessagesForMember(MessageParams messageParams)
        {
            var query = context.Messages
            .OrderByDescending(x => x.DateSent)
            .AsQueryable();

            query = messageParams.Container switch
            {
                "outbox" => query.Where(x => x.SenderId == messageParams.MemberId),
                _ => query.Where(x => x.RecipientId == messageParams.MemberId),
            };

            var messageQuery = query.Select(MessageExtensions.ToDtoProjection());

            return await PaginationHelper.CreateAsync(messageQuery, messageParams.PageNumber, messageParams.PageSize);
        }

        public Task<IReadOnlyList<MessageDto>> GetMessageThread(string curremtMemberId, string recipientId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
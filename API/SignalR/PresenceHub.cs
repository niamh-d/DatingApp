using System.Security.Claims;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub(PresenceTracker presenceTracker) : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await presenceTracker.UserConnected(GetUserId(), Context.ConnectionId);
            await Clients.Others.SendAsync("UserOnline", GetUserId());
            await SendOnlineUsersAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await presenceTracker.UserDisconnected(GetUserId(), Context.ConnectionId);
            await Clients.Others.SendAsync("UserOffline", GetUserId());
            await SendOnlineUsersAsync();
            await base.OnDisconnectedAsync(exception);
        }

        private async Task SendOnlineUsersAsync()
        {
            var currentUsers = await presenceTracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        private string GetUserId()
        {
            return Context.User?.GetMemberId() ?? throw new HubException("Cannot get member id");
        }
    }
}
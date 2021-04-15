using System;
using System.Threading.Tasks;
using Application.Discussions;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class DiscussionHub : Hub
    {
        private readonly IMediator _mediator;
        public DiscussionHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        // Method to carry the Discussion in a group which has same project Id.
        public async Task SendDiscussion(Create.Command command)
        {
            var discussion = await _mediator.Send(command);

            await Clients.Group(command.ProjectId.ToString()).SendAsync("ReceiveDiscussion", discussion.Value);
        }

        //Making an group using ProjectId as the unique identifier and providing the list of discusion to the user.
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var projectId = httpContext.Request.Query["projectId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, projectId);
            var result = await _mediator.Send(new List.Query { ProjectId = Guid.Parse(projectId) });

            await Clients.Caller.SendAsync("LoadDiscussions", result.Value);
        }
    }
}
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Infrastructure.Security
{
    public class IsOwnerRequirement : IAuthorizationRequirement
    {

    }

    public class IsOwnerRequirementHandler : AuthorizationHandler<IsOwnerRequirement>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsOwnerRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = dbContext;

        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwnerRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            //User is not valid
            if (null == userId) return Task.CompletedTask;

            //Getting Project ID form Route
            var projectId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

            //As no tracking prevents tracking of object in memory, First or defualt async keeps track in memory so we have to sue Single or Default async
            var contributor = _context.ProjectContributors
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ProjectId == projectId).Result;

            if (null == contributor) return Task.CompletedTask;

            if (contributor.IsOwner) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
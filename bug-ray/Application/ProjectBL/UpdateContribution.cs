using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.ProjectBL
{
    public class UpdateContribution
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUserAccessor _accessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor accessor)
            {
                _context = context;
                _accessor = accessor;
            }

            //SingleOrDefault throws exception, FirstOrDefault returns null
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects
                .Include(p => p.Contributors).ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (null == project) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _accessor.GetUsername());

                if (null == user) return null;

                var hostUserName = project.Contributors.FirstOrDefault(x => x.IsOwner)?.AppUser?.UserName;

                var contribution = project.Contributors.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (null != contribution && hostUserName == user.UserName)
                    project.IsCancelled = !project.IsCancelled;

                if (null != contribution && hostUserName != user.UserName)
                    project.Contributors.Remove(contribution);

                if (null == contribution)
                {
                    contribution = new ProjectContributor
                    {
                        AppUser = user,
                        Project = project,
                        IsOwner = false,
                    };

                    project.Contributors.Add(contribution);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem Updating Contribution");
            }
        }
    }
}
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Tracking
{
    public class TrackerToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string TargetUsername { get; set; }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                var target = await _context.Users.FirstAsync(t => t.UserName == request.TargetUsername);

                if (null == target) return null;

                var tracking = await _context.UserTrackings.FindAsync(observer.Id, target.Id);

                if (null == tracking)
                {
                    tracking = new UserTracking
                    {
                        Observer = observer,
                        Target = target
                    };
                    _context.UserTrackings.Add(tracking);
                }
                else
                {
                    _context.UserTrackings.Remove(tracking);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update tracker");
            }
        }
    }
}
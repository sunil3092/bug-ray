using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.ProjectBL
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Project Project { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Project).SetValidator(new ProjectValidator());
            }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var contributor = new ProjectContributor
                {
                    AppUser = user,
                    Project = request.Project,
                    IsOwner = true,
                    IsContributing = true,
                };

                request.Project.Contributors.Add(contributor);

                _context.Projects.Add(request.Project);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create project");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Discussions
{
    public class Create
    {
        public class Command : IRequest<Result<DiscussionDto>>
        {
            public string Body { get; set; }
            public Guid ProjectId { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<DiscussionDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<DiscussionDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.ProjectId);

                if (null == project) return null;

                var user = await _context.Users
                    .Include(project => project.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var discussion = new Domain.Discussions
                {
                    Author = user,
                    Project = project,
                    Body = request.Body
                };

                project.Discussions.Add(discussion);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<DiscussionDto>.Success(_mapper.Map<DiscussionDto>(discussion));

                return Result<DiscussionDto>.Failure("Failed to add to discussion");
            }
        }
    }
}
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.ProjectBL
{
    public class Details
    {

        public class Query : IRequest<Result<ProjectDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ProjectDto>>
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

            public async Task<Result<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() }).FirstOrDefaultAsync(p => p.Id == request.Id);

                return Result<ProjectDto>.Success(project);
            }
        }
    }
}
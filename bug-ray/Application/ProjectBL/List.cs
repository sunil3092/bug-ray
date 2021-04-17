using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.ProjectBL
{
    public class List
    {
        public class Query : IRequest<Result<List<ProjectDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ProjectDto>>>
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
            public async Task<Result<List<ProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var projects = await _context.Projects
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                .ToListAsync(cancellationToken);

                return Result<List<ProjectDto>>.Success(projects);
            }
        }
    }
}
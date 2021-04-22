using System.Collections.Generic;
using System.Linq;
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
        public class Query : IRequest<Result<PagedList<ProjectDto>>>
        {
            public ProjectParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ProjectDto>>>
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
            public async Task<Result<PagedList<ProjectDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Projects
                .Where(d => d.Estimate <= request.Params.Estimate)
                .OrderBy(d => d.Estimate)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                .AsQueryable();

                if (request.Params.IsContributing && !request.Params.IsOwner)
                {
                    query = query.Where(x => x.Contributors.Any(p => p.Username == _userAccessor.GetUsername()));
                }

                if (request.Params.IsOwner && !request.Params.IsContributing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());

                }

                return Result<PagedList<ProjectDto>>.Success(await PagedList<ProjectDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}
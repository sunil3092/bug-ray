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
            public PagingParams Params { get; set; }
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
                .OrderBy(d => d.Estimate)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider, new { currentUserName = _userAccessor.GetUsername() })
                .AsQueryable();

                return Result<PagedList<ProjectDto>>.Success(await PagedList<ProjectDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));
            }
        }
    }
}
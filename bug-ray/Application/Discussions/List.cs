using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Discussions
{
    public class List
    {
        public class Query : IRequest<Result<List<DiscussionDto>>>
        {
            public Guid ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<DiscussionDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<Result<List<DiscussionDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var discussions = await _context.Discussions
                .Where(x => x.Project.Id == request.ProjectId)
                .OrderBy(x => x.CreatedAt)
                .ProjectTo<DiscussionDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

                return Result<List<DiscussionDto>>.Success(discussions);
            }
        }
    }
}
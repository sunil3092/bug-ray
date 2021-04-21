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

namespace Application.ProfileBL
{
    public class ListProjects
    {
        public class Query : IRequest<Result<List<UserContributionDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query,
        Result<List<UserContributionDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<UserContributionDto>>> Handle(Query
            request, CancellationToken cancellationToken)
            {
                var query = _context.ProjectContributors
                .Where(u => u.AppUser.UserName == request.Username)
                .OrderBy(a => a.Project.Estimate)
                .ProjectTo<UserContributionDto>(_mapper.ConfigurationProvider)
                .AsQueryable();
                query = request.Predicate switch
                {
                    "Contribution" => query.Where(a => a.Estimate <= DateTime.Now),
                    "Owned" => query.Where(a => a.HostUsername ==
                    request.Username),
                    _ => query.Where(a => a.Estimate >= DateTime.Now)
                };
                var projects = await query.ToListAsync();
                return Result<List<UserContributionDto>>.Success(projects);
            }
        }
    }
}
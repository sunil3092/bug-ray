using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.ProjectBL
{
    public class List
    {
        public class Query : IRequest<Result<List<Project>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Project>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Result<List<Project>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Project>>.Success(await _context.Projects.ToListAsync());
            }
        }
    }
}
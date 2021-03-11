using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.ProjectBL
{
    public class List
    {
        public class Query : IRequest<List<Project>> { }

        public class Handler : IRequestHandler<Query, List<Project>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Project>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Projects.ToListAsync();
            }
        }
    }
}
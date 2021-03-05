using MediatR;
using Domain;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Persistance;
using Microsoft.EntityFrameworkCore;

namespace Application.EffortBL
{
    public class List
    {
        public class Query : IRequest<List<Effort>> { }

        public class Handler : IRequestHandler<Query, List<Effort>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<Effort>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Efforts.ToListAsync();
            }
        }
    }
}
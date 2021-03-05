using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.EffortBL
{
    public class Details
    {
        public class Query : IRequest<Effort>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Effort>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Effort> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Efforts.FindAsync(request.Id);
            }
        }
    }
}
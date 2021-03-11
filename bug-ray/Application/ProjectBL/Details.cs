using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.ProjectBL
{
    public class Details
    {

        public class Query : IRequest<Project>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Project>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Projects.FindAsync(request.Id);
            }
        }
    }
}
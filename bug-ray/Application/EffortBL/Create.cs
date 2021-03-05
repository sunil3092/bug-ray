using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.EffortBL
{
    public class Create
    {
        public class Command : IRequest
        {
            public Effort Effort { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Efforts.Add(request.Effort);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }

    }
}
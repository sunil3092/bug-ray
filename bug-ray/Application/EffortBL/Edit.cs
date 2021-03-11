using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.EffortBL
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Effort Effort { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var effort = await _dataContext.Efforts.FindAsync(request.Effort.Id);

                effort.Title = request.Effort.Title ?? effort.Title;

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
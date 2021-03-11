using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
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
            private readonly IMapper _mapper;
            public Handler(DataContext dataContext, IMapper mapper)
            {
                _mapper = mapper;
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var effort = await _dataContext.Efforts.FindAsync(request.Effort.Id);

                _mapper.Map(request.Effort, effort);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
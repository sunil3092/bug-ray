using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistance;

namespace Application.ProjectBL
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Project Project { get; set; }
        }


        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Project).SetValidator(new ProjectValidator());
            }
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
                var effort = await _dataContext.Projects.FindAsync(request.Project.Id);

                _mapper.Map(request.Project, effort);

                await _dataContext.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
using Domain;
using FluentValidation;

namespace Application.ProjectBL
{
    public class ProjectValidator : AbstractValidator<Project>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Estimate).NotEmpty();
        }
    }
}
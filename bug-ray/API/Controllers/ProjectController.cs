using System;
using System.Threading.Tasks;
using Application.ProjectBL;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProjectController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = Id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(Project Project)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Project = Project }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(Guid Id, Project Project)
        {
            Project.Id = Id;

            return HandleResult(await Mediator.Send(new Edit.Command { Project = Project }));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteProject(Guid Id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = Id }));
        }
    }
}
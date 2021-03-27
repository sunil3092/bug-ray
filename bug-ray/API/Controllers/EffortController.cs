using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.EffortBL;

namespace API.Controllers
{
    public class EffortController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Effort>>> GetEfforts()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Effort>> GetEffort(Guid Id)
        {
            return await Mediator.Send(new Details.Query { Id = Id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateEffort(Effort effort)
        {
            return Ok(await Mediator.Send(new Create.Command { Effort = effort }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEffort(Guid Id, Effort effort)
        {
            effort.Id = Id;

            return Ok(await Mediator.Send(new Edit.Command { Effort = effort }));
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteEffort(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = Id }));
        }
    }
}
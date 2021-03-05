using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using MediatR;
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
    }
}
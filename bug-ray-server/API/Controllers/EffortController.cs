using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace API.Controllers
{
    public class EffortController : BaseApiController
    {
        private readonly DataContext _context;
        public EffortController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Effort>>> GetEfforts()
        {
            return await _context.Efforts.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Effort>> GetEffort(Guid Id)
        {
            return await _context.Efforts.FindAsync(Id);
        }
    }
}
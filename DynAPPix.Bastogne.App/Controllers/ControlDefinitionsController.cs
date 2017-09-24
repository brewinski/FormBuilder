using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dynappix.Bastogne.Models;

namespace Dynappix.Bastogne.App.Controllers
{
    [Produces("application/json")]
    [Route("api/ControlDefinitions")]
    public class ControlDefinitionsController : Controller
    {
        private readonly BastogneContext _context;

        public ControlDefinitionsController(BastogneContext context)
        {
            _context = context;
        }

        // GET: api/ControlDefinitions
        [HttpGet]
        public IEnumerable<ControlDefinition> GetControlDefinition()
        {
            return _context.ControlDefinition;
        }

        // GET: api/ControlDefinitions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetControlDefinition([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var controlDefinition = await _context.ControlDefinition.SingleOrDefaultAsync(m => m.ControlTypeId == id);

            if (controlDefinition == null)
            {
                return NotFound();
            }

            return Ok(controlDefinition);
        }

        // PUT: api/ControlDefinitions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControlDefinition([FromRoute] Guid id, [FromBody] ControlDefinition controlDefinition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != controlDefinition.ControlTypeId)
            {
                return BadRequest();
            }

            _context.Entry(controlDefinition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlDefinitionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ControlDefinitions
        [HttpPost]
        public async Task<IActionResult> PostControlDefinition([FromBody] ControlDefinition controlDefinition)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ControlDefinition.Add(controlDefinition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetControlDefinition", new { id = controlDefinition.ControlTypeId }, controlDefinition);
        }

        // DELETE: api/ControlDefinitions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControlDefinition([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var controlDefinition = await _context.ControlDefinition.SingleOrDefaultAsync(m => m.ControlTypeId == id);
            if (controlDefinition == null)
            {
                return NotFound();
            }

            _context.ControlDefinition.Remove(controlDefinition);
            await _context.SaveChangesAsync();

            return Ok(controlDefinition);
        }

        private bool ControlDefinitionExists(Guid id)
        {
            return _context.ControlDefinition.Any(e => e.ControlTypeId == id);
        }
    }
}
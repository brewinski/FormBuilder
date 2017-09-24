using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dynappix.Bastogne.API.Models;

namespace Dynappix.Bastogne.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Controls")]
    public class ControlsController : Controller
    {
        private readonly BastogneContext _context;

        public ControlsController(BastogneContext context)
        {
            _context = context;
        }

        // GET: api/Controls
        [HttpGet]
        public IEnumerable<Control> GetControl()
        {
            return _context.Control;
        }

        // GET: api/Controls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetControl([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var control = await _context.Control.SingleOrDefaultAsync(m => m.ControlId == id);

            if (control == null)
            {
                return NotFound();
            }

            return Ok(control);
        }

        // PUT: api/Controls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControl([FromRoute] Guid id, [FromBody] Control control)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != control.ControlId)
            {
                return BadRequest();
            }

            _context.Entry(control).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlExists(id))
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

        // POST: api/Controls
        [HttpPost]
        public async Task<IActionResult> PostControl([FromBody] Control control)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Control.Add(control);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetControl", new { id = control.ControlId }, control);
        }

        // DELETE: api/Controls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControl([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var control = await _context.Control.SingleOrDefaultAsync(m => m.ControlId == id);
            if (control == null)
            {
                return NotFound();
            }

            _context.Control.Remove(control);
            await _context.SaveChangesAsync();

            return Ok(control);
        }

        private bool ControlExists(Guid id)
        {
            return _context.Control.Any(e => e.ControlId == id);
        }
    }
}
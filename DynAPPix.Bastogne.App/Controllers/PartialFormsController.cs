using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dynappix.Bastogne.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Dynappix.Bastogne.Services;

namespace Dynappix.Bastogne.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PartialFormsController : Controller
    {
        private readonly BastogneContext _context;
        private IMailService _mailService;

        public PartialFormsController(BastogneContext context, IMailService mailService)
        {
            _context = context;
            _mailService = mailService;
        }

        // GET: api/PartialForms
        [HttpGet("GetAll")]
        public IEnumerable<PartialForm> GetPartialForm()
        {
            return _context.PartialForm;
        }

        // GET: api/PartialForms/ExampleForm
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPartialForm([FromRoute] string id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Get my form and all controls
            var partialForm = await _context.PartialForm
                .Include(pf => pf.Control)
                .SingleOrDefaultAsync(m => m.Name == id);

            //Sort controls int hirachy

            foreach (var item in partialForm.Control)
            {
                item.InverseParentControl = partialForm.Control.Where(x => x.ParentControlId.HasValue && x.ParentControlId == item.ControlId).OrderBy(x => x.Order).ToList();
            }

            partialForm.Control = partialForm.Control.Where(x => !x.ParentControlId.HasValue).OrderBy(x => x.Order).ToList();


            if (partialForm == null)
            {
                return NotFound();
            }

            return Ok(partialForm);
        }

        // GET: api/PartialForms/5
        [HttpGet("ByGuid/{id:guid}")]
        public async Task<IActionResult> GetPartialForm([FromRoute] Guid id)
        {
            //await _mailService.SendEmailAsync("brendons@dynappix.com.au", "testing 123", "Hi, I'm a test email");
            //await _mailService.SendEmailAsync("chrisb@dynappix.com.au", "testing 123", "Hi, I'm a test email");
            //await _mailService.SendEmailAsync("cbrewin93@gmail.com", "testing 123", "Hi, I'm a test email");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Get my form and all controls
            var partialForm = await _context.PartialForm
                .Include(pf => pf.Control)
                .Include("Event.Rule")
                .SingleOrDefaultAsync(m => m.PartialId == id);

            //Sort controls int hirachy

            foreach (var item in partialForm.Control)
            {
                item.InverseParentControl = partialForm.Control.Where(x => x.ParentControlId.HasValue && x.ParentControlId == item.ControlId).OrderBy(x => x.Order).ToList();
            }

            partialForm.Control = partialForm.Control.Where(x => !x.ParentControlId.HasValue).OrderBy(x => x.Order).ToList();


            if (partialForm == null)
            {
                return NotFound();
            }

            return Ok(partialForm);
        }

        // PUT: api/PartialForms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartialForm([FromRoute] Guid id, [FromBody] PartialForm partialForm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != partialForm.PartialId)
            {
                return BadRequest();
            }

            _context.Entry(partialForm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartialFormExists(id))
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

        private List<Control> FlattenHirachy(List<Control> FormControls, Control Parent, Guid FormId)
        {
            List<Control> FlatControls = new List<Control>();
            int index = 0;
            foreach (var Control in FormControls)
            {
                bool IsNew;
                if (Control.ControlId == Guid.Empty)
                {
                    IsNew = true;
                    Control.IsNew = IsNew;
                }
                else
                {
                    IsNew = false;
                    Control.IsNew = IsNew;
                }
                if (Control.InverseParentControl != null)
                {
                    if (Control.InverseParentControl.Count > 0)
                    {
                        FlatControls.AddRange(FlattenHirachy(Control.InverseParentControl.ToList(), Control, FormId));
                    }
                }

                if (Parent != null)
                {
                    Control.ParentControl = Parent;
                    Control.ParentControlId = Parent.ControlId;
                }
                else
                {
                    Control.ParentControl = null;
                    Control.ParentControlId = null;
                }

                Control.UpdatedId = "Chris";
                Control.Order = index++;

                Control.PartialId = FormId;

                FlatControls.Add(Control);

            }

            return FlatControls;
        }

        // POST: api/PartialForms
        [HttpPost]
        public async Task<IActionResult> PostPartialForm(/*[FromBody] PartialForm Json*/[FromBody]object Json)
        {

            PartialForm partialForm = new PartialForm();

            List<Control> controls = new List<Control>();

            List<Event> events = new List<Event>();
            try
            {
                Console.Write(Json.ToString() + "testing");
                partialForm = JsonConvert.DeserializeObject<PartialForm>(Json.ToString());
                partialForm.Control = FlattenHirachy(partialForm.Control.ToList(), null, partialForm.PartialId);
                events = partialForm.Event.ToList();
                partialForm.Event = events;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {

                //Update Add or Delete rules on Events
                

                //Update Add or Delete events on the form. 
                foreach (var Event in partialForm.Event)
                {
                    foreach (var Rule in Event.Rule)
                    {
                        if (Rule.RuleId == Guid.Empty)
                            _context.Rule.Add(Rule);
                        else
                            _context.Rule.Update(Rule);
                    }
                    if (Event.EventId == Guid.Empty)
                        _context.Event.Add(Event);
                    else
                        _context.Event.Update(Event);
                }

                //Update Add or Delete controls ond the form based on the annotation.
                foreach (var Control in partialForm.Control)
                {

                    //if (Control.Event.Count < 1)
                    //{
                        if (Control.IsNew)
                            _context.Control.Add(Control);
                        else
                            _context.Control.Update(Control);
                    //}
                    //else
                    //{
                    //    foreach (var Event in Control.Event)
                    //    {
                    //        Event.Control = null;
                    //        Event.ControlId = Control.ControlId;
                            
                    //    }
                    //    Control.Event.Clear();
                    //}
                }

                //Get list of contsols form DB

                var refrenceControls = _context.Control
                    .Where(m => m.PartialId == partialForm.PartialId)
                    .ToList();
                //Find controls that nolonger exist.
                var result = refrenceControls.Where(p => !partialForm.Control.Any(p2 => p2.ControlId == p.ControlId));

                // Delete the controls from the database.
                foreach (var c in result)
                {
                    c.ParentControl = null;
                    c.ParentControlId = null;
                    c.InverseParentControl = null;
                    c.PartialId = null;
                    _context.Control.Update(c);
                    _context.Control.Remove(c);
                }

                //Update or Add the list if this is a new list.
                if (partialForm.PartialId == Guid.Empty)
                {
                    _context.PartialForm.Add(partialForm);
                }
                else
                {
                    _context.PartialForm.Update(partialForm);
                }
                await _context.SaveChangesAsync();
            }
            catch (Exception Ex)
            {

                Console.Write(Ex);
                return StatusCode(StatusCodes.Status500InternalServerError, Ex.Message);
            }

            //Re-read the form to populate the GUIDs
            partialForm = _context.PartialForm
                .Include(pf => pf.Control)
                .SingleOrDefault(m => m.PartialId == partialForm.PartialId);

            //Sort controls into hierarachy again after FlattenHierarchy mangles them
            foreach (var item in partialForm.Control)
            {
                item.InverseParentControl = partialForm.Control.Where(x => x.ParentControlId.HasValue && x.ParentControlId == item.ControlId).OrderBy(x => x.Order).ToList();
            }
            partialForm.Control = partialForm.Control.Where(x => !x.ParentControlId.HasValue).OrderBy(x => x.Order).ToList();

            return CreatedAtAction("GetPartialForm", new { id = partialForm.PartialId }, partialForm);
        }

        // DELETE: api/PartialForms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePartialForm([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var partialForm = await _context.PartialForm
                .Include(pf => pf.Control)
                .SingleOrDefaultAsync(m => m.PartialId == id);

            if (partialForm == null)
            {
                return NotFound();
            }

            foreach (var c in partialForm.Control)
            {
                c.ParentControl = null;
                c.ParentControlId = null;
                c.InverseParentControl = null;
                c.PartialId = null;
                _context.Control.Update(c);
                _context.Control.Remove(c);
            }

            _context.PartialForm.Remove(partialForm);
            await _context.SaveChangesAsync();

            return Ok(partialForm);
        }

        private bool PartialFormExists(Guid id)
        {
            return _context.PartialForm.Any(e => e.PartialId == id);
        }
    }

}
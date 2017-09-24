using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dynappix.Bastogne.Services;
using Microsoft.AspNetCore.Http;
using Dynappix.Bastogne.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Dynappix.Bastogne.Helpers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dynappix.Bastogne.App.Controllers
{
    public class MailMessageStructure
    {
        public string FormId { get; set; }
        public string FormName { get; set; }
        public string DestinationEmail { get; set; }
        public string UserName { get; set; }
        public string Message { get; set; }
        public string Image { get; set; }
        public ICollection<ControlInformation> FormInputControls { get; set; }
    }

    public class ControlInformation
    {
        public string Name { get; set; }
        public string DesignNotes { get; set; }
        public string ExternalData { get; set; }
    }

    [Route("api/mail")]
    public class MailController : Controller
    {
        private IMailService _mailService;
        private readonly MailSettings _mailSettings;

        public MailController(IMailService mailService, IOptions<MailSettings> mailSettings)
        {
            _mailService = mailService;
            _mailSettings = mailSettings.Value;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]MailMessageStructure Message)
        {
            if(String.IsNullOrEmpty(Message.Message))
            {
                Console.Write("Yolo");
            }

            try
            {
                //load template here in future
                string _template = @"<p><center><h1>Bastogne</h1><h3> by DynAPPix</h3></center></p><p>A form that has been developed in Bastogne by {0} is ready for implementation. </br>A screenshot of the form itself along with the controls and any associated notes has been included below.</p><p>You can view this form online <a href='{1}'>here</a>.</p>";

                string _message = string.Format(_template, Message.UserName, _mailSettings.RunTimeBaseUrl + Message.FormId);

                string _controlTable = "<p><table><thead><tr><th>Control Name</th><th>Design Notes</th><th>External Data</th></tr>";
                _controlTable += "<tbody>";
                foreach (var InputControl in Message.FormInputControls)
                {
                    _controlTable += "<tr>";
                    _controlTable += $"<td>{InputControl.Name}</td><td>{InputControl.DesignNotes}</td><td>{InputControl.ExternalData}</td>";
                    _controlTable += "</tr>";
                }
                _controlTable += "</tbody></table><p>";
                //return _controlTable;

                _message += _controlTable;

                await _mailService.SendImplementationEmail(
                    Message.DestinationEmail, 
                    _mailSettings.ImplementationSubject + Message.FormName, 
                    _message, Message.Image
                    );
            }
            catch(Exception Ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, Ex.Message);
            }

            return Ok();
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

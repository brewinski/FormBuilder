using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Dynappix.Bastogne.Service;
using Microsoft.Extensions.Configuration;
using Dynappix.Bastogne.MVC.Service;
using Microsoft.Extensions.Logging;
using Dynappix.Bastogne.Models;
using System.Net.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Dynappix.Bastogne.MVC.Controllers
{
    [Route("api/[controller]")]
    public class FormServiceController : Controller
    {
        private IMailService _mailService;
        private IConfigurationRoot _config;
        private IFormsRestService _formRepository;
        private ILogger<FormServiceController> _logger;

        public FormServiceController(IMailService mailService, IConfigurationRoot config, IFormsRestService formRepository, ILogger<FormServiceController> logger)
        {
            _mailService = mailService;
            _config = config;
            _formRepository = formRepository;
            _logger = logger;
        }

        // GET: api/values
        [HttpGet]
        public async Task<List<PartialForm>> GetAsync()
        {
            return await _formRepository.GetAllForms();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<PartialForm> Get(string id)
        {
            return await _formRepository.GetFormAsync(id);
        }

        // GET api/values/5
        [HttpGet("{id:guid}")]
        public async Task<PartialForm> Get(Guid id)
        {
            return await _formRepository.GetFormAsync(id);
        }

        // POST api/values
        [HttpPost]
        public async Task<HttpResponseMessage> Post([FromBody]object partialForm)
        {
            return await _formRepository.SaveForm(partialForm);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<HttpResponseMessage> Delete([FromRoute]Guid id)
        {
            return await _formRepository.DeleteForm(id);
        }
    }
}

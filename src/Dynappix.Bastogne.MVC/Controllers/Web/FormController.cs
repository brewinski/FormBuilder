using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Dynappix.Bastogne.Service;
using Dynappix.Bastogne.MVC.Service;
using Dynappix.Bastogne.Models;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Dynappix.Bastogne.Controllers.Web
{
    
    public class FormController : Controller
    {
        private IMailService _mailService;
        private IConfigurationRoot _config;
        private IFormsRestService _formRepository;
        private ILogger<FormController> _logger;

        public FormController(IMailService mailService, IConfigurationRoot config, IFormsRestService formRepository, ILogger<FormController> logger)
        {
            _mailService = mailService;
            _config = config;
            _formRepository = formRepository;
            _logger = logger;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult FormBuilder()
        {
            return View();
        }

        public IActionResult FormBuilderNg(Guid id)
        {
            return View();
        }
     
        public IActionResult FormRuntime(string id)
        {
            return View();
        }
    }
}

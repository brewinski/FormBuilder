using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Dynappix.Bastogne.Models;
using Dynappix.Bastogne.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Dynappix.Bastogne.Models.Interfaces;
using Dynappix.Bastogne.Service;

namespace Dynappix.Bastogne.Controllers.Web
{
    public class AppController: Controller
    {
        private IMailService _mailService;
        private IConfigurationRoot _config;
        //private WorldContext _context;
        private ILogger<AppController> _logger;

        public AppController(IMailService mailService, IConfigurationRoot config, /*IWorldRepository repository,*/ ILogger<AppController> logger)
        {
            _mailService = mailService;
            _config = config;
           //_repository = repository;
            _logger = logger;
        }

        public IActionResult Index()
        {
            try
            {
                return View();
            }
            catch(Exception Ex)
            {
                _logger.LogError($"Failed to get trips for the index page {Ex.Message}");
                return Redirect("/error");
            }

        }

        public IActionResult Contact()
        {
            
            return View();
        }

        [HttpPost]
        public IActionResult Contact(ContactViewModel model)
        {
            if(model.Email.Contains("@aol.com"))
            {
                ModelState.AddModelError("", "We dont support AOL addresses.");
            }

            if (ModelState.IsValid)
            {
                _mailService.SendMail(_config["MailSettings:ToAddress"], model.Email, "The World", model.Message);

                ModelState.Clear();
                ViewBag.UserMessage = "Message Sent";
            }
            
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
    }
}

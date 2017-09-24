using Dynappix.Bastogne.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.MVC.Service
{
    public interface IFormsRestService
    {
        Task<List<PartialForm>> GetAllForms();

        Task<PartialForm> GetFormAsync(Guid id);

        Task<PartialForm> GetFormAsync(string name);

        Task<HttpResponseMessage> SaveForm(object partialForm);

        Task<HttpResponseMessage> DeleteForm(Guid id);
    }
}

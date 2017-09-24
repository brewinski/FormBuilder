using Dynappix.Bastogne.MVC.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dynappix.Bastogne.Models;
using Newtonsoft.Json;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Headers;

namespace Dynappix.Bastogne.MVC.Controllers.API
{
    public class FormsRestService : IFormsRestService
    {
        private string _apiaddress;
        private ILogger<FormsRestService> _logger;
        private IConfigurationRoot _config;

        public FormsRestService(ILogger<FormsRestService> logger, IConfigurationRoot config)
        {
            _logger = logger;
            _config = config;
            _apiaddress = _config["ConnectionStrings:FormsServiceUrl"];
        }

        public async Task<HttpResponseMessage> DeleteForm(Guid id)
        {
            _logger.LogInformation($"Deleting form with id: {id}");
            HttpResponseMessage result = new HttpResponseMessage();
            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    result = await httpClient.DeleteAsync(_apiaddress + id);
                }
                catch (Exception Ex)
                {
                    _logger.LogError($"Failed to get form: {Ex.Message}");
                    return result;
                }
                return result;
            }
        }

        public async Task<List<PartialForm>> GetAllForms()
        {
            List<PartialForm> result = new List<PartialForm>();

            using (HttpClient httpClient = new HttpClient())
            {
                _logger.LogInformation($"Getting all forms from Forms Rest API");
                try
                {
                    result = JsonConvert.DeserializeObject<List<PartialForm>>(
                        await httpClient.GetStringAsync(_apiaddress)
                    );
                } catch(Exception Ex)
                {
                    _logger.LogError($"Failed to get all forms for the index page {Ex.Message}");
                    return result;
                }
                return result;
            }
        }

        public async Task<PartialForm> GetFormAsync(Guid id)
        {
            _logger.LogInformation($"Getting form from API with id: {id}");
            PartialForm result = new PartialForm();

            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    result = JsonConvert.DeserializeObject<PartialForm>(
                        await httpClient.GetStringAsync(_apiaddress+id)
                    );
                }
                catch (Exception Ex)
                {
                    _logger.LogError($"Failed to get form: {Ex.Message}");
                    return result;
                }
                return result;
            }
        }

        public async Task<PartialForm> GetFormAsync(string id)
        {
            _logger.LogInformation($"Getting form from API with name: {id}");
            PartialForm result = new PartialForm();

            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    result = JsonConvert.DeserializeObject<PartialForm>(
                        await httpClient.GetStringAsync(_apiaddress + id)
                    );
                }
                catch (Exception Ex)
                {
                    _logger.LogError($"Failed to get form: {Ex.Message}");
                    return result;
                }
                return result;
            }
        }


        public async Task<HttpResponseMessage> SaveForm(object partialForm)
        {
            _logger.LogInformation($"Saving form {partialForm}");
            HttpResponseMessage result = new HttpResponseMessage();
            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    var partialFormJson = JsonConvert.SerializeObject(partialForm);
                    var buffer = System.Text.Encoding.UTF8.GetBytes(partialFormJson);
                    var byteContent = new ByteArrayContent(buffer);
                    byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                    result = await httpClient.PostAsync(_apiaddress, byteContent);
                }
                catch (Exception Ex)
                {
                    _logger.LogError($"Failed to get form: {Ex.Message}");
                }

                return result;
            }
        }
    }
}

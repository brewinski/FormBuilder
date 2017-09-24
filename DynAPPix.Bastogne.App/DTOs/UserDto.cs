using Dynappix.Bastogne.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Avatar { get; set; }
        public string Password { get; set; }
        public DateTime Created { get; set; }
        public string PreferredLang { get; set; }
        public string Organisation { get; set; }
        public Organisation OrganisationNavigation { get; set; }
        public string Provider { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dynappix.Bastogne.Models
{
    public class User
    {
        public User()
        {
            UserRole = new HashSet<UserRole>();
        }
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Avatar { get; set; }
        public DateTime? Created { get; set; }
        public string PreferredLang { get; set; }
        public Guid Organisation { get; set; }
        public string Provider { get; set; }

        public virtual ICollection<UserRole> UserRole { get; set; }
        public virtual Organisation OrganisationNavigation { get; set; }

    }
}

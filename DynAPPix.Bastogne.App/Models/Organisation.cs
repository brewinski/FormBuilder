using System;
using System.Collections.Generic;

namespace Dynappix.Bastogne.Models
{
    public class Organisation
    {
        public Organisation()
        {
            User = new List<User>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PrimaryContactName { get; set; }
        public string PrimaryContactEmail { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Dynappix.Bastogne.App.TempModels
{
    public partial class UserRole
    {
        public int Id { get; set; }
        public Guid? RoleId { get; set; }
        public int? UserId { get; set; }

        public virtual Role Role { get; set; }
        public virtual User User { get; set; }
    }
}

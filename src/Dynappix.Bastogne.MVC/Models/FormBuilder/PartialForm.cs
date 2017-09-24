﻿using System;
using System.Collections.Generic;

namespace Dynappix.Bastogne.Models
{
    public partial class PartialForm
    {
        public PartialForm()
        {
            Control = new HashSet<Control>();
        }

        public Guid PartialId { get; set; }
        public Guid? RowId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedId { get; set; }
        public string Name { get; set; }
        public string Settings { get; set; }

        public virtual ICollection<Control> Control { get; set; }
    }
}

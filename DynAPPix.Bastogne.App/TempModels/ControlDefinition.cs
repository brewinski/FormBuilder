﻿using System;
using System.Collections.Generic;

namespace Dynappix.Bastogne.App.TempModels
{
    public partial class ControlDefinition
    {
        public Guid ControlTypeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedId { get; set; }
        public string Catagory { get; set; }
        public string ComponentName { get; set; }
        public string Description { get; set; }
        public string ControlName { get; set; }
    }
}

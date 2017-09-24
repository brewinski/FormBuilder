using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dynappix.Bastogne.Models
{
    public partial class Control
    {
       
        public Guid ControlId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedId { get; set; }
        public string Name { get; set; }
        public string Settings { get; set; }
        public string ControlTypeId { get; set; }
        public Guid? PartialId { get; set; }
        public Guid? ParentControlId { get; set; }
        public int? Order { get; set; }

        public virtual Control ParentControl { get; set; }

        [JsonProperty(PropertyName = "control")]
        public virtual ICollection<Control> InverseParentControl { get; set; }
        public virtual PartialForm Partial { get; set; }
        [NotMapped]
        public bool IsNew { get; set; }
    }
}

using Dynappix.Bastogne.Helpers;
using Dynappix.Bastogne.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.Models
{
    interface IControl
    {
        [JsonConverter(typeof(GuidConverter))]
        Guid ControlId { get; set; }
        [JsonConverter(typeof(GuidConverter))]
        Guid? PartialId { get; set; }
        [JsonConverter(typeof(GuidConverter))]
        Guid? ParentControlId { get; set; }

        [JsonProperty(PropertyName = "control")]
        ICollection<Control> InverseParentControl { get; set; }
    }
}

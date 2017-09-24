using Dynappix.Bastogne.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.Models
{
    interface IRule
    {
        [JsonConverter(typeof(GuidConverter))]
        Guid RuleId { get; set; }

        [JsonProperty(PropertyName = "_ruleSettings")]
        string RuleSettings { get; set; }
    }
}

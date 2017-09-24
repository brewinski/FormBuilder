using System;
using System.Collections.Generic;

namespace Dynappix.Bastogne.App.TempModels
{
    public partial class Rule
    {
        public Guid RuleId { get; set; }
        public string RuleName { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedId { get; set; }
        public string UpdatedDate { get; set; }
        public string UpdatedId { get; set; }
        public Guid? EventId { get; set; }
        public string TriggerComponentId { get; set; }
        public string TriggerFunctionId { get; set; }
        public string RuleSettings { get; set; }

        public virtual Event Event { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Dynappix.Bastogne.App.TempModels
{
    public partial class Event
    {
        public Event()
        {
            Rule = new HashSet<Rule>();
        }

        public Guid EventId { get; set; }
        public string EventName { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedId { get; set; }
        public Guid PartialId { get; set; }
        public Guid? ControlId { get; set; }

        public virtual ICollection<Rule> Rule { get; set; }
        public virtual PartialForm Partial { get; set; }
    }
}

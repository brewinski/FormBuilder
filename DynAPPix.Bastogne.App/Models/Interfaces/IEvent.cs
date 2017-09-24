using Dynappix.Bastogne.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.Models
{
    interface IEvent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonConverter(typeof(GuidConverter))]
        Guid EventId { get; set; }
    }
}

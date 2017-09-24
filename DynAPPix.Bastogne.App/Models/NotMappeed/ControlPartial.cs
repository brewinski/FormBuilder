using System.ComponentModel.DataAnnotations.Schema;

namespace Dynappix.Bastogne.Models
{
    public partial class Control
    {
        [NotMapped]
        public bool IsNew { get; set; }

        [NotMapped]
        public string value { get; set; }
    }
}

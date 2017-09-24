using Dynappix.Bastogne.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.ViewModels
{
    public class BlogViewModel
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public bool Status { get; set; }
        [Required]
        [StringLength(4096, MinimumLength = 20)]
        public string BlogText { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }

}

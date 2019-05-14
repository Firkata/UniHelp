using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniHelp
{
    public class SettingsDataModel
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(16)]
        public string GroupName { get; set; }

        [MaxLength(2048)]
        public string Feed { get; set; }

        [MaxLength(256)]
        public string PublisherId { get; set; }
    }
}

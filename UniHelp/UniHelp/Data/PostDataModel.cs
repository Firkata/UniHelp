using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UniHelp
{
    public class PostDataModel
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(64)]
        public string Title { get; set; }

        [Required]
        public int Group { get; set; }

        [Required]
        [MaxLength(2048)]
        public string Content { get; set; }
        
        public byte[] Image { get; set; }
        
        public byte[] File { get; set; }

        public string Author { get; set; }
    }
}

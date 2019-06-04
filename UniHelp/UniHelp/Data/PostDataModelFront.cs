using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UniHelp
{
    public class PostDataModelFront
    {
        public string Title { get; set; }

        public int Group { get; set; }

        public string Content { get; set; }

        public byte[] Image { get; set; }

        public byte[] File { get; set; }

        public string Author { get; set; }

        public string FileName { get; set; }

        public int Date { get; set; }

        public string DateName { get; set; }
    }
}

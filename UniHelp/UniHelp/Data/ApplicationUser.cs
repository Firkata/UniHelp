using Microsoft.AspNetCore.Identity;

namespace UniHelp
{
    public class ApplicationUser : IdentityUser
    {
        public int GroupNumber { get; set; }

        public string DisplayName { get; set; }
    }
}

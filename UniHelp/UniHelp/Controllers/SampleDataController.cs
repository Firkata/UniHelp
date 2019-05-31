using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace UniHelp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        protected ApplicationDbContext mContext;
        protected UserManager<ApplicationUser> mUserManager;
        protected SignInManager<ApplicationUser> mSignInManager;

        public SampleDataController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            mContext = context;
            mUserManager = userManager;
            mSignInManager = signInManager;
        }
        
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        //[Authorize(Roles = "Staff")]
        [HttpGet("[action]")]
        public IEnumerable<PostDataModel> GetGroupPosts()
        {
            var data = new List<PostDataModel>();
            var loggedUser = mUserManager.GetUserName(HttpContext.User);
            var userData = mContext.Users.Where(s => s.UserName == loggedUser).ToList();
            data = mContext.Settings.Where(s => s.Group == userData[0].GroupNumber).ToList();

            //var userData = mUserManager.GetUserAsync(HttpContext.User);
            //var user = mUserManager.FindByIdAsync(User.Identity.Name);

            var result = new List<PostDataModel>
            {
                new PostDataModel
                {
                    Id = data[0].Id,
                    Title = data[0].Title,
                    Content = data[0].Content,
                    Image = data[0].Image,
                    File = data[0].File,
                    Author = data[0].Author
                }
            };
            return result;
        }

        [HttpPost]
        [Route("createpost")]
        public IActionResult CreatePost(PostDataModel model, IFormFile file, IFormFile image)
        {
            using (var memoryStream = new MemoryStream())
            {
                image.CopyTo(memoryStream);
                model.Image = memoryStream.ToArray();
            }

            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                model.File = memoryStream.ToArray();
            }

            var loggedUser = mUserManager.GetUserName(HttpContext.User);
            var userData = mContext.Users.Where(s => s.UserName == loggedUser).ToList();
            model.Author = userData[0].DisplayName;

            //using (var context = new ApplicationDbContext())
            //{
            //    context.Settings.Add(model);
            //    context.SaveChanges();
            //}

            mContext.Settings.Add(model);
            mContext.SaveChanges();

            return RedirectToAction("counter");
        }

        //[Authorize]
        [HttpPost]
        [Route("createuser")]
        public async Task<IActionResult> CreateUserAsync(string username, string password, int group, string role, string displayname)
        {
            var result = await mUserManager.CreateAsync(new ApplicationUser
            {
                UserName = username,
                GroupNumber = group,
                DisplayName = displayname
            }, password);

            if (result.Succeeded)
            {
                ApplicationUser user = await mUserManager.FindByNameAsync(username);
                //var addClaimsResult = await mUserManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, role));
                await mUserManager.AddToRoleAsync(user, role);
                return Content("User was created", "text/html");
            }

            return Content("User creation failed", "text/html");
        }

        [Route("login")]
        public async Task<string> LoginAsync(string username, string password)
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            var result = await mSignInManager.PasswordSignInAsync(username, password, true, false);

            if (result.Succeeded)
            {
                //var loggedUser = mUserManager.GetUserName(HttpContext.User);
                //var userData = mUserManager.GetUserAsync(HttpContext.User);
                //var user = await mUserManager.FindByIdAsync(User.Identity.Name);
                return username;     
            }

            return "Failed to login";
        }

        [Route("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            return Content("logged out");
        }
    }
}

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
using Newtonsoft.Json;
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

        [Authorize]
        [HttpGet("[action]")]
        public IEnumerable<PostDataModelFront> GetGroupPosts()
        {
            var data = new List<PostDataModel>();
            var data2 = new List<PostDataModel>();
            var loggedUser = mUserManager.GetUserName(HttpContext.User);
            var userData = mContext.Users.Where(s => s.UserName == loggedUser).ToList();

            if (userData[0].GroupNumber == 0)
            {
                data = mContext.Settings.ToList();
            }
            else
            {
                data = mContext.Settings.Where(s => s.Group == userData[0].GroupNumber).ToList();
                data2 = mContext.Settings.Where(s => s.Group == 0).ToList();
                foreach (var post in data2)
                {
                    data.Add(post);
                }
            }

            data.OrderBy(s => s.Date);

            var result = new List<PostDataModelFront>();
            foreach (var post in data)
            {
                int time = post.Date.Subtract(DateTime.Now).Days;
                string timeAgo = "days";
                if (time == 0)
                {
                    time = post.Date.Subtract(DateTime.Now).Hours;
                    timeAgo = "hours";
                    if (time == 0)
                    {
                        time = post.Date.Subtract(DateTime.Now).Minutes;
                        timeAgo = "minutes";
                    }
                }

                result.Add(new PostDataModelFront
                {
                    Title = post.Title,
                    Content = post.Content,
                    Image = post.Image,
                    File = post.File,
                    Author = post.Author,
                    FileName = post.FileName,
                    Date = Math.Abs(time),
                    DateName = timeAgo
                });
            }

            return result;
        }

        [Authorize(Roles = "Admin, Administration, Teacher")]
        [HttpPost]
        [Route("createpost")]
        public IActionResult CreatePost(PostDataModel model, IFormFile file, IFormFile image)
        {
            if (image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    image.CopyTo(memoryStream);
                    model.Image = memoryStream.ToArray();
                }
            }

            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                model.File = memoryStream.ToArray();
            }

            var loggedUser = mUserManager.GetUserName(HttpContext.User);
            var userData = mContext.Users.Where(s => s.UserName == loggedUser).ToList();
            model.Author = userData[0].DisplayName;
            model.FileName = file.FileName;
            model.Date = DateTime.Now;

            mContext.Settings.Add(model);
            mContext.SaveChanges();

            return RedirectToAction("counter");
        }

        [Authorize(Roles = "Admin, Administration")]
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
        [HttpPost]
        public async Task<ActionResult> LoginAsync(string username, string password)
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            var result = await mSignInManager.PasswordSignInAsync(username, password, true, false);

            if (result.Succeeded)
            {
                var userData = mContext.Users.Where(s => s.UserName == username).ToList();
                var userRoleId = mContext.UserRoles.Where(s => s.UserId == userData[0].Id).ToList();
                var userRole = mContext.Roles.Where(s => s.Id == userRoleId[0].RoleId).ToList();

                return new JsonResult(new[] { userData[0].DisplayName, userRole[0].Name }, new JsonSerializerSettings());
            }

            return new JsonResult(new[] { "failed", "unregistered"}, new JsonSerializerSettings());
        }
        
        [Authorize]
        [Route("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            return new JsonResult(new[] { "failed", "unregistered" }, new JsonSerializerSettings());
        }
    }
}

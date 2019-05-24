using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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

        [HttpGet("[action]")]
        public IEnumerable<PostDataModel> GetGroupPosts()
        {
            var data = new List<PostDataModel>();
            //using (var context = new ApplicationDbContext())
            //{
            //    data = context.Settings.Where(s => s.Group == 36).ToList();
            //}

            data = mContext.Settings.Where(s => s.Group == 36).ToList();


            //var result = Enumerable.Range(1, 2).Select(index => new PostDataModel
            //{
            //    Id = data[0].Id,
            //    Title = data[0].Title,
            //    Content = data[0].Content,
            //    Image = data[0].Image,
            //    File = data[0].File
            //});

            var result = new List<PostDataModel>
            {
                new PostDataModel
                {
                    Id = data[0].Id,
                    Title = data[0].Title,
                    Content = data[0].Content,
                    Image = data[0].Image,
                    File = data[0].File
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
            
            //using (var context = new ApplicationDbContext())
            //{
            //    context.Settings.Add(model);
            //    context.SaveChanges();
            //}

            mContext.Settings.Add(model);
            mContext.SaveChanges();

            return RedirectToAction("counter");
        }

        [Authorize]
        [HttpPost]
        [Route("createuser")]
        public async Task<IActionResult> CreateUserAsync(string ok)
        {
            var result = await mUserManager.CreateAsync(new ApplicationUser
            {
                UserName = "firas",
                Email = "firas@abv.bg"
            }, "pass");

            if (result.Succeeded)
                return Content("User was created", "text/html");

            return Content("User creation failed", "text/html");
        }

        [Route("login")]
        public async Task<IActionResult> LoginAsync(string returnUrl)
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            var result = await mSignInManager.PasswordSignInAsync("firas", "pass", true, false);

            if (result.Succeeded)
                return Redirect("/createpost");

            return Content("Failed to login", "text/html");
        }

        [Route("logout")]
        public async Task<IActionResult> LogoutAsync()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            return Content("logged out");
        }
    }
}

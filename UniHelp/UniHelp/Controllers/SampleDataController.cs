using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace UniHelp.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
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
            using (var context = new ApplicationDbContext())
            {
                data = context.Settings.Where(s => s.Group == 39).ToList();
            }

            var result = Enumerable.Range(1, 2).Select(index => new PostDataModel
            {
                Id = data[0].Id,
                Title = data[0].Title,
                Content = data[0].Content,
                Image = data[0].Image,
                File = data[0].File
            });

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
            
            using (var context = new ApplicationDbContext())
            {
                context.Settings.Add(model);
                context.SaveChanges();
            }

            return RedirectToAction("counter");
        }
    }
}

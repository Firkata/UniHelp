using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace UniHelp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Use when initially creating database
            //using (var context = new ApplicationDbContext())
            //{
            //    context.Database.EnsureCreated();
            //}

            // Comment when initially creating database
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer("Server=.;Database=unihelp;Trusted_Connection=True;MultipleActiveResultSets=true;"));

            // AddIdentity adds cookie based authentication
            // Adds scoped classes for things like UserManager, SignInManager, PasswordHashers etc...
            // Auto adds the validated user from a cookie to the HttpContext.User
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddDefaultUI()
                // Adds a provider that generates unique keys and hashes for things like
                // forgot password links, phone number verification codes etc..
                .AddDefaultTokenProviders()
                // Adds UserStore and RoleStore from this context
                // That are consumed by the UserManager and RoleManager
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.Configure<IdentityOptions>(options => 
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 2;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
            });

            // Change login url and cookie timeout
            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/login";
                options.ExpireTimeSpan = TimeSpan.FromDays(1); 
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        private async Task CreateUserRoles(IServiceProvider serviceProvider)
        {
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            IdentityResult adminResult;
            IdentityResult staffResult;

            var checkAdmin = await RoleManager.RoleExistsAsync("Admin");
            var checkAdministration = await RoleManager.RoleExistsAsync("Administration");
            var checkTeacher = await RoleManager.RoleExistsAsync("Teacher");
            var checkStudent = await RoleManager.RoleExistsAsync("Student");

            if (!checkAdmin)
                adminResult = await RoleManager.CreateAsync(new IdentityRole("Admin"));
            if (!checkAdministration)
                staffResult = await RoleManager.CreateAsync(new IdentityRole("Administration"));
            if (!checkTeacher)
                staffResult = await RoleManager.CreateAsync(new IdentityRole("Teacher"));
            if (!checkStudent)
                staffResult = await RoleManager.CreateAsync(new IdentityRole("Student"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IServiceProvider services)
        {
            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            // Comment when initially creating database
            CreateUserRoles(services).Wait();
        }
    }
}

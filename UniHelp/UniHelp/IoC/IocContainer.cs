using Microsoft.Extensions.DependencyInjection;

namespace UniHelp
{
    public static class IoC
    {
        public static ApplicationDbContext ApplicationDbContext => IocContainer.Provider.GetService<ApplicationDbContext>();
    }

    public static class IocContainer
    {
        public static ServiceProvider Provider { get; set; }
    }
}

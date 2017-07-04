using Altai.AppHost.Extensions;
using Altai.Configuration.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TheMasterChannel
{
    public class Startup
  {
    private IConfigurationRoot _config { get; set; }

    public Startup(IHostingEnvironment hostingEnv)
    {
      _config = new ConfigurationBuilder().AddAltaiConfiguration(hostingEnv).Build();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddAltai(_config);
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseAltai(_config);
    }
  }
}
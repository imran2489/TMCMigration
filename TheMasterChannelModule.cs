using Altai.Core;
using Microsoft.Extensions.DependencyInjection;
using TheMasterChannel.Business;

namespace TheMasterChannel
{
    public class TheMasterChannelModule : IAltaiModule
    {

        public void Startup()
        {

        }

        public void ConfigureServices(IServiceCollection servives)
        {
            servives.AddScoped<CourseContentHistoryManager>();
        }


    }
}

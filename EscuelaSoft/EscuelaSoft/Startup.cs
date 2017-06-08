using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EscuelaSoft.Startup))]
namespace EscuelaSoft
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}

using SuggestASong.Services;
using System.Threading.Tasks;
using System.Web.Http;

namespace SuggestASong.Controllers
{
    public class ControllerBase : ApiController
    {
        protected SpotifyService spotifySvc;
        public ControllerBase()
        {
            spotifySvc = new SpotifyService();
        }
    }
}
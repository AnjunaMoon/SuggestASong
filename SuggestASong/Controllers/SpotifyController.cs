using System;
using System.Collections.Generic;
using System.Linq;
using SuggestASong.Services;
using System.Threading.Tasks;
using System.Web.Http;
using SuggestASong.Models;

namespace SuggestASong.Controllers
{
    [RoutePrefix("api/spotify")]
    public class SpotifyController : ControllerBase
    {
		[HttpPost]
		[Route("albums")]
		public async Task<SearchAlbumCollection> SearchAlbums([FromBody]SpotifyFilter filter)
		{
			var albums = await spotifySvc.SearchAlbums(filter);
			return albums;
		}

		[HttpPost]
        [Route("artists")]
        public async Task<SearchArtistCollection> SearchArtists([FromBody]SpotifyFilter filter)
        {
			var artists =  await spotifySvc.SearchArtists(filter);
			return artists;
        }

		[HttpPost]
		[Route("tracks")]
		public async Task<SearchTrackCollection> SearchTracks([FromBody]SpotifyFilter filter)
		{

			var tracks = await spotifySvc.SearchTracks(filter);
			return tracks;
		}
	}


}

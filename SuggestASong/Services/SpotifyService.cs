using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SuggestASong.Models;
using System.Threading.Tasks;
using System.Text;

namespace SuggestASong.Services
{
    public class SpotifyService
    {
        private SpotifyApiClient apiClient;
        public SpotifyService()
        {
            apiClient = new SpotifyApiClient();
        }
		
		/// <summary>
		/// Create query based on filter and return result in form of Artists
		/// </summary>
		/// <param name="filter"></param>
		/// <returns></returns>
		public async Task<SearchArtistCollection> SearchArtists(SpotifyFilter filter)
        {
			var artists = await apiClient.SearchAsync<SearchArtistResponse>(filter.Type.ToString(), CreateQuery(filter));
            return artists.Artists;
        }
		/// <summary>
		/// Create query based on filter and return result in form of Albums
		/// </summary>
		/// <param name="filter"></param>
		/// <returns></returns>
		public async Task<SearchAlbumCollection> SearchAlbums(SpotifyFilter filter)
		{
			var albums = await apiClient.SearchAsync<SearchAlbumResponse>(filter.Type.ToString(), CreateQuery(filter));

			return albums.Albums;
		}
		/// <summary>
		/// Create query based on filter and return result in form of Tracks
		/// </summary>
		/// <param name="filter"></param>
		/// <returns></returns>
		public async Task<SearchTrackCollection> SearchTracks(SpotifyFilter filter)
		{
			var tracks = await apiClient.SearchAsync<SearchTrackResponse>(filter.Type.ToString(), CreateQuery(filter));

			return tracks.Tracks;
		}

		/// <summary>
		/// Creates a query for Spotify Search-method
		/// based on search-parameters to be both included and 
		/// excluded from result.
		/// </summary>
		/// <param name="filter"></param>
		/// <returns>Query to be appended to the search-uri</returns>
		private string CreateQuery(SpotifyFilter filter)
        {
            StringBuilder q = new StringBuilder("");
            var filters = new Dictionary<string, string>();

            filter.IncludeFilters.ForEach(flt =>
            {
                flt.Type = flt.Type.ToLower();
                if (!filters.ContainsKey(flt.Type))
                    filters.Add(flt.Type, flt.Keyword);
                else
                    filters[flt.Type] += $" OR {flt.Keyword}";

            });

            filter.ExcludeFilters?.ForEach(flt =>
            {
                flt.Type = flt.Type.ToLower();
                if (!filters.ContainsKey(flt.Type))
                    filters.Add(flt.Type, $" NOT {flt.Keyword}");
                else
                    filters[flt.Type] += $" NOT {flt.Keyword}";

            });

            filters.Keys.ToList().ForEach(f =>
            {
                q.Append($"{f}:{filters[f]} ");
            });

            if(!filter.AllDates)
                if (filter.From > 1800)
                {
                    q.Append($" year:{filter.From}");
                    if (filter.To > filter.From)
                        q.Append($"-{filter.From}");
                }else
                    q.Append($"tag:new");
            
            return q.ToString().TrimEnd(' ');
        }

    }
}
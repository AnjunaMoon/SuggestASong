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


        public async Task<SearchArtistCollection> SearchArtists(SpotifyFilter filter)
        {
            var artists = await apiClient.SearchAsync<SearchArtistResponse>(filter.Type.ToString(), CreateQuery(filter));

            return artists.Artists;
        }
        public async Task<SearchAlbumCollection> SearchAlbums(SpotifyFilter filter)
        {
            var albums = await apiClient.SearchAsync<SearchAlbumResponse>(filter.Type.ToString(), CreateQuery(filter));

            return albums.Albums;
        }
        public async Task<SearchTrackCollection> SearchTracks(SpotifyFilter filter)
        {
            var tracks = await apiClient.SearchAsync<SearchTrackResponse>(filter.Type.ToString(), CreateQuery(filter));
 
            return tracks.Tracks;
        }

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
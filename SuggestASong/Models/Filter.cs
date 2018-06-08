using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace SuggestASong.Models
{
    public enum FilterTypes { Any, Albums,Artists, Tracks }
    public class SpotifyFilter
    {
        public SpotifyFilter() { }
        public FilterTypes Type { get; set; }
        public bool AllDates{ get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public List<SpotifySubfilter> IncludeFilters { get; set; }
        public List<SpotifySubfilter> ExcludeFilters { get; set; }

        public List<string> GetGenres()
        {
            return IncludeFilters.Where(f => f.Type.ToLower() == "genre").Select(f => f.Keyword).ToList();
        }
    }

    public class SpotifySubfilter
    {
        public SpotifySubfilter() { }
        public string Type { get; set; }
        public string Keyword { get; set; }
    }

    public class SearchCollection
    {
        [JsonProperty("href")]
        public string Href { get; set; }

        [JsonProperty("limit")]
        public int Limit { get; set; }

        [JsonProperty("next")]
        public object Next { get; set; }

        [JsonProperty("offset")]
        public int Offset { get; set; }

        [JsonProperty("previous")]
        public object Previous { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }
    }
}
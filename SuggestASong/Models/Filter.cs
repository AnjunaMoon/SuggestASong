using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace SuggestASong.Models
{
    public enum FilterTypes { Any, Album,Artist, Track }
    public class SpotifyFilter
    {
        public SpotifyFilter() { }
		// Type of objects to return
        public FilterTypes Type { get; set; }
		// Get objects from all release-dates (applies to albums+tracks)
		public bool AllDates{ get; set; }
		// Get objects with release-dates from this year (applies to albums+tracks)
		public int From { get; set; }
		// Get objects with release-dates up to this year (applies to albums+tracks)
		public int To { get; set; }
		// Subfilters that should be used while searching
		public List<SpotifySubfilter> IncludeFilters { get; set; }
		// Subfilters indicating which of found results should be excluded
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
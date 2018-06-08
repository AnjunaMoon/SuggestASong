using System.Collections.Generic;
using Newtonsoft.Json;

namespace SuggestASong.Models
{
    public class SearchTrackResponse
    {
        [JsonProperty("tracks")]
        public SearchTrackCollection Tracks { get; set; }
    }

    public class SearchTrackCollection : SearchCollection
    {
        [JsonProperty("items")]
        public IList<Track> Items { get; set; }
    }

    public class Track
    {
        [JsonProperty("album")]
        public AlbumSimplified Album{ get; set; }
        [JsonProperty("artists")]
        public List<ArtistSimplified> Artists { get; set; }
        [JsonProperty("available_markets")]
        public List<string> Available_Markets { get; set; }
        [JsonProperty("external_ids")]
        public KeyValuePair<string, string> ExternalIds { get; set; }
        [JsonProperty("duration_ms")]
        public int DurationMs{ get; set; }
        [JsonProperty("external_urls")]
        public ExternalUrls ExternalUrls { get; set; }
        [JsonProperty("href")]
        public string Href { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("is_playable")]
        public bool IsPlayable { get; set; }
        [JsonProperty("linked_from")]
        public Track LinkedFrom { get; set; }
        [JsonProperty("restrictions")]
        public Restrictions Restrictions { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("popularity")]
        public int Popularity { get; set; }
        [JsonProperty("preview_url")]
        public string PreviewUrl { get; set; }
        [JsonProperty("track_number")]
        public int TrackNumber { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("uri")]
        public string Uri { get; set; }
    }
}
using System.Collections.Generic;
using Newtonsoft.Json;

namespace SuggestASong.Models
{
    public class SearchAlbumResponse
    {
        [JsonProperty("albums")]
        public SearchAlbumCollection Albums { get; set; }
    }

    public class SearchAlbumCollection : SearchCollection
    {
        [JsonProperty("items")]
        public IList<Album> Items { get; set; }
    }

    public class Album : IGenres
    {
        [JsonProperty("album_type")]
        public string AlbumType { get; set; }
        [JsonProperty("artists")]
        public List<ArtistSimplified> Artists { get; set; }
        [JsonProperty("available_markets")]
        public List<string> AvailableMarkets { get; set; }
        [JsonProperty("copyrights")]
        public List<Copyright> Copyrights { get; set; }
        [JsonProperty("external_ids")]
        public KeyValuePair<string, string> ExternalIds { get; set; }
        [JsonProperty("external_urls")]
        public ExternalUrls ExternalUrls { get; set; }
        [JsonProperty("genres")]
        public List<string> Genres { get; set; }
        [JsonProperty("href")]
        public string Href { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("images")]
        public List<Image> Images { get; set; }
        [JsonProperty("label")]
        public string Label { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("popularity")]
        public int Popularity { get; set; }
        [JsonProperty("release_date")]
        public string ReleaseDate { get; set; }
        [JsonProperty("release_date_precision")]
        public string ReleaseDatePrecision { get; set; }
        [JsonProperty("tracks")]
        public SearchTrackCollection Tracks { get; set; }
        [JsonProperty("restrictions")]
        public Restrictions Restrictions { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("uri")]
        public string Uri { get; set; }



    }
    public class AlbumSimplified
    {
        [JsonProperty("album_group")]
        public string AlbumGroup { get; set; }
        [JsonProperty("album_type")]
        public string AlbumType { get; set; }
        [JsonProperty("artists")]
        public List<ArtistSimplified> Artists { get; set; }
        [JsonProperty("available_markets")]
        public List<string> AvailableMarkets { get; set; }
        [JsonProperty("external_urls")]
        public ExternalUrls ExternalUrls { get; set; }
        [JsonProperty("href")]
        public string Href { get; set; }
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("images")]
        public List<Image> Images { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("release_date")]
        public string ReleaseDate { get; set; }
        [JsonProperty("release_date_precision")]
        public string ReleaseDatePrecision { get; set; }
        [JsonProperty("restrictions")]
        public Restrictions Restrictions { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
        [JsonProperty("uri")]
        public string Uri { get; set; }



    }
    public class Restrictions
    {
        public string Reason { get; set; }
    }
    public class Copyright
    {
        [JsonProperty("text")]
        public string Text { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
    }


}
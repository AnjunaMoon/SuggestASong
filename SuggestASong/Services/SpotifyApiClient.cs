﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Caching;
using System.Security.Authentication;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using SuggestASong.Models;
using Newtonsoft.Json;
using Flurl;


namespace SuggestASong.Services
{
    public class SpotifyApiClient
    {
		private HttpClient httpClient;
		private const string ClientId = "996d0037680544c987287a9b0470fdbb";
		private const string ClientSecret = "5a3c92099a324b8f9e45d77e919fec13";
        private const string BaseUrl = "https://api.spotify.com/";

        public SpotifyApiClient()
        {
            httpClient = GetClient();
        }

        private HttpClient GetClient()
        {
            var authHandler = new SpotifyAuthClientCredentialsHttpMessageHandler(
                ClientId,
                ClientSecret,
                new HttpClientHandler());

			return new HttpClient(authHandler) { BaseAddress = new Uri(BaseUrl) };
        }

        public async Task<T> SearchAsync<T>(string type, string query, int? limit = null, int? offset = null) where T:class
        {
            var url = new Url("/v1/search");
            url = url.SetQueryParam("q", query.ToLower());
			url = url.SetQueryParam("type", type.ToLower().TrimEnd('s'));

            if (limit != null)
                url = url.SetQueryParam("limit", limit);

            if (offset != null)
                url = url.SetQueryParam("offset", offset);

            var response = await httpClient.GetStringAsync(url);
            var genericResponse = JsonConvert.DeserializeObject<T>(response);
            return genericResponse as T;
        }
    }
	public class SpotifyAuthClientCredentialsHttpMessageHandler : DelegatingHandler
    {
        private const string AuthenticationEndpoint = "https://accounts.spotify.com/api/token";
        private readonly string _clientId;
        private readonly string _clientSecret;

        public SpotifyAuthClientCredentialsHttpMessageHandler(string clientId, string clientSecret, HttpMessageHandler httpMessageHandler) : base(httpMessageHandler)
        {
            _clientId = clientId;
            _clientSecret = clientSecret;
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.Headers.Authorization == null)
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", await GetAuthenticationTokenAsync());
            }

			return await base.SendAsync(request, cancellationToken);
        }

        private async Task<string> GetAuthenticationTokenAsync()
        {
            var cacheKey = "SpotifyWebApiSession-Token" + _clientId;

            var token = MemoryCache.Default.Get(cacheKey) as string;

            if (token == null)
            {
                var timeBeforeRequest = DateTime.Now;

                var response = await GetAuthenticationTokenResponse();

                token = response?.AccessToken;
                if (token == null)
                    throw new AuthenticationException("Spotify authentication failed");

                var expireTime = timeBeforeRequest.AddSeconds(response.ExpiresIn);

                MemoryCache.Default.Set(cacheKey, token, new DateTimeOffset(expireTime));
            }
            return token;
        }

        private async Task<AuthenticationResponse> GetAuthenticationTokenResponse()
        {
            var client = new HttpClient();

            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("grant_type", "client_credentials")
                //new KeyValuePair<string, string>("scope", "")
            });

            var authHeader = BuildAuthHeader();

            var requestMessage = new HttpRequestMessage(HttpMethod.Post, AuthenticationEndpoint);
            requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Basic", authHeader);
            requestMessage.Content = content;

            var response = await client.SendAsync(requestMessage);
            var responseString = await response.Content.ReadAsStringAsync();

            var authenticationResponse = JsonConvert.DeserializeObject<AuthenticationResponse>(responseString);
            return authenticationResponse;
        }
        private string BuildAuthHeader()
        {
            return Base64Encode(_clientId + ":" + _clientSecret);
        }

        private string Base64Encode(string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }
    }
}


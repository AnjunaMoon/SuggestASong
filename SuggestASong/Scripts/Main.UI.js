var Main = Main || {};

Main.UI = {

	showResults: function (filter, data) {
		switch (filter.type) {
			case "artist":
				this.showArtists(data);
				break;
			case "album":
				this.showAlbums(data);
				break;
			case "track":
				this.showTracks(data);
				break;
			default:
				return;
		}
	},
	addRow: function (type) {
		var cls = "asnRow";
		switch (type) {
			case 0:
				cls = "asnRow";
				break;
			case 1:
				cls = "asnRowAlt";
				break;
			case 2:
				cls = "asnRowHead";
				break;
			default:
				cls = "asnRow";
		}
		return $('<div/>', {
			'class': cls
		});
	},
	addCell: function (content, click, width) {
		var cssClass = "asnCell";
		if (click != null)
			cssClass += " asnLnk";
		return $('<span/>', {
			'class': cssClass
		}).on('click', click).html(content).width(width);

	},
	addCellHead: function (content, width) {
		return $('<span/>', {
			'class': 'asnCellHead'
		}).html(content).width(width);

	},
	addImage: function (href) {
		return $('<img>', {
			'src': href
		});
	},
	showArtists: function (data) {
		var _self = this;

		var html = ' <div style="float:left"><span></span></div>';

		var head = this.addRow(2);
		$(head).append(this.addCellHead("&nbsp;", 40)).append(this.addCellHead("Artist", 120)).append(this.addCellHead("Genres", 120)).append(this.addCellHead("Spotify", 40)).append(this.addCellHead("Browser", 40));
		$(head).append(this.addCellHead("&nbsp;", 120))
		$("#asnResult").append(head);

		$.each(data.items, function (i, d) {
			var row = _self.addRow(i % 2);
			d.genres = d.genres || [];
			d.images = d.images || [];

			var url = "noimg.png";
			if (d.images.length > 0)
				url = d.images[0].url;
			$(row).append(_self.addCell("<img src='" + url + "' class='asnImg' />", null));
			$(row).append(_self.addCell(d.name, null, 120));
			$(row).append(_self.addCell($.unique(d.genres).join(", "), null, 120));
			$(row).append(_self.addCell("<img src='spotify.png' class='asnImg' />", function () { window.open(d.uri); }, 40));
			$(row).append(_self.addCell("<img src='spotifyweb.png' class='asnImg' />", function () { window.open(d.external_urls.spotify); }, 40));

			$("#asnResult").append(row);
		});
	},
	showAlbums: function (data) {
		var _self = this;

		var html = ' <div style="float:left"><span></span></div>';

		var head = this.addRow(2);
		$(head).append(this.addCellHead("&nbsp;", 40)).append(this.addCellHead("Album", 120)).append(this.addCellHead("Genres", 120)).append(this.addCellHead("Spotify", 40)).append(this.addCellHead("Browser", 40));
		$(head).append(this.addCellHead("Artist", 120)).append(this.addCellHead("Released", 90));
		$(head).append(this.addCellHead("&nbsp;", 40))
		$("#asnResult").append(head);

		$.each(data.items, function (i, d) {
			var row = _self.addRow(i % 2);
			d.genres = d.genres || [];
			d.images = d.images || [];
			var url = "noimg.png";
			if (d.images.length > 0)
				url = d.images[0].url;
			$(row).append(_self.addCell("<img src='" + url + "' class='asnImg' />", null));
			$(row).append(_self.addCell(d.name, null, 120));
			$(row).append(_self.addCell($.unique(d.genres).join(", "), null, 120));
			$(row).append(_self.addCell("<img src='spotify.png' class='asnImg' />", function () { window.open(d.uri); }, 40));
			$(row).append(_self.addCell("<img src='spotifyweb.png' class='asnImg' />", function () { window.open(d.external_urls.spotify); }, 40));
			$(row).append(_self.addCell(d.artists[0].name, null, 120));
			$(row).append(_self.addCell(d.release_date, null, 90));
			var a = 1;
			$("#asnResult").append(row);
		});
	},
	showTracks: function (data) {
		var _self = this;

		var html = ' <div style="float:left"><span></span></div>';

		var head = this.addRow(2);
		$(head).append(this.addCellHead("&nbsp;", 40)).append(this.addCellHead("Track", 120)).append(this.addCellHead("Artist", 120)).append(this.addCellHead("Album", 120)).append(this.addCellHead("Spotify", 40)).append(this.addCellHead("Browser", 40));
		$(head).append(this.addCellHead("Released", 90)).append(this.addCellHead("Duration", 60));
		$(head).append(this.addCellHead("&nbsp;", 40))
		$("#asnResult").append(head);

		$.each(data.items, function (i, d) {
			var row = _self.addRow(i % 2);
			d.images = d.images || [];
			d.album.genres = d.album.genres || [];
			var url = "noimg.png";
			if (d.images.length > 0)
				url = d.images[0].url;
			$(row).append(_self.addCell("<img src='" + url + "' class='asnImg' />", null));
			$(row).append(_self.addCell(d.name, null, 120));
			$(row).append(_self.addCell(d.artists[0].name, null, 120));
			$(row).append(_self.addCell(d.album.name, null, 120));
			$(row).append(_self.addCell("<img src='spotify.png' class='asnImg' />", function () { window.open(d.uri); }, 40));
			$(row).append(_self.addCell("<img src='spotifyweb.png' class='asnImg' />", function () { window.open(d.external_urls.spotify); }, 40));
			$(row).append(_self.addCell(d.album.release_date, null, 90));
			$(row).append(_self.addCell(_self.formatDuration(d.duration_ms), null, 60));

			$("#asnResult").append(row);
		});
	},
	formatDuration: function (s) {
		var ms = s % 1000;
		s = (s - ms) / 1000;
		var secs = s % 60;
		s = (s - secs) / 60;
		var mins = s % 60;

		return mins + 'm ' + secs + 's';
	}
};






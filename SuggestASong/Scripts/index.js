var Main = Main || {};


Main.UI = {

    showResults: function (filter, data) {
        switch (filter.type) {
            case "artists":
                this.showArtists(data);
                break;
            case "albums":
                this.showAlbums(data);
                break;
            case "tracks":
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
        var cssClass ="asnCell";
        if (click != null)
            cssClass+=" asnLnk";
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
            var row = _self.addRow(i%2);
            d.genres = d.genres || [];
            d.images = d.images || [];

            var url = "noimg.png";
            if (d.images.length > 0)
                url = d.images[0].url;
            $(row).append(_self.addCell("<img src='" + url + "' class='asnImg' />", null));
            $(row).append(_self.addCell(d.name, null,120));
            $(row).append(_self.addCell($.unique(d.genres).join(", "), null,120));
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
            var row = _self.addRow(i % 2 );
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
            $(row).append(_self.addCell(d.artists[0].name, null,120));
            $(row).append(_self.addCell(d.release_date, null,90));
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

        return mins + 'm ' + secs +'s';
    }
}

Main.Filtering = {
    currentIncFilters: [],
    currentExclFilters: [],

    search: function (filter) {
        if (filter.IncludeFilters.length === 0)
        {
            alert("At least one inclusion-filter is required.");
            return;
        }
        $.ajax({
            url: "api/spotify/"+filter.type,
            data: filter,
            type: "POST",
      
        })
            .success(function (data) {
                Main.UI.showResults(filter, data);
            })
            .error(function (a,b,c,d) {
                alert(c);
            });
    },
     


    setFilterClick: function (button, type, filterId, isInclusion) {
        var _self = this;
        $(button).click(function () {
            var val = $(filterId).val();
            var flt  = { "type": type, "keyword": val };
            var exists = $.grep(_self.currentIncFilters.concat(_self.currentExclFilters), function (n, i) { return flt.type == n.type && flt.keyword == n.keyword }, false) != "";
            if (val != "" && !exists) {
                _self.addFilter(type, val, isInclusion);
                if(isInclusion)
                    _self.currentIncFilters.push(flt);
                else
                    _self.currentExclFilters.push(flt);
            }
        });
    },
    addFilter: function (type, keyword, isIncluded) {
        var flt = $('<input/>').attr({
            type: "button",
            value: type + " : " + keyword,
            class: "btFilter"
        });
        $(flt).click(function () {
        });
        if (isIncluded)
            $("#asnIncFilters").append(flt);
        else
            $("#asnExclFilters").append(flt);

    },
    getSpotifyFilter: function () {
        var tp = $("#fltType option:selected").val().toLowerCase();
        if (tp == "any")
            tp = "artists, albums, tracks";
        var yearFrom = $("#fltFrom").val();
        var yearTo = $("#fltTo").val();
        var allDates = $('input[name="asnPeriod"]:checked').val() == 0;
        var filter = { type: tp, from: yearFrom, to: yearTo, alldates:allDates,  IncludeFilters: [], ExcludeFilters: [] };
        $.each(this.currentIncFilters, function (idx, flt) { filter.IncludeFilters.push(flt); });
        $.each(this.currentExclFilters, function (idx, flt) { filter.ExcludeFilters.push(flt); });
        return filter;
    },
    clear: function () {
        $("#asnIncFilters").empty();
        $("#asnExclFilters").empty();
        $("#asnResult").empty();
        $("#asnFilter").find("input[type=text]").val("");
        this.currentIncFilters = [];
        this.currentExclFilters = [];
    },
    init: function () {
        var _self = this;
        $("#asnSearch").button({
            icon: "ui-icon-search",
            iconPosition: "end"
        });
        $("#asnClear").button({
            icon: "ui-icon-close",
            iconPosition: "end"
        });
        $('input[name="asnPeriod"]').change(function () {
            var noPeriod = $('input[name="asnPeriod"]:checked').val() < 2;
            $(".asnPeriod").prop('disabled', noPeriod);
            if (noPeriod) $(".asnPeriod").val("");
        });

        this.setFilterClick("#asnIncAlbum", "Album", "#fltAlbum", true);
        this.setFilterClick("#asnExclAlbum", "Album", "#fltAlbum", false);
        this.setFilterClick("#asnIncArtist", "Artist", "#fltArtist", true);
        this.setFilterClick("#asnExclArtist", "Artist", "#fltArtist", false);
        this.setFilterClick("#asnIncTrack", "Track", "#fltTrack", true);
        this.setFilterClick("#asnExclTrack", "Track", "#fltTrack", false);
        this.setFilterClick("#asnIncGenre", "Genre", "#fltGenre", true);

        Main.Utils.disable(".asnPeriod");
        
        $("#asnSearch").click(function (event) {
            $("#asnResult").empty();
            var filter = _self.getSpotifyFilter();
            _self.search(filter);
        });
        $("#asnClear").click(function (event) {
            _self.clear();
        });
    },
}

Main.Utils = {
    disable: function (el) {
        $(el).attr("disabled", "disabled");
    },
    enable: function (el) {
        $(el).attr("disabled", "");
    },
}

$(document).ready(function () {
    Main.Filtering.init();
});





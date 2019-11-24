var Main = Main || {};

Main.Filtering = {
	currentIncFilters: [],
	currentExclFilters: [],
	search: function (filter) {
		if (filter.IncludeFilters.length === 0) {
			alert("At least one inclusion-filter is required.");
			return;
		}
		$.ajax({
			url: "api/spotify/" + filter.type + "s",
			data: filter,
			type: "POST",

		})
			.success(function (data) {
				Main.UI.showResults(filter, data);
			})
			.error(function (a, b, c, d) {
				alert(c);
			});
	},
	setFilterClick: function (button, type, filterId, isInclusion) {
		var _self = this;
		$(button).click(function () {
			var val = $(filterId).val();
			var flt = { "type": type, "keyword": val };
			var exists = $.grep(_self.currentIncFilters.concat(_self.currentExclFilters), function (n, i) { return flt.type == n.type && flt.keyword == n.keyword }, false) != "";
			if (val != "" && !exists) {
				_self.addFilter(type, val, isInclusion);
				if (isInclusion)
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
		if (tp === "any")
			tp = "artist, album, track";
		var yearFrom = $("#fltFrom").val();
		var yearTo = $("#fltTo").val();
		var allDates = $('input[name="asnPeriod"]:checked').val() == 0;
		var filter = { type: tp, from: yearFrom, to: yearTo, alldates: allDates, IncludeFilters: [], ExcludeFilters: [] };
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
	}
};

Main.Utils = {
	disable: function (el) {
		$(el).attr("disabled", "disabled");
	},
	enable: function (el) {
		$(el).attr("disabled", "");
	}
};
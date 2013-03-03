define([
		"backbone",
		"flowersList"
],
	function (Backbone) {
			var FlowerPreviewView = Backbone.View.extend({
					events: {
							"click .ac_close_black": "close"
					},

					initialize: function () {
							var view = this;
							view.render();
					},

					render: function () {
							var view = this,
								NUMBER_OF_COLUMNS = 4,
								$table = $("<table></table>"),
								$line = $("<tr></tr>"),
								index = 0;

							view.$el.append($table);
							_.each(Flowers.bouquetes, function (imgPath) {
									$line.append($("<td></td>", {
											class: "bouquet-item"
									}).append($("<img>", {
											src: "images/bouquetes/" + imgPath
									})));
									index++;
									if (index % NUMBER_OF_COLUMNS === 0) {
											$table.append($line);
											$line = $("<tr></tr>");
									}
							});
					},

					close: function () {
							this.$el.fadeOut();
					},

					open: function () {
							this.$el.fadeIn();
					}
			});

			return FlowerPreviewView;
	});
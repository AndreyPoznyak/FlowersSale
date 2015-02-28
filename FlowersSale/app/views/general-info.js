define([
		"backbone",
		"text!app/templates/general-info.html"
],
	function (Backbone, template) {
			var GeneralInfoView = Backbone.View.extend({
					events: {
							"click .ac_close_black": "close"
					},

					initialize: function () {
							var view = this;
							view.render();
					},

					render: function () {
							var view = this;
                        view.$el.html(template);
					},

					close: function () {
							$(".dark-mask").fadeOut();
							this.$el.fadeOut();
					},

					open: function () {
							$(".dark-mask").fadeIn();
							this.$el.fadeIn();
					}
			});

			return GeneralInfoView;
	});
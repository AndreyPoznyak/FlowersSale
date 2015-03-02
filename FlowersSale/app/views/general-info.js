define([
		"backbone",
		"text!app/templates/general-info.html"
],
	function (Backbone, template) {
			var GeneralInfoView = Backbone.View.extend({
					events: {
							"click .ac_close_black": "close",
						"click .get-banner": "getBanner"
					},

					initialize: function (options) {
							this.render();
						this.userForm = options.userForm;
					},

					render: function () {
							var view = this;
                        view.$el.html(template);
					},

				getBanner: function () {
					this.close();
					this.userForm.open();
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
define(["backbone"],
	function (Backbone) {
			var BasketView = Backbone.View.extend({

					template: $("#basket-template"),

					events: {
							"click .ac_close_black": "close"
					},

					initialize: function () {
							view.listenTo(view.model, "change:opened", function (event, opened) {
									if (opened === true) {
											view.$el.show();
											$(".dark-mask").show();
									} else {
											view.$el.hide();
											$(".dark-mask").hide();
									}
							});
					},

					render: function () {
							view.$el.html(view.template.html());
					},

					close: function () {
							this.model.set("opened", false);
					}
			});

			return BasketView;
	});
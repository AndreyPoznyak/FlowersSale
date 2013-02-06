define([
		"backbone",
		"app/views/basket-item",
		"js/jquery.tinyscrollbar.min"
],
	function (Backbone, BasketItemView) {
			var BasketView = Backbone.View.extend({

					template: $("#basket-template"),

					basketItemsById: {},

					events: {
							"click .ac_close_black": "close"
					},

					initialize: function () {
							var view = this;
							view.listenTo(view.model, "change:opened", function (event, opened) {
									if (opened === true) {
											view.$el.fadeIn();
											$(".dark-mask").fadeIn();
											view.$el.find(".basket-long-content").tinyscrollbar();
											view.$el.find(".basket-long-content").tinyscrollbar_update("relative");
									} else {
											view.$el.fadeOut();
											$(".dark-mask").fadeOut();
									}
							});

							view.listenTo(view.model.get("ordersCollection"), "add", function (order) {
									var $itemNode = $("<tr></tr>", {
											id: "item" + order.id
									});
									view.$el.find(".basket-items-table-body").append($itemNode);
									var itemView = new BasketItemView({
											model: order,
											el: $itemNode
									});
									view.basketItemsById[order.id] = itemView;
							});

							view.listenTo(view.model.get("ordersCollection"), "remove", function (order) {
									view.$el.find(".basket-items-table-body").children("#" + "item" + order.id).remove();
									delete view.basketItemsById[order.id];
									view.$el.find(".basket-long-content").tinyscrollbar_update("relative");
							});
							view.render();
					},

					render: function () {
							var view = this;
							view.$el.html(view.template.html());
					},

					close: function () {
							this.model.set("opened", false);
					}
			});

			return BasketView;
	});
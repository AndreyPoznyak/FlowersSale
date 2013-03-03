define([
		"backbone",
		"app/views/basket-item",
		"text!app/templates/basket.htm"
],
	function (Backbone, BasketItemView, template) {
			var BasketView = Backbone.View.extend({
					basketItemsById: {},
					userInfoWasEntered: false,
					userInfoIsValid: false,

					events: {
							"click .ac_close_black": "close",
							"click .basket-checkout-button": "onCheckoutClick"
					},

					initialize: function () {
							var view = this;
							view.listenTo(view.model, "change:opened", function (event, opened) {
									if (opened === true) {
											view.$el.fadeIn();
											$(".dark-mask").fadeIn();
											//view.$el.find(".basket-long-content").tinyscrollbar_update("relative");
									} else {
											view.$el.fadeOut();
											$(".dark-mask").fadeOut();
									}
							});

							view.listenTo(view.model, "change:totalPrice", function (event, price) {
									view.$el.find(".basket-total-price").text(view.model.get("totalPrice"));
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
									//view.$el.find(".basket-long-content").tinyscrollbar_update("relative");
							});
							view.render();
					},

					render: function () {
							var view = this;
							view.$el.html(template);
							//_.bindAll(view, view.checkInfo);
					},

					checkInfo: function () {
							var view = this;
							if (view.$el.find(".basket-user-name").val().length > 2 && view.$el.find(".basket-user-phone-number").val().length > 6) {
									view.userInfoWasEntered = true;
									view.onCheckoutClick();
							}
					},

					onCheckoutClick: function () {
							var view = this,
								$box = view.$el.find(".basket-order-completed");

							if (view.userInfoWasEntered === false) {
									view.$el.find(".basket-user-info").fadeIn();
									view.$el.find(".basket-checkout-button").children("span").text("Подтвердить");
									view.checkInfo();
							} else {
									view.$el.find(".basket-checkout-button")
									$box.fadeIn();
									view.$el.find(".basket-checkout-button").children("span").text("Оформить заказ");
									view.$el.find(".basket-user-info").fadeOut();
									view.model.sendOrder(view.$el.find(".basket-user-name").val(), view.$el.find(".basket-user-phone-number").val()).done(function () {
											$box.children("span").removeClass("basket-loading-icon").text("Заказ зарегестрирован успешно.");
											$box.fadeOut({
													duration: 4000,
													complete: function () {
															view.close();
													}
											});
											//console.log("ordered successfully");
									}).fail(function () {
											$box.children("span").removeClass("basket-loading-icon").text("Заказ зарегестрирован неуспешно.");
											$box.fadeOut({
													duration: 4000,
													complete: function () {
															view.close();
													}
											});
											//console.log("order denied");
									});
									view.userInfoWasEntered = false;
									//view.$el.find(".basket-checkout-button").bind("click", view.onCheckoutClick);
							}
					},

					close: function () {
							this.model.set("opened", false);
					}
			});

			return BasketView;
	});
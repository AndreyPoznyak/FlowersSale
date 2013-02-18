define([
		"backbone",
		"app/models/flower-order-item"
],
	function (Backbone, FlowerOrder) {
			var BaksetModel = Backbone.Model.extend({
					defaults: {
							opened: false,
							ordersCollection: null,
							ordersCount: 0,
							totalPrice: 0
					},

					initialize: function () {
							var model = this;
							var coll = Backbone.Collection.extend({
									model: FlowerOrder
							});

							model.set({
									ordersCollection: new coll()
							});
					},

					addOrder: function (order) {
							var model = this,
								ordersCount = model.get("ordersCount"),
								totalPrice = model.get("totalPrice");

							ordersCount++;

							var newOrder = new FlowerOrder({
									id: ordersCount,
									name: order.name,
									type: order.type,
									quantity: order.quantity,
									color: order.color,
									length: order.length,
									price: parseInt(order.price)
							});

							totalPrice += parseInt(order.price) * order.quantity;

							model.listenTo(newOrder, "removeItem", function () {
									var ordersCount = model.get("ordersCount"),
												totalPrice = model.get("totalPrice");

									totalPrice -= newOrder.get("price") * newOrder.get("quantity");
									ordersCount--;
									model.get("ordersCollection").remove(newOrder.id);
									model.set({
											ordersCount: ordersCount,
											totalPrice: totalPrice
									});
									if (ordersCount === 0) {
											model.set({
													opened: false
											});
									}
							});

							model.set({
									ordersCount: ordersCount,
									totalPrice: totalPrice
							});
							model.get("ordersCollection").add(newOrder);
					},

					sendOrder: function () {
							var model = this,
							def = new $.Deferred();
							$.ajax({
									type: 'POST',
									url: "/OrdersMailService.svc/SendMail",
									async: true,
									data: model.getOrderData(),
									dataType: 'text',
									success: function (response) {
											if (response == "success") {
													def.resolve();
											} else {
													console.log(response);
													def.reject();
											}
									},
									error: function () {
											def.reject();
									}
							});
							model.get("ordersCollection").reset();
							return def.promise();
					},

					getOrderData: function () {
							var model = this,
								flowers = model.get("ordersCollection"),
								dataToSend = "";

							flowers.each(function (flower) {
									dataToSend += flower.get("type") + " " + flower.get("name") + " " +
									flower.get("quantity") + " " + flower.get("color") + "    ";
							});

							return dataToSend;
					}
			});
			return BaksetModel;
	});
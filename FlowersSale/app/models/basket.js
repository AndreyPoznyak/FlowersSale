define([
		"backbone",
		"app/models/flower-order-item"
],
	function (Backbone, FlowerOrder) {
			var BaksetModel = Backbone.Model.extend({
					defaults: {
							opened: false,
							ordersCollection: null,
							ordersCount: 0
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
								ordersCount = model.get("ordersCount");
							ordersCount++;

							var newOrder = new FlowerOrder({
									id: ordersCount,
									name: order.name,
									type: order.type,
									quantity: order.quantity,
									color: order.color,
									length: order.length,
									price: order.price
							});
							model.get("ordersCollection").add(newOrder);
							newOrder.on("removeItem", function () {
									model.get("ordersCollection").remove(newOrder.id);
							});
							model.set({
									ordersCount: ordersCount
							});
					}
			});
			return BaksetModel;
	});
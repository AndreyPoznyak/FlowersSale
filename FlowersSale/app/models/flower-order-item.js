define(["backbone"],
	function (Backbone) {
			var FlowerOrderItemModel = Backbone.Model.extend({
					defaults: {
							name: "",
							type: "",
							quantity: "",
							color: "",
							price: 0,
							length: 0
					},

					initialize: function () {
					}
			});

			return FlowerOrderItemModel;
	});
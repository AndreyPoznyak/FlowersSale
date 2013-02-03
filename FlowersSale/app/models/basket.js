define([
		"backbone",
],
	function (Backbone) {
			var BaksetModel = Backbone.Model.extend({
					defaults: {
							opened: false,
							ordersCollection: null
					},
					initialize: function () {
							var coll = Backbone.Collection.extend({
							});
					}
			});
			return BaksetModel;
	});
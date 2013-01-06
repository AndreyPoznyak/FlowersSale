define(["backbone"],
	function (Backbone) {
		var BaksetModel = Backbone.Model.extend({
				defaults: {
				},
				initialize: function () {
						console.log("basket model init");
				}
		});
		return BaksetModel;
});
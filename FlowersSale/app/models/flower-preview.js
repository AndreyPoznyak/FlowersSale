define(["backbone"],
	function (Backbone) {
			var FlowerPreviewModel = Backbone.Model.extend({
					defaults: {
						flowerName: "",
						opened: true
					},
					initialize: function () {
							console.log("preview model init");
					}
			});
			return FlowerPreviewModel;
	});
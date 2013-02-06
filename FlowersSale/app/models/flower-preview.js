define(["backbone"],
	function (Backbone) {
			var FlowerPreviewModel = Backbone.Model.extend({
					defaults: {
							flowerName: "",
							flowerType: "",
							opened: false
					},
					initialize: function () {
					}
			});
			return FlowerPreviewModel;
	});
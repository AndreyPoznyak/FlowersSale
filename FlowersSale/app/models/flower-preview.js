define(["backbone"],
	function (Backbone) {
			var FlowerPreviewModel = Backbone.Model.extend({
					defaults: {
							flowerName: "",
							flowerType: "",
							opened: false
					},
					initialize: function () {
							//console.log("preview model init");
					}
			});
			return FlowerPreviewModel;
	});
define([
		"backbone",

		"app/models/basket",
		"app/models/flower-preview",

		"flowersList"
], function (Backbone, BasketModel, PreviewModel) {

		var userBasket = new BasketModel;
		var previewModel = new PreviewModel;

		var $rosesList = $(".roses").children(".ac_subitem").children(".flowers-list");
		_.each(Flowers.roses, function (rose) {
				$rosesList.append($("<li></li>", {
						text: rose.name
				}).bind({
						click: function () {
								//console.log(rose.name);
								previewModel.set({
										flowerName: rose.name,
										opened: true
								});
						}
				}));
		});
});
define([
		"backbone",

		"app/models/basket",
		"app/models/flower-preview",

		"app/views/basket",
		"app/views/flower-preview",

		"flowersList"
], function (Backbone, BasketModel, PreviewModel, BasketView, PreviewView) {

		var userBasketModel = new BasketModel,
				userBasketView = new BasketView({
						model: userBasketModel,
						el: $(".basket-content")
				});

		var previewModel = new PreviewModel,
				previewView = new PreviewView({
						model: previewModel,
						el: $(".flower-preview-content")
				});

		previewModel.on("addItemToBasket", function (info) {
				userBasketModel.addOrder($.extend(info, {
						name: previewModel.get("flowerName"),
						type: previewModel.get("flowerType"),
						price: previewModel.get("flowerInfo").price
				}));
		});

		$(".basket-open-button").bind({
				click: function () {
						userBasketModel.set({
								opened: true
						});
				}
		});

		//filling menus for flowers item calling
		var $rosesList = $(".roses").children(".ac_subitem").children(".flowers-list");
		_.each(Flowers.roses, function (rose) {
				$rosesList.append($("<li></li>", {
						text: rose.name
				}).bind({
						click: function (event) {
								previewModel.set({
										flowerName: rose.name,
										flowerInfo: rose,
										flowerType: $(event.currentTarget).parent().parent().parent().attr("class"),
										opened: true
								});
						}
				}));
		});
});
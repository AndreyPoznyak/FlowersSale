﻿define([
		"backbone",

		"app/models/basket",
		"app/models/flower-preview",

		"app/views/basket",
		"app/views/flower-preview",

		"flowersList"
], function (Backbone, BasketModel, PreviewModel, BasketView, PreviewView) {

		var flowersNames = {};

		flowersNames["roses"] = _.pluck(Flowers.roses, "name");
		flowersNames["tulips"] = _.pluck(Flowers.tulips, "name");
		flowersNames["orchids"] = _.pluck(Flowers.orchids, "name");

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
						type: previewModel.get("flowerType")
						//price: previewModel.get("flowerInfo").price
				}));
		});

		$(".basket-open-button").bind({
				click: function () {
						if (userBasketModel.get("ordersCount") === 0) {
								$(".basket-empty-pop-up").show().fadeOut(5000);
						} else {
								userBasketModel.set({
										opened: true
								});
						}
				}
		});

		$(document).keyup(function (e) {
				if (e.keyCode == 27) {    //esc
						if (previewModel.get("opened")) {
								previewView.close();
						} else if (userBasketModel.get("opened")) {
								userBasketView.close();
						}
				} else if (e.keyCode == 37 && previewModel.get("opened")) {  //left
						scrollPreviewLeft();
				} else if (e.keyCode == 39 && previewModel.get("opened")) {  //right
						scrollPreviewRight();
				}
		});

		$(".left-arrow").click(scrollPreviewLeft);
		$(".right-arrow").click(scrollPreviewRight);

		//filling menus for flowers item calling
		//roses
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
		//tulips
		var $tulipsList = $(".tulips").children(".ac_subitem").children(".flowers-list");
		_.each(Flowers.tulips, function (rose) {
				$tulipsList.append($("<li></li>", {
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
		//orchids
		//		var $orchidsList = $(".orchids").children(".ac_subitem").children(".flowers-list");
		//		_.each(Flowers.orchids, function (rose) {
		//				$orchidsList.append($("<li></li>", {
		//						text: rose.name
		//				})/*.bind({
		//						click: function (event) {
		//								previewModel.set({
		//										flowerName: rose.name,
		//										flowerInfo: rose,
		//										flowerType: $(event.currentTarget).parent().parent().parent().attr("class"),
		//										opened: true
		//								});
		//						}
		//				})*/);
		//		});

		function scrollPreviewLeft() {
				var currentIndex = flowersNames[previewModel.get("flowerType")].indexOf(previewModel.get("flowerName"));
				if (currentIndex > 0) {
						previewModel.set({
								flowerName: Flowers[previewModel.get("flowerType")][currentIndex - 1].name,
								flowerInfo: Flowers[previewModel.get("flowerType")][currentIndex - 1]
						});
				}
		};

		function scrollPreviewRight() {
				var currentIndex = flowersNames[previewModel.get("flowerType")].indexOf(previewModel.get("flowerName"));
				if (currentIndex < flowersNames[previewModel.get("flowerType")].length - 1) {
						previewModel.set({
								flowerName: Flowers[previewModel.get("flowerType")][currentIndex + 1].name,
								flowerInfo: Flowers[previewModel.get("flowerType")][currentIndex + 1]
						});
				}
		};
});
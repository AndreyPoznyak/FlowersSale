define([
		"backbone",
		"text!app/templates/flower-preview.htm"
],
	function (Backbone, template) {
			var FlowerPreviewView = Backbone.View.extend({
					events: {
							"click .ac_close_black": "close",
							"click .flower-preview-add-to-basket-button": "addToBasketClicked",
							"change .flower-preview-length-select": "onChangeLength"
					},

					initialize: function () {
							var view = this;

							view.listenTo(view.model, "change:opened", function (event, opened) {
									if (opened === true) {
											view.$el.fadeIn();
											$(".dark-mask").fadeIn();
											$(".navigation-buttons").fadeIn();
									} else {
											view.$el.fadeOut();
											$(".dark-mask").fadeOut();
											$(".navigation-buttons").fadeOut();
									}
							});

							view.listenTo(view.model, "change:flowerName", function (event, newName) {
									var info = view.model.get("flowerInfo");

									if (view.model.get("flowerType") === "roses") {
											view.$el.height(410);

										view.$el.find(".changing-button").removeClass().addClass("not-available changing-button").find("span").html("Нет в наличии");

									} else {
											view.$el.height(500);

										view.$el.find(".changing-button").addClass("flower-preview-add-to-basket-button orange-button").removeClass("not-available").find("span").html("Добавить в корзину");

									}
									view.$el.find(".flower-preview-title").text(newName);
									view.$el.find(".flower-preview-image").css({
											"background-image": "url(../images/flowers/" + view.model.get("flowerType") + "/" + newName.replace(/\s+/g, '') + ".jpg)"
									});

									var $colorSelect = view.$el.find(".flower-preview-color-select").empty(),
										$lengthSelect = view.$el.find(".flower-preview-length-select").empty();

									_.each(info.color, function (color) {
											$colorSelect.append($("<option>", {
													val: color,
													text: color
											}));
									});
									_.each(info.length, function (length) {
											$lengthSelect.append($("<option>", {
													val: length,
													text: length
											}));
									});

									if (info.color.length === 1) {
											$colorSelect.attr({
													disabled: "disabled"
											});
									} else {
											$colorSelect.removeAttr("disabled");
									}

									if (info["length"].length === 1) {                                //price and legth are dependent
											$lengthSelect.attr({
													disabled: "disabled"
											});
											view.$el.find(".flower-preview-price").text(info.price);
									} else {
											$lengthSelect.removeAttr("disabled");
											view.$el.find(".flower-preview-price").text(info.price[0]);
									}

									if (info.description) {
											view.$el.find(".flower-preview-description").show().text(info.description);
									} else {
											view.$el.find(".flower-preview-description").hide();
									}

									if (info.diameter) {
											view.$el.find(".flower-preview-diameter").show().text(info.diameter + " см");
									} else {
											view.$el.find(".flower-preview-diameter").hide();
									}

									if (info.lifeSpan) {
											view.$el.find(".flower-preview-lifespan").show().text(info.lifeSpan + " дней");
									} else {
											view.$el.find(".flower-preview-lifespan").hide();
									}

									if (info.petals) {
											view.$el.find(".flower-preview-petals").show().text(info.petals + " шт.");
									} else {
											view.$el.find(".flower-preview-petals").hide();
									}

									view.$el.find(".flower-preview-quantity-select").prop("selectedIndex", 0);
							});

							view.render();
					},

					render: function () {
							var view = this;
							view.$el.html(template);

							var $quantitySelect = view.$el.find(".flower-preview-quantity-select").empty();

							for (var num = 1; num < 1000; num++) {
									$quantitySelect.append($("<option>", {
											val: num,
											text: num
									}));
							}
					},

					addToBasketClicked: function () {
							var view = this;

							view.model.trigger("addItemToBasket", {
									quantity: view.$el.find(".flower-preview-quantity-select").val(),
									color: view.$el.find(".flower-preview-color-select").val(),
									length: view.$el.find(".flower-preview-length-select").val(),
									price: view.$el.find(".flower-preview-price").text()
							});
							$(".order-added-to-basket").show().fadeOut({
									duration: 1500
							});
					},

					onChangeLength: function (event) {
							var view = this,
									info = view.model.get("flowerInfo");

							view.$el.find(".flower-preview-price").text(info.price[event.currentTarget.selectedIndex]);
					},

					close: function () {
							this.model.set("opened", false);
					}
			});

			return FlowerPreviewView;
	});
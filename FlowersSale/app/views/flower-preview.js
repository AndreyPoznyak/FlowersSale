define(["backbone"],
	function (Backbone) {
			var FlowerPreviewView = Backbone.View.extend({
					template: $("#flower-preview-template"),
					events: {
							"click .ac_close_black": "close",
							"click .flower-preview-add-to-basket-button": "addToBasketClicked"
					},

					initialize: function () {
							var view = this;

							view.listenTo(view.model, "change:opened", function (event, opened) {
									if (opened === true) {
											view.$el.fadeIn();
											$(".dark-mask").fadeIn();
									} else {
											view.$el.fadeOut();
											$(".dark-mask").fadeOut();
									}
							});

							view.listenTo(view.model, "change:flowerName", function (event, newName) {
									var info = view.model.get("flowerInfo");
									view.$el.find(".flower-preview-title").text(newName);
									view.$el.find(".flower-preview-image").css({
											"background-image": "url(../images/flowers/" + view.model.get("flowerType") + "/" + newName.replace(/\s+/g, '') + ".jpg)"
									});
									view.$el.find(".flower-preview-price").text(info.price);
									view.$el.find(".flower-preview-description").text(info.description);

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

									if (info["length"].length === 1) {
											$lengthSelect.attr({
													disabled: "disabled"
											});
									} else {
											$lengthSelect.removeAttr("disabled");
									}
							});

							view.render();
					},

					render: function () {
							var view = this;
							view.$el.html(view.template.html());

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
									length: view.$el.find(".flower-preview-length-select").val()
							});
							view.close();
					},

					close: function () {
							this.model.set("opened", false);
					}
			});

			return FlowerPreviewView;
	});
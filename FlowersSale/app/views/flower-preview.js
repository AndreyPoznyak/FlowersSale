define(["backbone"],
	function (Backbone) {
			var FlowerPreviewView = Backbone.View.extend({
					events: {
							"click .ac_close_black": "close"
					},

					initialize: function () {
							var view = this;

							view.listenTo(view.model, "change:opened", function (event, opened) {
									if (opened === true) {
											view.$el.show();
											$(".dark-mask").show();
									} else {
											view.$el.hide();
											$(".dark-mask").hide();
									}
							});

							view.listenTo(view.model, "change:flowerName", function (event, newName) {
									view.$el.find(".flower-preview-title").text(newName);
									console.log(newName.replace(/\s+/g, ''));
									view.$el.find(".flower-preview-image").css({
											"background-image": "url(../images/flowers/" + view.model.get("flowerType") + "/" + newName.replace(/\s+/g, '') + ".jpg)"
									});
							});

							view.render();
					},

					render: function () {
							var view = this;
							view.$el.append($("<span></span>", {
									class: "ac_close_black"
							}), $("<div></div>", {
									class: "flower-preview-image"
							}), $("<span></span>", {
									class: "flower-preview-title"
							}));
					},

					close: function () {
							this.model.set("opened", false);
					}
			});
			return FlowerPreviewView;
	});
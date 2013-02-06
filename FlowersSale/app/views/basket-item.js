define([
		"backbone"
],
	function (Backbone) {
			var BasketItemView = Backbone.View.extend({

					template: $("#basket-item-template"),

					events: {
							"click .basket-item-remove-label": "onRemoveItemClick"
					},

					initialize: function () {
							var view = this;
							view.render();
					},

					render: function () {
							var view = this,
									model = view.model;
							view.$el.html(view.template.html());
							view.$el.find(".basket-item-title").text(model.get("name"));
							view.$el.find(".basket-item-small-image").css({
									"background-image": "url(../images/flowers_small/" + model.get("type") + "/" + model.get("name").replace(/\s+/g, '') + ".jpg)"
							});
							view.$el.find(".bakset-item-color-label").text(model.get("color"));
							view.$el.find(".bakset-item-length-label").text(model.get("length"));
							view.$el.find(".bakset-item-quantity-label").text(model.get("quantity"));
							view.$el.find(".bakset-item-price-label").text(model.get("quantity") * parseInt(model.get("price")));
					},

					onRemoveItemClick: function () {
							this.model.trigger("removeItem");
					}
			});

			return BasketItemView;
	});
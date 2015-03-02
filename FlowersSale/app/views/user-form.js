define([
        "backbone"
    ],
    function (Backbone) {
        var BasketItemView = Backbone.View.extend({
            
            events: {
                "click .ac_close_black": "close",
                "click .get-banner": "getBanner"
            },

            initialize: function () {
                var view = this;
            },

            validate: function () {
                var valid = true,
                    name = this.$el.find(".user-name").val(),
                    mail = this.$el.find(".user-email").val();

                if (!name || !mail) {
                    valid = false
                } else if (name.length < 3 || mail.length < 4) {
                    valid = false
                } else if (mail.indexOf("@") < 0 || mail.indexOf(".") < 0) {
                    valid = false
                }

                if (valid) {
                    ga = ga || function () {};

                    ga('send', 'event', 'banner', 'download', mail + " (" + name + ")", 1);
                }

                return valid;
            },

            getBanner: function () {
                if (this.validate()) {
                    this.$el.removeClass("red");
                    this.close();
                    window.open("http://lepestki.by/promo.jpg");
                } else {
                    this.$el.addClass("red");
                }
            },

            close: function () {
                $(".dark-mask").fadeOut();
                this.$el.fadeOut();
            },

            open: function () {
                $(".dark-mask").fadeIn();
                this.$el.fadeIn();
            }
        });

        return BasketItemView;
    });
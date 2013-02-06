require.config({

		waitSeconds: 60,

		deps: ["js/base", "app/app"],

		paths: {
				// Libraries
				jquery: "js/jquery-1.8.0",
				lodash: "js/lodash",
				backbone: "js/backbone",

				flowersList: "flowers-base"
		},

		shim: {
				backbone: {
						deps: ["lodash", "jquery"],
						exports: "Backbone"
				},
				"js/jquery.easing.1.3": ["jquery"],
				"js/base": ["jquery", "js/jquery.easing.1.3"],
				"js/jquery.tinyscrollbar.min": ["jquery"],

				flowersList: {
						exports: "flowersList"
				}
		}
});


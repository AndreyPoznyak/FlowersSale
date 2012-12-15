require.config({

		waitSeconds: 60,

		baseUrl: "js",

		deps: ["base"],
		
		paths: {
				// Libraries
				jquery: "jquery-1.8.0",
				lodash: "lodash",
				backbone: "backbone"
		},

		shim: {
				backbone: {
						deps: ["lodash", "jquery"],
						exports: "Backbone"
				},
				"jquery.easing.1.3": ["jquery"],
				"base": ["jquery", "jquery.easing.1.3"]
		}
});


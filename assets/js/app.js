var app = {	
	_features: {
		master: {
			ui_news_enable: 			false,
			ui_weather_enable: 			true,
			ui_power_buttons_enable: 	true,
			users_other_users: 			true
		},
	
		dev: {
			ui_news_enable: 			true,
			ui_weather_enable: 			true,
			ui_power_buttons_enable: 	true,
			users_other_users: 			true
		}
	},

	demoMode: false,

	isEnabled: function(feature_name){
		var featureSet = this._features.master;
		if (typeof featureSet[feature_name] == "undefined"){
			console.log("isEnabled(" + feature_name + ") = undefined");
			return false;
		}else{
			return featureSet[feature_name];
		}
	},

	init: function() {
		app.authService = new AuthService();
		app.authService.onLoginSuccess = function () {
			app.ui.passwordFeedback(true);
			document.write("");
			app.authService.startSession();
		};
		app.authService.onLoginFail = function () {
			app.ui.passwordFeedback(false);
		};

		app.storage.load();

		app.i18n.setLanguage(app.storage.get("app.language", "en"));
		
		if (typeof window.lightdm == "undefined"){
			this.demoMode = true;
			window.lightdm = app.debug.fakeLightDM;
			window.theme_utils  = app.debug.fakeThemeUtils;
			
			if(app.storage.get("weather.api_key", '') == '') {
				app.storage.set("weather.api_key", "put-real-key-to-see-real-weather");
			}
		}

		window.show_message = (msg) => {console.error(msg);};
		window.handle_input = () => {};

		app.ui.init();

		return true;
	}
};


document.body.onload = function() {app.init()};
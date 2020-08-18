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

	in_auth: false,

	isEnabled: function(feature_name){
		var featureSet = this._features.master;
		if (typeof featureSet[feature_name] == "undefined"){
			console.log("isEnabled(" + feature_name + ") = undefined");
			return false;
		}else{
			return featureSet[feature_name];
		}
	},

	init: function(){		
		app.storage.load();

		app.i18n.setLanguage(app.storage.get("app.language", "en"));
		
		if (typeof window.lightdm == "undefined"){
			window.lightdm = app.debug.fakeLightDM;
			window.theme_utils  = app.debug.fakeThemeUtils;
		}
				
		window.show_prompt = () => {
			//TODO: UI - progress

			// setTimeout(function(){

			// 	lightdm.respond(app._password);
			// 	delete app._password;

			// }, 10000);
		}

		window.authentication_complete = () => {
			console.log('auth completed');
			app.in_auth = false;
			console.dir(lightdm);

			if (lightdm.is_authenticated){
				app.ui.passwordFeedback(true);		
				document.write(""); // Save high cpu usage! Btw. clear not working.
				lightdm.start_session();
			}else{
				app.ui.passwordFeedback(false);
			}
		}

		window.show_message = (msg) => {console.error(msg);};
		window.handle_input = () => {};

		app.ui.init();

		return true;
	},

	login: function(username, password){
		console.log(`Starting authentication process for: ${username}`);
		app.in_auth = true;
		lightdm.authenticate(username);
	},

	put_pass: function(password) {

		app._password = password;
		lightdm.respond(app._password);
	}
};


document.body.onload = function() {app.init()};
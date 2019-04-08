var app = {	
	init: function(){
		if (typeof window.lightdm == "undefined"){
			window.lightdm = app.debug.fakeLightDM;
		}
				
		window.show_prompt = () => {
			//TODO: UI - progress
			lightdm.respond(app._password);
			delete app._password;
		}

		window.authentication_complete = () => {
			if (lightdm.is_authenticated){
				app.ui.passwordFeedback(true);
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
		app._password = password;
		lightdm.authenticate(username);
	}
};


document.body.onload = function() {app.init()};
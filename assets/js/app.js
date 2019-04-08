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
				//TODO: UI - OK
				app.ui.elements.container.classList.add("mega_blur");
				lightdm.start_session();
			}else{
				//TODO: UI - Fail
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
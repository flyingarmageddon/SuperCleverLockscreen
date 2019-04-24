app.debug = {
	fakeLightDM: {
		authenticate: function(username){
			app.debug.fakeLightDM.in_authentication = true;
			setTimeout(function(){window.show_prompt()}, 300);
		},
		authenticate_as_guest: function(username){},
		authentication_user: null,
		autologin_guest: true,
		autologin_timeout: 60,
		autologin_user: "test_autologin",
		can_hibernate: true,
		can_restart: true,
		can_shutdown: true,
		can_suspend: true,
		hibernate: function(){console.warn("DEBUG: hibernate");},
		restart: function(){console.warn("DEBUG: restart");}, 
		shutdown: function(){console.warn("DEBUG: shutdown");},
		suspend: function(){console.warn("DEBUG: suspend");},
		cancel_authentication: function(){},
		cancel_autologin: function(){},
		default_session: "XSession",
		get_hint: function(name){return "Example hint."},
		has_guest_account: true,
		hide_users: false,
		hostname: "super-hostname.lan",
		in_authentication: false,
		is_authenticated: false,
		language: null,
		languages: ["pl", "en"],
		layout: function(value){},
		layouts: ["pl-PL", "en-US"],
		lock_hint: true,
		num_users: 2,
		respond: function(response){
			if (response == "test"){
				app.debug.fakeLightDM.is_authenticated = true;
			}else{
				app.debug.fakeLightDM.is_authenticated = false;
			}

			setTimeout(function(){
			app.debug.fakeLightDM.in_authentication = false;
				window.authentication_complete();
			}, 100)
		},
		select_guest_hint: false,
		select_user_hint: "test_user",
		sessions: ["XSession", "Xterm"],
		set_language: function(lang){},
		start_session: function(session){
			console.log("--------------------");
			if (app.debug.fakeLightDM.is_authenticated){
				console.log("  starting session  ");
				setTimeout(() => {
					document.body.innerHTML = "<h1>Session loaded.</h1>";
				}, 500);
			}else{
				console.error(" not authenticated ")
			}
			console.log("--------------------");
		},
		users: [
			{ name: "test_user", display_name: "Test User", image: null, logged_in: true },
			{ name: "test_autologin", display_name: "Test Autologin", image: "http://placekitten.com/300/300", logged_in: false }
		]
	},

	fakeThemeUtils: {
		dirlist: function(){return [];}
	}
};
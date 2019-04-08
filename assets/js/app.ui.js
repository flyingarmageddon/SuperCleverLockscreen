app.ui = {
	elements: {
		container: document.getElementById("container")
	},

	init: function(){
		app.ui.elements.users_container = app.utils.createEWC("section", ["users_container"]);
		app.ui.elements.power_buttons_container = app.utils.createEWC("section", ["power_buttons_container"]);
		app.ui.elements.clock = app.utils.createEWC("section", ["clock"]);
		app.ui.elements.hostname = app.utils.createEWC("section", ["hostname"]);
		
		Array("shutdown", "restart", "suspend", "hibernate").forEach(key => {
			app.ui.elements["power_buttons_" + key] = app.utils.createEWC("button", ["power_button"]);
			app.ui.elements["power_buttons_" + key].innerHTML = key;
			app.ui.elements.power_buttons_container.appendChild(app.ui.elements["power_buttons_" + key]);
		})

		app.ui.elements.container.innerHTML = "";
		app.ui.elements.clock.innerHTML = "12:34";
		app.ui.elements.hostname.innerHTML = window.lightdm.hostname;


		app.ui.elements.container.appendChild(app.ui.elements.hostname);
		app.ui.elements.container.appendChild(app.ui.elements.clock);
		app.ui.elements.container.appendChild(app.ui.elements.power_buttons_container);
		app.ui.elements.container.appendChild(app.ui.elements.users_container);

		app.ui.renderUsers();
		return;


		app.ui.elements.container.innerHTML += "I am running on: <b>" + window.lightdm.hostname + "</b><br>";
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.users).forEach(key => {
			app.ui.elements.container.innerHTML += "Available user: <b>" + JSON.stringify(window.lightdm.users[key]) + "</b><br>";
		})
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.sessions).forEach(key => {
			app.ui.elements.container.innerHTML += "Available session: <b>" + JSON.stringify(window.lightdm.sessions[key]) + "</b><br>";
		})
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.layouts).forEach(key => {
			app.ui.elements.container.innerHTML += "Available keymap: <b>" + JSON.stringify(window.lightdm.layouts[key]) + "</b><br>";
		})
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.languages).forEach(key => {
			app.ui.elements.container.innerHTML += "Available language: <b>" + JSON.stringify(window.lightdm.languages[key]) + "</b><br>";
		})
	},


	renderUser: function(userData){
		user = app.utils.createEWC("div", ["user_item"]);

		user_name = app.utils.createEWC("div", ["user_name"]);
		user_nice_name = app.utils.createEWC("div", ["user_nice_name"]);
		user_image = app.utils.createEWC("img", ["user_image"]);
		user_info = app.utils.createEWC("div", ["user_info"]);

		user_name.innerHTML = userData.name
		user_nice_name.innerHTML = userData.display_name;

		if (userData.user_image != null) {
			console.log("Has image");
			user_image.src = userData.user_image;
		}else{
			user_image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0+g8AAWkBM2y7Yk0AAAAASUVORK5CYII=";
		}

		if (userData.logged_in){
			user_info.innerHTML = "Zalogowany";
		}	

		user.appendChild(user_image);
		user.appendChild(user_nice_name);
		user.appendChild(user_name);
		user.appendChild(user_info);

		return user;
	},


	renderUsers: function(){
		app.ui.elements.users_container.innerHTML = "";

		Object.keys(window.lightdm.users).forEach(key => {
			app.ui.elements.users_container.appendChild(app.ui.renderUser(window.lightdm.users[key]));
		})
	}
};
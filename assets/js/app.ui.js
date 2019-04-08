app.ui = {
	elements: {
		background: document.querySelector(".background"),
		login_area: document.querySelector(".login_area"),
		info_bar: document.querySelector(".info_bar")
	},

	init: function(){
		app.ui.loadBackground("./assets/media/default_bg.png", "image");

		app.ui.elements.users_container = app.utils.createEWC("section", ["users_container"]);
		app.ui.elements.power_buttons_container = app.utils.createEWC("section", ["power_buttons_container"]);
		app.ui.elements.hostname = app.utils.createEWC("section", ["hostname"]);
		
		Array("shutdown", "restart", "suspend", "hibernate").forEach(key => {
			app.ui.elements["power_buttons_" + key] = app.utils.createEWC("button", ["power_button"]);
			app.ui.elements["power_buttons_" + key].innerHTML = key;
			app.ui.elements.power_buttons_container.appendChild(app.ui.elements["power_buttons_" + key]);
		})

		// app.ui.elements.login_area.innerHTML = "";
		app.ui.elements.hostname.innerHTML = window.lightdm.hostname;

		// app.ui.elements.login_area.appendChild(app.ui.elements.hostname);
		app.ui.elements.login_area.appendChild(app.ui.elements.users_container);

		//Mateusza brzydki kod

		app.ui.elements.clock_box = app.utils.createEWC("div", ['clock_box']);

		app.ui.elements.info_bar.appendChild(app.ui.elements.clock_box);
		app.ui.elements.clock_box.innerHTML = `
			<h1>${app.utils.getCurrentTime("hour")}:${app.utils.getCurrentTime("minute")}</h1>
			<h2>${app.utils.getCurrentTime("day")} ${app.utils.getCurrentTime("month")} ${app.utils.getCurrentTime("year")}</h2>
		`;

		//end
		
		app.ui.elements.info_bar.appendChild(app.ui.elements.power_buttons_container);

		app.ui.renderUsers();
		return;


		app.ui.elements.login_area.innerHTML += "I am running on: <b>" + window.lightdm.hostname + "</b><br>";
		
		app.ui.elements.login_area.innerHTML += "<hr>";

		Object.keys(window.lightdm.users).forEach(key => {
			app.ui.elements.login_area.innerHTML += "Available user: <b>" + JSON.stringify(window.lightdm.users[key]) + "</b><br>";
		})
		
		app.ui.elements.login_area.innerHTML += "<hr>";

		Object.keys(window.lightdm.sessions).forEach(key => {
			app.ui.elements.login_area.innerHTML += "Available session: <b>" + JSON.stringify(window.lightdm.sessions[key]) + "</b><br>";
		})
		
		app.ui.elements.login_area.innerHTML += "<hr>";

		Object.keys(window.lightdm.layouts).forEach(key => {
			app.ui.elements.login_area.innerHTML += "Available keymap: <b>" + JSON.stringify(window.lightdm.layouts[key]) + "</b><br>";
		})
		
		app.ui.elements.login_area.innerHTML += "<hr>";

		Object.keys(window.lightdm.languages).forEach(key => {
			app.ui.elements.login_area.innerHTML += "Available language: <b>" + JSON.stringify(window.lightdm.languages[key]) + "</b><br>";
		})
	},

	loadBackground: function(url, type = "image"){
		if (type == "image"){
			bgElement = document.createElement("img");
		}else if (type == "video"){
			bgElement = document.createElement("video");
			bgElement.muted = true;
			bgElement.autoplay = true;
			bgElement.loop = true;
		}else{
			return false;
		}

		bgElement.src = url;
		app.ui.elements.background.innerHTML = "";
		app.ui.elements.background.appendChild(bgElement);
		return true;
	},

	renderUser: function(userData){
		user = app.utils.createEWC("div", ["user_item"]);
		user.userData = userData;

		user_name = app.utils.createEWC("div", ["user_name"]);
		user_nice_name = app.utils.createEWC("div", ["user_nice_name"]);
		user_image = app.utils.createEWC("img", ["user_image"]);
		user_info = app.utils.createEWC("div", ["user_info"]);
		user_password = app.utils.createEWC("input", ["user_password"]);

		user_password.type = "password";

		user_password.onfocus = function(){
			app.ui.elements.background.classList.add("blur");
		}

		user_password.onblur = function(){
			app.ui.elements.background.classList.remove("blur");
		}

		user_password.addEventListener("keyup", function(event) {
			if (event.keyCode === 13) {
				if (this.value.length == 0){
					console.log("Password length is zero.");
					return;
				}
				userData = this.parentElement.userData;
				app.login(userData.name, this.value);
				event.preventDefault();
			}
		});

		user_name.innerHTML = userData.name
		user_nice_name.innerHTML = userData.display_name;

		if (userData.image != null) {
			user_image.src = userData.image;
		}else{
			user_image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM0+g8AAWkBM2y7Yk0AAAAASUVORK5CYII=";
		}

		if (userData.logged_in){
			user_info.innerHTML = "Zalogowany";
		}	

		user.appendChild(user_info);
		user.appendChild(user_nice_name);
		user.appendChild(user_password);

		return user;
	},


	renderUsers: function(){
		app.ui.elements.users_container.innerHTML = "";

		// Show only 1st user for now
		app.ui.elements.users_container.appendChild(app.ui.renderUser(window.lightdm.users[Object.keys(window.lightdm.users)[0]]));
		
		/*Object.keys(window.lightdm.users).forEach(key => {
			app.ui.elements.users_container.appendChild(app.ui.renderUser(window.lightdm.users[key]));
		})*/
	}
};
app.ui = {
	elements: {
		background: document.querySelector(".background"),
		container: document.querySelector(".container"),
		login_area: document.querySelector(".login_area"),
		info_bar: document.querySelector(".info_bar")
	},

	init: function(){
		//TODO: add focus on password imput
		//TODO: disable right-click, text selection 

		app.ui.loadBackground("./assets/media/default_bg.png", "image");

		app.ui.elements.users_container = app.utils.createEWC("section", ["users_container"]);
		app.ui.elements.power_buttons_container = app.utils.createEWC("section", ["power_buttons_container"]);
		app.ui.elements.hostname = app.utils.createEWC("section", ["hostname"]);
		
		if (typeof app.weather != "undefined"){
			app.ui.elements.weather_container = app.utils.createEWC("div", ["weather_container"]);
		}
		
		Array("shutdown", "restart", "suspend", "hibernate").forEach(key => {
			if (!lightdm[`can_${key}`]) return; //skip one in foreach
			app.ui.elements["power_buttons_" + key] = app.utils.createEWC("img", ["power_button"]);
			app.ui.elements["power_buttons_" + key].src = `./assets/media/icons/${key}.png`;
			app.ui.elements.power_buttons_container.appendChild(app.ui.elements["power_buttons_" + key]);
		})

		// app.ui.elements.login_area.innerHTML = "";
		app.ui.elements.hostname.innerHTML = window.lightdm.hostname;

		// app.ui.elements.login_area.appendChild(app.ui.elements.hostname);
		app.ui.elements.login_area.appendChild(app.ui.elements.users_container);

		app.ui.clock.init();

		if (typeof app.weather != "undefined"){
			app.ui.elements.info_bar.appendChild(app.ui.elements.weather_container);
			app.weather.init();
		}

		app.ui.elements.info_bar.appendChild(app.ui.elements.power_buttons_container);


		app.ui.renderUsers();
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

	passwordFeedback: function(is_good = false){
		if (is_good){
			app.ui.elements.container.classList.add("mega_blur");
		}else{
			document.querySelector(".user_password").classList.add("shaking-red");
			setTimeout(() => {
				document.querySelector(".user_password").classList.remove("shaking-red");
			}, 700);
		}
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
	},

	clock: {
		init: function(){
			app.ui.clock.element = app.utils.createEWC("div", ['clock_box']);
			app.ui.clock.update();
			
			app.ui.elements.clock_box = app.ui.clock.element;
			app.ui.elements.info_bar.appendChild(app.ui.elements.clock_box);
			setInterval(app.ui.clock.update, 10000);
		},

		update: function(){
			time = app.utils.getCurrentTime();
			app.ui.clock.element.innerHTML = `
				<h1>${time.hour}:${time.minute}</h1>
				<h2>${time.day} ${time.month} ${time.year}</h2>
			`;
		}
	}
};
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

		app.ui.background.updateList();
		app.ui.background.load();

		app.ui.elements.users_container = app.utils.createEWC("section", ["users_container"]);
		app.ui.elements.power_buttons_container = app.utils.createEWC("section", ["power_buttons_container"]);
		app.ui.elements.hostname = app.utils.createEWC("section", ["hostname"]);
		
		if (typeof app.weather != "undefined"){
			app.ui.elements.weather_container = app.utils.createEWC("div", ["weather_container"]);
		}

		app.ui.elements.hostname.innerHTML = window.lightdm.hostname;
		app.ui.elements.power_buttons_container.appendChild(app.ui.elements.hostname);
		
		Array("shutdown", "restart", "suspend", "hibernate").forEach(key => {
			if (!lightdm[`can_${key}`]) return; //Action is not allowed - skip adding it
			app.ui.elements["power_buttons_" + key] = app.utils.createEWC("img", ["power_button"]);
			app.ui.elements["power_buttons_" + key].src = `./assets/media/icons/${key}.png`;
			app.ui.elements["power_buttons_" + key].action = lightdm[key];
			app.ui.elements["power_buttons_" + key].desc = key;
			app.ui.elements["power_buttons_" + key].onclick = function(){
				if (confirm(`Are you sure you want to ${this.desc} your PC?`)){
					this.action();
				}
			}
			app.ui.elements.power_buttons_container.appendChild(app.ui.elements["power_buttons_" + key]);
		})

		app.ui.elements.login_area.innerHTML = "";

		app.ui.elements.login_area.appendChild(app.ui.elements.users_container);

		app.ui.clock.init();

		if (typeof app.weather != "undefined"){
			app.ui.elements.info_bar.appendChild(app.ui.elements.weather_container);
			app.weather.init();
		}

		app.ui.elements.info_bar.appendChild(app.ui.elements.power_buttons_container);


		app.ui.users.init();
	},

	passwordFeedback: function(is_good = false){
		if (is_good){
			app.ui.elements.container.classList.add("mega_blur");
		}else{
			if (document.querySelector(".user_item:not(.collapsed) > input").className.indexOf("shaking-red") != -1){
				return
			}
			document.querySelector(".user_item:not(.collapsed) > input").classList.add("shaking-red");
			setTimeout(() => {
				document.querySelector(".user_item:not(.collapsed) > input").classList.remove("shaking-red");
			}, 700);
		}
	},

	users: {
		init: function(){
			app.ui.elements.users_container.innerHTML = "";

			app.ui.users.renderAll();
			app.ui.elements.users_container.appendChild(app.ui.users.renderSingle({another_user: true}));
			document.querySelector(".user_item:not(.collapsed) input").focus();
		},

		renderSingle: function(userData){
			user = app.utils.createEWC("div", userData.is_default ? ["user_item"] : ["user_item", "collapsed"]);
			user.userData = userData;
			user.expanded = userData.is_default;
			if (user.expanded){
				document.querySelector(".users_container").classList.add("is_active");
			}
	
			user.onclick = app.ui.users.select;
	
			if (userData.another_user){
				user_nice_name = app.utils.createEWC("div", ["user_nice_name"]);
				user_nice_name.innerHTML = "Another user"
				user_name = app.utils.createEWC("input", ["user_name"]);
				user_name.placeholder = "Username";
				user.userData.user_element = user_name;
			}else{
				user.userData = userData;
		
				user_name = app.utils.createEWC("div", ["user_name"]);
				user_nice_name = app.utils.createEWC("div", ["user_nice_name"]);
				user_image = app.utils.createEWC("img", ["user_image"]);
				user_info = app.utils.createEWC("div", ["user_info"]);
	
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
			}
	
			user_password = app.utils.createEWC("input", ["user_password"]);
			user_password.type = "password";
			user_password.onfocus = () => {app.ui.elements.background.classList.add("blur");}
			user_password.onblur =  () => {app.ui.elements.background.classList.remove("blur");}
	
			user_password.addEventListener("keyup", function(event) {
				if (event.keyCode === 13) {
					userData = this.parentElement.userData;
					if (userData.another_user){
						app.login(userData.user_element.value, this.value);
					}else{
						app.login(userData.name, this.value);
					}
					event.preventDefault();
				}
			});

			user.appendChild(user_info);
			user.appendChild(user_nice_name);

			if (userData.another_user){
				user_password.placeholder = "Password";
				user.appendChild(user_name);
			}

			user.appendChild(user_password);
			
			return user;
		},

		renderAll: function(){
			default_user = false;

			if (Object.keys(window.lightdm.users).length == 1){
				default_user = window.lightdm.users[Object.keys(window.lightdm.users)[0]].username;
			}else if (lightdm.select_user_hint != null){
				default_user = lightdm.select_user_hint;
			}

			Object.keys(window.lightdm.users).forEach(key => {
				user = window.lightdm.users[key];
				user.other = false;

				if (default_user === false && user.logged_in){
					user.is_default = true;
				}else{
					if (typeof user.username == "undefined"){
						user.username = user.name;
					}
					user.is_default = (user.username == default_user);
				}
				
				app.ui.elements.users_container.appendChild(app.ui.users.renderSingle(user));
			});
		},

		select: function(e){
			user_el = null;

			if (e.target.className.indexOf("user_item") == -1 && e.target.parentElement.className.indexOf("user_item") != -1){
				user_el = e.target.parentElement;
			}else if (e.target.className.indexOf("user_item") != -1){
				user_el = e.target;
			}else{
				return;
			}

			document.querySelector(".users_container").classList.add("is_active");
			
			if (!user_el.expanded){
				app.ui.users.unselect();
				user_el.classList.remove("collapsed");
				user_el.expanded = true;
			}
			
			document.querySelector(".user_item:not(.collapsed) input").focus();
		},

		unselect: function(){
			user_els = user_el.parentElement.children;

			for (var i = 0; i < user_els.length; i++){
				if ((user_els[i].className.indexOf("collapsed") == -1) && user_els[i] != user_el){
					user_els[i].classList.add("collapsed");
					user_els[i].expanded = false;
				}
			}
		}
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
	},

	background: {
		list: [],
		extensions: {
			image:
				[
					"jpg",
					"jpeg",
					"png",
					"gif"
				],
			video:
				[
					"mp4"
				]
		},

		isValidImage: function (file) {
			var file_extension = file.split(".").pop().toLowerCase();
			if (app.ui.background.extensions["image"].indexOf(file_extension) >= 0){
				return true;
			}
			return false;
		},

		isValidVideo: function (file) {
			var file_extension = file.split(".").pop().toLowerCase();
			if (app.ui.background.extensions["video"].indexOf(file_extension) >= 0) {
				return true;
			}
			return false;
		},

		updateList: function () {
			var file_extension;
			var valid_extension = app.ui.background.extensions["image"].concat(app.ui.background.extensions["video"]);
			app.ui.background.list = [];

			theme_utils.dirlist('/usr/share/lightdm-webkit/themes/supercleverlockscreen/assets/media/backgrounds', false).forEach(file => {
				file_extension = file.split(".").pop().toLowerCase();
				if ((valid_extension.indexOf(file_extension) >= 0)){
					app.ui.background.list.push(file);
				}
			});
		},
		
		load: function (url = "random", onlyoftype = false) {
			var file_extension;
			var background_list = app.ui.background.list;
			if (url == "random"){
				if (onlyoftype === "image") background_list = background_list.filter(app.ui.background.isValidImage);
				else if (onlyoftype === "video") background_list = background_list.filter(app.ui.background.isValidVideo);
				else if (onlyoftype !== false) return false;
				
				if (background_list.length == 0){
					app.ui.background.load("assets/media/default_bg.png");
					return true;
				}
				url = background_list[Math.floor(Math.random() * background_list.length)];
			}
			file_extension = url.split(".").pop().toLowerCase();
			if (app.ui.background.extensions["image"].indexOf(file_extension) >= 0) file_extension = "image";
			else if (app.ui.background.extensions["video"].indexOf(file_extension) >= 0) file_extension = "video";
			else return false;

			if (file_extension == "image"){
				bgElement = document.createElement("img");
			} else {
				bgElement = document.createElement("video");
				bgElement.muted = true;
				bgElement.autoplay = true;
				bgElement.loop = true;
			}
			bgElement.src = url;
			app.ui.elements.background.innerHTML = "";
			app.ui.elements.background.appendChild(bgElement);
			return true;
		}
	}
};
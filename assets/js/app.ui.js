app.ui = {
	elements: {
		background: document.querySelector(".background"),
		overlay: document.querySelector(".overlay"),
		container: document.querySelector(".container"),
		login_area: document.querySelector(".login_area"),
		info_bar: document.querySelector(".info_bar")
	},

	//TODO: Do someting or move somewhere this 'nice' part of code
	icons: {
		shutdown: '<path fill="none" d="M0 0h24v24H0z"/><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>',
		restart: '<path d="M0 0h24v24H0z" fill="none"/><path d="M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/>',
		suspend: '<path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/><path d="M0 0h24v24H0z" fill="none"/>',
		hibernate: '<path d="M0 0h24v24H0z" fill="none"/><path d="M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69c1.11-.86 2.44-1.44 3.9-1.62zm7.32.19C16.84 3.05 15.01 2.25 13 2.05v2.02c1.46.18 2.79.76 3.9 1.62l1.42-1.43zM19.93 11h2.02c-.2-2.01-1-3.84-2.21-5.32L18.31 7.1c.86 1.11 1.44 2.44 1.62 3.9zM5.69 7.1L4.26 5.68C3.05 7.16 2.25 8.99 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43c-.86-1.1-1.44-2.43-1.62-3.89zM15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm3.31 4.9l1.43 1.43c1.21-1.48 2.01-3.32 2.21-5.32h-2.02c-.18 1.45-.76 2.78-1.62 3.89zM13 19.93v2.02c2.01-.2 3.84-1 5.32-2.21l-1.43-1.43c-1.1.86-2.43 1.44-3.89 1.62zm-7.32-.19C7.16 20.95 9 21.75 11 21.95v-2.02c-1.46-.18-2.79-.76-3.9-1.62l-1.42 1.43z"/>',
		settings: '<path fill="none" d="M0 0h20v20H0V0z"/><path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>',
		close: '<path fill="none" d="M0 0h24v24H0V0z"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>'
	},

	init: function(){
		//TODO: disable right-click, text selection 

		app.ui.elements.background.innerHTML = "";
		app.ui.elements.overlay.innerHTML = "";
		app.ui.elements.login_area.innerHTML = "";
		app.ui.elements.info_bar.innerHTML = "";

		app.ui.background.updateList();
		app.ui.background.load();
		app.ui.background.toggleShortcuts(true);

		app.ui.elements.users_container = app.utils.createEWC("section", ["users_container"]);
		app.ui.elements.power_buttons_container = app.utils.createEWC("section", ["power_buttons_container"]);
		app.ui.elements.hostname = app.utils.createEWC("section", ["hostname"]);
		
		if ((app.isEnabled("ui_weather_enable")) && (typeof app.weather != "undefined")){
			app.ui.elements.weather_container = app.utils.createEWC("div", ["weather_container"]);
		}

		app.ui.elements.hostname.innerHTML = window.lightdm.hostname;
		app.ui.elements.power_buttons_container.appendChild(app.ui.elements.hostname);
		
		Array("shutdown", "restart", "suspend", "hibernate").forEach(key => {
			if (!lightdm[`can_${key}`]) return; //Action is not allowed - skip adding it
			app.ui.elements["power_buttons_" + key] = app.utils.createSVG(24, 24, app.ui.icons[key]);
			app.ui.elements["power_buttons_" + key].classList.add("power_button");
			app.ui.elements["power_buttons_" + key].action = lightdm[key];
			app.ui.elements["power_buttons_" + key].key = key;
			app.ui.elements["power_buttons_" + key].desc = app.strings.power[key];
			app.ui.elements["power_buttons_" + key].onclick = () => {
				app.ui.overlay.modal.create(
					app.strings.power[key].u() + "?",
					`<h2>${app.strings.phrases.are_you_sure.u() + " " + app.strings.power["to_" + key] + " " + app.strings.your + " " + app.strings.computer}?</h2>
					<p>It will be automaticly done in..</p>
					<h2><span id="power_button_timer">10</span> seconds</h2>
					<br>
					<input type="button" value="${app.strings.ok}" onclick="app.ui.elements['power_buttons_${key}'].action()"/>
					<input type="button" value="${app.strings.cancel.u()}" onclick="app.ui.overlay.modal.cancel({},true)"/>`,
					["text_center"]
				);

				app.ui.overlay.modal.state.timer.add(() => {
					var timer = document.querySelector('#power_button_timer');
					time = parseInt(timer.innerHTML);
					if (time > 0){
						timer.innerHTML = parseInt(timer.innerHTML) - 1;
					} else {
						app.ui.overlay.modal.state.timer.cancelAll();
						app.ui.elements["power_buttons_" + key].action();
						timer.parentElement.innerHTML = key + " in progress...";
					}
				}, 1000);
			}
			app.ui.elements.power_buttons_container.appendChild(app.ui.elements["power_buttons_" + key]);
		})

		//TODO: Not sure about place, maybe it should be moved to right-top or somewhere
		app.ui.elements["power_button_settings"] = app.utils.createSVG(24, 24, app.ui.icons["settings"]);
		app.ui.elements["power_button_settings"].classList.add("power_button");
		app.ui.elements["power_button_settings"].onclick = () => app.ui.overlay.modal.create();
		app.ui.elements.power_buttons_container.appendChild(app.ui.elements["power_button_settings"]);

		app.ui.elements.login_area.innerHTML = "";

		app.ui.elements.login_area.appendChild(app.ui.elements.users_container);

		app.ui.clock.init();

		if ((app.isEnabled("ui_weather_enable")) && (typeof app.weather != "undefined")){
			app.ui.elements.info_bar.appendChild(app.ui.elements.weather_container);
			app.weather.init();
		}

		if (app.isEnabled("ui_power_buttons_enable")){
			app.ui.elements.info_bar.appendChild(app.ui.elements.power_buttons_container);
		}

		app.ui.users.init();
		try {customselect.init();} catch (e) {}
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
			if (app.isEnabled("users_other_users")){
				app.ui.elements.users_container.appendChild(app.ui.users.renderSingle({another_user: true}));
			}
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
				user_nice_name.innerHTML = app.strings.another.u() + " " + app.strings.user;
				user_name = app.utils.createEWC("input", ["user_name"]);
				user_name.placeholder = app.strings.username.u();
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
					user_info.innerHTML = app.strings.logged_in.u();
				}	
			}
	
			user_password = app.utils.createEWC("input", ["user_password"]);
			user_password.type = "password";
			
			user_password.oninput = () => { if (!app.ui.overlay.modal.mouse_on_modal) app.ui.elements.background.classList.add("blur");}
			user_password.onblur =  () => { if (!app.ui.overlay.modal.mouse_on_modal) app.ui.elements.background.classList.remove("blur");}
			
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
				user_password.placeholder = app.strings.password.u();
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
			time = app.utils.getTime();
			app.ui.clock.element.innerHTML = `
				<h1>${time.hour}:${time.minute}</h1>
				<h2>${time.day} ${time.month_name} ${time.year}</h2>
			`;
		}
	},

	background: {
		list: [],
		extensions: {
			image: ["jpg", "jpeg", "png", "gif"],
			video: ["mp4"]
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
					app.ui.background.load("assets/media/default_bg.jpg");
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
		},

		nextBackgroundShortcut: function(event){
			if ((event.keyCode === 39 || event.keyCode === 37) && event.ctrlKey) {
				app.ui.background.load();
				//Animations are bad
				// app.ui.elements.background.classList.add("mega_blur");
				// setTimeout(() => {
				// 	app.ui.background.load();
				// 	app.ui.elements.background.classList.remove("mega_blur");
				// }, 500);
			}
		},

		toggleShortcuts(toggle = true){
			if(toggle){
				document.body.addEventListener("keyup", app.ui.background.nextBackgroundShortcut);
			} else {
				document.body.removeEventListener("keyup", app.ui.background.nextBackgroundShortcut);
			}
		}
	},

	overlay: {
		
		modal: {
			mouse_on_modal: false,
			
			//TODO: Nicer state (including timers) management
			state: {
				timer: {
					add: function(fn, time){
						var timer_id = setInterval(fn, time);
						app.ui.overlay.modal.state.timer.list.push(timer_id);
						return app.ui.overlay.modal.state.timer.list.indexOf(timer_id);
					},

					cancelAll: function(){
						app.ui.overlay.modal.state.timer.list.forEach(timer_id => {
							clearInterval(timer_id);
							clearTimeout(timer_id);
						});
						app.ui.overlay.modal.state.timer.list = [];
					},

					list: []
				}
			},

			isMouseOnModal: function (bool) {
				app.ui.overlay.modal.mouse_on_modal = bool;
			},

			remove: function(){
				app.ui.elements.overlay.style.display = "none";
				app.ui.elements.overlay.innerHTML = "";

				app.ui.elements.container.classList.remove("blur");
				app.ui.elements.background.classList.remove("blur");
			},

			create: function (title_text = "Demo Title", content_html = "demo", addional_classes = []) {
				app.ui.elements.overlay.style.display = "flex";

				addional_classes.push("modal");
				app.ui.elements.modal = app.utils.createEWC("div", addional_classes);
				app.ui.elements.overlay.appendChild(app.ui.elements.modal);
				
				var title = app.utils.createEWC("div", ["modal_title"]);
				title.classList.add("text_center");
				title_text = `<h1>${title_text}</h1>`;
				title.innerHTML = title_text;

				var close_btn = app.utils.createSVG(24, 24, app.ui.icons.close);
				close_btn.classList.add("modal_close");
				close_btn.onclick = () => {app.ui.overlay.modal.cancel({},true)};
				
				var content = app.utils.createEWC("div", ["modal_content"]);
				if(content_html == "demo"){
					content_html = "<h2>Section</h2><p>Have a nice day.</p>";
					for(var i = 0; i < 3; i++){
						content_html += content_html;
					}
				}
				content.innerHTML = content_html;

				app.ui.elements.modal.appendChild(title);
				app.ui.elements.modal.appendChild(close_btn);
				app.ui.elements.modal.appendChild(content);

				app.ui.elements.container.classList.add("blur");
				app.ui.elements.background.classList.add("blur");

				app.ui.elements.overlay.addEventListener("click", app.ui.overlay.modal.cancel);
				app.ui.elements.modal.addEventListener("mouseover", () => app.ui.overlay.modal.isMouseOnModal(true));
				app.ui.elements.modal.addEventListener("mouseout", () => app.ui.overlay.modal.isMouseOnModal(false));
			},

			cancel: function(e = {}, overrideMouseOnModal = false){
				if (app.ui.overlay.modal.mouse_on_modal && !overrideMouseOnModal) {
					return;
				}
				app.ui.overlay.modal.state.timer.cancelAll();
				app.ui.overlay.modal.remove();
			}
		}
	}
};
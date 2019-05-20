app.weather = {

	new_data: "not a object",

	forecast_data: [
		{ day: "I ", temp: null, text: "????" },
		{ day: "use ", temp: null, text: "????" },
		{ day: "debian ", temp: null, text: "????" },
		{ day: "btw", temp: null, text: "????" },
		{ day: ".", temp: null, text: "????" }
	],

	init: function(){
		if (!app.storage.get("weather.api_key")){
			app.ui.overlay.modal.create({
				"title": app.strings.warning.u(),
				"content":
					app.strings.phrases.api_key_missing.u() + " Open Weather Map.  " +
					app.i18n.stringBuilder(["phrases.api_key_required", "settings.weather_forecast"]).u() + ".",
				"buttons": [
					{ text: app.strings.ok, action: () => { app.ui.overlay.modal.cancel({}, true);} },
					{ text: app.strings.settings.settings.u(), action: () => { app.ui.overlay.modal.cancel({}, true); app.settings.createModal() } }
				]

			});
			return false;
		}

		app.weather.updateForecast();
		app.weather.renderForecast();	
	}, 

	isValidData: function (params) {
		var love = "";
		app.weather.forecast_data.forEach(d => love += d.day);
		if (love == "I use debian btw."){
			return false;
		}
		return true;
	},

	renderForecast: function(){
		if(!app.weather.isValidData()){
			return;
		}
		
		app.ui.elements.weather_container.innerHTML = "";
		app.weather.forecast_data.forEach(d => {;
			date = app.utils.getRelativeDay(d.day);
			if(date == "today"){
				var weather_item = app.utils.createEWC("div", ["weather_item", "weather_item_today"]);
			} else if (date == "yesterday"){
				var weather_item = app.utils.createEWC("div", ["weather_item", "weather_item_yesterday"]);
			} else {
				var weather_item = app.utils.createEWC("div", ["weather_item"]);
			}
			weather_item.innerHTML = `
				<div class="weather_day">${date}</div>
				<div class="weather_temp">${Math.round(d.temp)}°C</div>
				<div class="weather_text">${d.sky}</div>
			`;
			app.ui.elements.weather_container.appendChild(weather_item);
		});
	},

	getForecast: function(){
		if (app.settings.data.weather.api_key == ""){
			app.ui.overlay.modal.create({
				"title": app.strings.warning.u(),
				"content":
					app.strings.phrases.api_key_missing.u() + " Open Weather Map.  " +
					app.i18n.stringBuilder(["phrases.api_key_required", "settings.weather_forecast"]).u() + ".",
				"buttons": [
					{ text: app.strings.ok, action: () => { app.ui.overlay.modal.cancel({}, true); } },
					{ text: app.strings.settings.settings.u(), action: () => { app.ui.overlay.modal.cancel({}, true); app.settings.createModal() } }
				]

			});
			return;
		}

		// # Notice about catching no internet connection
		// # 1. Linux don't want connect to internet on startup.
		// #    And then webkit throw an error (prompt) which is not good for users.
		// #    And this error is thown from webkit (even if you catch it in js).
		// #    1. So the first what you think is check if navigator.isOnline
		// #       before webkit will try to do request. And it's perfect...but not here.
		// #       For now in webkit2 navigator.onLine always retrun true. Acually it's not
		// #       a bug (some browsers do so). Unfortunetly for us.
		// #    2. You can try to catch but it's not error from js.
		// #    3. Using a onerror not prevent from throwing error, you can try to "ping" with img.src
		// #       something but same as in request you get an error.
		// #	4. Did i mentioned that in webkit2 the error is not NO_INTERNET_CONNECTION but
		// #	Error resolving 'api.openweathermap.org': Temporary failure in name resolution
		// #	I test it befeore in firefox (my bad) and in chrome (my bad++) so i realized afrer I
		// #	think that i fixed it.
		// #	And what is the solution...change domains to ips and thats it...
		// #	You get diffrent error but...it's somehow whitelisted and wouldn't throw alert with
		// #	theme error! It's not good but well...it's working for now.	

		//var url = `http://api.openweathermap.org/data/2.5/forecast/daily?`
		var url = `http://37.139.20.5/data/2.5/forecast/daily?`
		url += `q=${app.storage.get("weather.location")}`
		url +=	`&mode=json`
		url +=	`&units=${app.storage.get("weather.units")}`
		url +=	`&cnt=5`
		url +=	`&apikey=${app.storage.get("weather.api_key")}`;

		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.onreadystatechange = function (e) {
			if (request.readyState == 4) {

				if (request.status != 200){
					if (request.status == 0){
						console.log(`Failed to get weather data, no internet connection. Retry in 5 seconds...`)
					} else {
						console.log(`Failed to get weather data from openweathermap, code:${request.status}. Retry in 5 seconds...`)
					}
					setTimeout(() => app.weather.updateForecast(true, true, true), 5000);
					app.weather.new_data = false;
					return;
				}
				
				app.weather.new_data = JSON.parse(request.responseText);
				if (app.weather.new_data == null) {
					app.weather.new_data = false;
				}
				return;
			}
		};
		request.send(null);
	},

	//TODO: Check if data changed -> update_all to override it
	updateForecast(update_all = false, save_to_storage = false, get_new_data = true){
		if(get_new_data){
			app.weather.getForecast();
			app.weather.waitForData = setInterval(() => {
				if (typeof app.weather.new_data == "object"){
					clearInterval(app.weather.waitForData);
					app.weather.updateForecast(update_all, save_to_storage, false);
					app.weather.renderForecast();
				} else if (typeof app.weather.new_data == "boolean") {
					clearInterval(app.weather.waitForData);
				}
			}, 100);
			return;
		}
		openweather_json = app.weather.new_data;
		if (update_all == false && openweather_json.city.name.toLowerCase() != app.settings.data.weather.city){
			update_all = true;
		}
		openweather_json.list.forEach((day, i) => {
			app.weather.forecast_data[i].day = day.dt;
			app.weather.forecast_data[i].temp = day.temp.day;
			app.weather.forecast_data[i].sky = day.weather[0].main;
			app.weather.forecast_data[i].humidity = day.humidity;
			app.weather.forecast_data[i].pressure = day.pressure;
			app.weather.forecast_data[i].wind = day.speed;
		});

		if(save_to_storage){
			//TODO: todo
		}
			
	}
}
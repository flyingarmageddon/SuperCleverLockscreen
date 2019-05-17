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
			alert(
				app.strings.warning.u() + "! " +
				app.strings.phrases.api_key_missing.u() + " Open Weather Map. " +
				app.i18n.stringBuilder(["phrases.api_key_required", "settings.weather_forecast"]).u() + "."
			);
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
			alert(
				app.strings.warning.u() + "! " +
				app.strings.phrases.api_key_missing.u() + " Open Weather Map. " +
				app.i18n.stringBuilder(["phrases.api_key_required", "settings.weather_forecast"]).u() + "."
			);
			return;
		}
		if (!navigator.onLine){
			console.log("Warning! No internet connection! Weather could not be updated. Retry in 5 seconds...");
			setTimeout(() => app.weather.updateForecast(true, true, true), 5000);
			app.weather.new_data = false
			return;
		}
		var url = `http://api.openweathermap.org/data/2.5/forecast/daily?`
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
					console.log(`Failed to get weather data from openweathermap, code:${request.status}. Retry in 5 seconds...`)
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
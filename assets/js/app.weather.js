app.weather = {
	init: function(){
		app.weather.renderForecast();
	}, 

	renderForecast(){
		app.weather.forecastData = [
			{day: "Today", temp: 19, text: "Sunny"},
			{day: "01.04", temp: 10, text: "Rainy"},
			{day: "02.04", temp: -4, text: "Snowy"},
			{day: "03.04", temp: 50, text: "Sunny"},
			{day: "04.04", temp: 5, text: "Random"}
		];

		app.ui.elements.weather_container.innerHTML = "";
		app.weather.forecastData.forEach(d => {
			var weather_item = app.utils.createEWC("div", ["weather_item"]);
			weather_item.innerHTML = `
				<div class="weather_day">${d.day}</div>
				<div class="weather_temp">${d.temp}°C</div>
				<div class="weather_text">${d.text}</div>
			`;
			app.ui.elements.weather_container.appendChild(weather_item);
		});
	}
}
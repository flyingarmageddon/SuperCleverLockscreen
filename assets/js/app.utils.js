app.utils = {
	createEWC: function(elementName, classList){
		element = document.createElement(elementName);
		for (var i = 0; i < classList.length; i++){
			element.classList.add(classList[i]);
		}
		return element;
	},

	createSVG: function(drawing_width, drawing_height, content){
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", `0 0 ${drawing_width} ${drawing_height}`);
		svg.innerHTML = content;
		return svg;
	},

	getTime: function (timestamp = "current"){
		if(timestamp == "current"){
			var date = new Date();
		} else {
			var date = new Date(parseInt(timestamp) * 1000);
		}

		month_name = {
			1: "january",
			2: "february",
			3: "march",
			4: "april",
			5: "may",
			6: "june",
			7: "july",
			8: "august",
			9: "september",
			10: "october",
			11: "november",
			12: "december"
		}

		week_day_name = {
			0: app.strings.days.sunday.u(),
			1: app.strings.days.monday.u(),
			2: app.strings.days.tuesday.u(),
			3: app.strings.days.wednesday.u(),
			4: app.strings.days.thursday.u(),
			5: app.strings.days.friday.u(),
			6: app.strings.days.saturday.u()
		}

		return {
			second: String(date.getSeconds()).padStart(2, '0'),
			minute: String(date.getMinutes()).padStart(2, '0'),
			hour: String(date.getHours()).padStart(2, '0'),
			day: String(date.getDate()).padStart(2, '0'),
			month: String(date.getMonth()+1).padStart(2, '0'),
			month_name: month_name[date.getMonth() + 1],
			year: String(date.getFullYear()),
			week_day: week_day_name[date.getDay()],
		}
	},

	getRelativeDay: function(timestamp){
		var now = new Date();
		var date = new Date(parseInt(timestamp) * 1000);
		var year_diff = date.getFullYear() - now.getFullYear();
		var month_diff = date.getMonth() - now.getMonth();
		var day_diff = date.getDate() - now.getDate();

		if(year_diff == 0 && month_diff == 0){
			switch (day_diff) {
				case -1:
					return app.strings.days.yesterday.u();
				case 0:
					return app.strings.days.today.u();
				case 1:
					return app.strings.days.tomorrow.u();
				default:
					if(day_diff <= 7){
						day = app.utils.getTime(timestamp);
						return day.week_day;
					}
					return date.getDate();
			}
		}
	}
};
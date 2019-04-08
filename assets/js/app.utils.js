app.utils = {
	createEWC: function(elementName, classList){
		element = document.createElement(elementName);
		for (var i = 0; i < classList.length; i++){
			element.classList.add(classList[i]);
		}
		return element;
	},
	getCurrentTime: function (){
		var date = new Date();

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

		day_name = {
			0: "sunday",
			1: "monday",
			2: "tuesday",
			3: "wednesday",
			4: "thursday",
			5: "friday",
			6: "saturday",
		}

		return {
			second: String(date.getSeconds()).padStart(2, '0'),
			minute: String(date.getMinutes()).padStart(2, '0'),
			hour: String(date.getHours()).padStart(2, '0'),
			day: String(date.getDate()).padStart(2, '0'),
			month: month_name[date.getMonth() + 1],
			year: String(date.getFullYear()),
			week_day: day_name[date.getDay()],
		}
	}
};
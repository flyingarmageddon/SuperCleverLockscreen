app.utils = {
	createEWC: function(elementName, classList){
		element = document.createElement(elementName);
		for (var i = 0; i < classList.length; i++){
			element.classList.add(classList[i]);
		}
		return element;
	},
	getCurrentTime: function (what){
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


		switch (what) {
			case "second":
				return String(date.getSeconds()).padStart(2, '0');
			
			case "minute":
				return String(date.getMinutes()).padStart(2, '0');

			case "hour":
				return String(date.getHours()).padStart(2, '0');

			case "day":
				return String(date.getDate()).padStart(2, '0');

			case "month":
				var month = String(date.getMonth() +1);
				return month_name[month];
			
			case "year":
				return String(date.getFullYear());
			
			case "week_day":
				var day = String(date.getDay());
				return day_name[day];
		}

		return false;
	}
};
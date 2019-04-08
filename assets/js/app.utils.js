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
		var return_value = false;

		switch (what) {
			case "second":
				return_value = String(date.getSeconds()).padStart(2, '0');
				break;
			
			case "minute":
				return_value = String(date.getMinutes()).padStart(2, '0');
				break;

			case "hour":
				return_value = String(date.getHours()).padStart(2, '0');
				break;

			case "day":
				return_value = String(date.getDate()).padStart(2, '0');
				break;

			case "month":
				return_value = String(date.getMonth() +1).padStart(2, '0');
				break;
			
			case "year":
				return_value = String(date.getFullYear());
				break;
			
			case "week_day":
				//TODO: Return week name not number
				return_value = String(date.getDay())
				break;
		}

		return return_value;
	}
};
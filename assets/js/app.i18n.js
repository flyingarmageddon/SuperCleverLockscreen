app.i18n = {
	pl: {
		logged_in:		 			"zalogowany",
		username:		 			"użytkownik",
		user:		 				"użytkownik",
		another:		 			"inny",
		password:		 			"hasło",
		computer:					"komputer",

		ok:							"OK",
		cancel:						"anuluj",

		change:		 				"zmień",
		to_change:		 			"zmienić",
		your:						"swój",
		yours:						"swoje",

		warning:					"uwaga",
		error:						"błąd",

		openweathermap:				"OpenWeatherMap",

		
		phrases: {
			are_you_sure:			"czy na pewno chcesz",
			api_key_missing:		"brak klucza api do",
			api_key_required:		"klucz jest wymagany do działania"
		},

		settings: {
			settings:		 		"ustawienia",
			show:		 			"pokaż",
			field:		 			"pole",
			weather:		 		"pogoda",
			weather2:		 		"pogodę",
			weather_forecast:		"prognozy pogody",
			background:		 		"tło",
			look:		 			"wygląd",
			news:		 			"wiadomości",
			location:		 		"lokalizacja",
			language:		 		"język",
			app:		 			"aplikacja",
			app2:		 			"aplikacji",
			app_language:		 	"język aplikacji",
			api_key:		 		"klucz API",
			owm:		 			"OWM",
			users_and_logon:		"użytkownicy i logowanie",
		},

		languages: {
			en:		 				"Angielski",
			pl: 					"Polski",
		},

		power: {
			shutdown:		 		"wyłącz",
			restart:		 		"zrestartuj",
			hibernate:		 		"zahibernuj",
			suspend:			 	"uśpij",
			to_shutdown:		 	"wyłączyć",
			to_restart:		 		"zrestartować",
			to_hibernate:		 	"zahibernować",
			to_suspend:			 	"uśpić"
		},

		days: {
			today:		 			"dzisiaj",
			tomorrow:		 		"jutro",
			yesterday:		 		"wczoraj",
			monday:		 			"poniedziałek",
			tuesday:		 		"wtorek",
			wednesday:		 		"środa",
			thursday:		 		"czwartek",
			friday:		 			"piątek",
			saturday:		 		"sobota",
			sunday:		 			"niedziela"
		}
	},

	en: {
		logged_in: 					"logged in",
		user: 						"user",
		another:		 			"another",
		username: 					"username",
		password: 					"password",
		computer:					"computer",

		ok:							"OK",
		cancel:						"cancel",

		change: 					"change",
		to_change: 					"to change",
		your:						"your",
		yours:						"yours",

		warning:					"warning",
		error:						"error",

		openweathermap:				"OpenWeatherMap",
		
		phrases: {
			are_you_sure:			"are you sure you want",
			api_key_missing: 		"no api key for",
			api_key_required: 		"api key is required for"
		},

		settings: {
			settings:		 		"settings",
			show:		 			"show",
			field:		 			"field",
			weather:		 		"weather",
			weather2:		 		"weather",
			weather_forecast: 		"weather forecast",
			background:		 		"background",
			look:		 			"look",
			news:		 			"news",
			location:		 		"location",
			language:		 		"language",
			app:		 			"app",
			app2:		 			"app",
			app_language:		 	"app language",
			api_key:		 		"API key",
			owm:		 			"OWM",
			users_and_logon:		"users and logon",
		},

		languages: {
			en: 					"english",
			pl: 					"polish",
		},

		power: {
			shutdown:		 		"shutdown",
			restart:		 		"restart",
			hibernate:		 		"hibernate",
			suspend:			 	"suspend",
			to_shutdown:		 	"to shutdown",
			to_restart:		 		"to restart",
			to_hibernate:		 	"to hibernate",
			to_suspend:			 	"to suspend"
		},

		days: {
			today:		 			"today",
			tomorrow:		 		"tomorrow",
			yesterday:		 		"yesterday",
			monday:		 			"monday",
			tuesday:		 		"tuesday",
			wednesday:		 		"wednesday",
			thursday:		 		"thursday",
			friday:		 			"friday",
			saturday:		 		"saturday",
			sunday:		 			"sunday"
		}
	},
	
	setLanguage: function(lang = "en"){
		if (this[lang] == undefined){
			lang = "en";
		}

		app.strings = this[lang];
	},

	stringBuilder: function(list){
		output = "";

		list.forEach((item, i) => {
			try {
				if ("app.strings." + item == undefined) {
					output += item;
				} else {
					output += eval("app.strings." + item);
				}
			} catch (error) {
				// Catch if item is not valid variable name like "!" or "."
				output += item;
			}
			if (i != list.length - 1) output += " ";
		});

		return output.u();
	}
};


/* u() -> make first letter of string uppercase */
String.prototype.u = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

app.i18n.setLanguage();
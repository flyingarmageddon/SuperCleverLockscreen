app.i18n = {
	pl: {
		logged_in: 			"zalogowany",
		username: 			"użytkownik",
		user: 				"użytkownik",
		another: 			"inny",
		password: 			"hasło",
		computer:			"komputer",

		ok:					"OK",
		cancel:				"anuluj",

		change: 			"zmień",
		to_change: 			"zmienić",
		your:				"swój",
		yours:				"swoje",
		
		phrases: {
			are_you_sure:	"czy na pewno chcesz"
		},

		power: {
			shutdown: 		"wyłącz",
			restart: 		"zrestartuj",
			hibernate: 		"zahibernuj",
			suspend:	 	"uśpij",
			to_shutdown: 	"wyłączyć",
			to_restart: 	"zrestartować",
			to_hibernate: 	"zahibernować",
			to_suspend:	 	"uśpić"
		},

		days: {
			today: 			"dzisiaj",
			tomorrow: 		"jutro",
			yesterday: 		"wczoraj",
			monday: 		"poniedziałek",
			tuesday: 		"wtorek",
			wednesday: 		"środa",
			thursday: 		"czwartek",
			friday: 		"piątek",
			saturday: 		"sobota",
			sunday: 		"niedziela"
		}
	},

	en: {
		logged_in: 			"logged in",
		user: 				"user",
		another: 			"another",
		username: 			"username",
		password: 			"password",
		computer:			"computer",

		ok:					"OK",
		cancel:				"cancel",

		change: 			"change",
		to_change: 			"to change",
		your:				"your",
		yours:				"yours",
		
		phrases: {
			are_you_sure:	"are you sure you want"
		},

		power: {
			shutdown: 		"shutdown",
			restart: 		"restart",
			hibernate: 		"hibernate",
			suspend:	 	"suspend",
			to_shutdown: 	"to shutdown",
			to_restart: 	"to restart",
			to_hibernate: 	"to hibernate",
			to_suspend:	 	"to suspend"
		},

		days: {
			today: 			"today",
			tomorrow: 		"tomorrow",
			yesterday: 		"yesterday",
			monday: 		"monday",
			tuesday: 		"tuesday",
			wednesday: 		"wednesday",
			thursday: 		"thursday",
			friday: 		"friday",
			saturday: 		"saturday",
			sunday: 		"sunday"
		}
	},
	
	setLanguage: function(lang = "en"){
		if (this[lang] == undefined){
			lang = "en";
		}

		app.strings = this[lang];
	}
};


/* u() -> make first letter of string uppercase */
String.prototype.u = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

app.i18n.setLanguage();
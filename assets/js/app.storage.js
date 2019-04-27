app.storage = {
	store_name: "SCLData",
	data: {
		"Version": "1.0",
		"LastModified": "01.01.1970 00:01",

		preferences: {
			"app.language":			"en",

			"ui.show_other_user": 	true,
			"ui.show_weather": 		false,
			"ui.show_news": 		true,
			
			"weather.api_key": 		false, //Put your API key to openweathermap here.
			"weather.location": 	"Warszawa, PL",
			"weather.units": 		"metric"
		}
	},

	storageMethod: "localstorage", 

	load: function(){
		if (localStorage.getItem(app.storage.store_name) == null) {
			this.save();
		}
		
		try {
			let parsed = JSON.parse(localStorage.getItem(app.storage.store_name));
			this.data = parsed;
		} catch (error) {
			console.error("Error during loading saved settings. Resetting to default");
			app.storage.save();
			document.location.reload();
			return;
		}
		
		console.log("Dane w formacie " + this.data.Version);
		console.log("Last modified " + this.data.LastModified);
	},

	save: function(){
		app.storage.data.LastModified = new Date().toLocaleDateString("pl-PL");
		localStorage.setItem(app.storage.store_name, JSON.stringify(app.storage.data));
	},

	get: function(key, default_value = false){
		if (typeof this.data.preferences[key] == "undefined"){
			return default_value;
		}else{
			return this.data.preferences[key];
		}
	},

	set: function(key, value){
		this.data.preferences[key] = value;
		this.save();
	},

	clear: function(){
		return localStorage.removeItem(app.storage.store_name);
	},

	getItem: (key) => {return app.storage.get(key)},
	setItem: (key, value) => {return app.storage.set(key, value)},

	export: function(){
		console.log("--------------------");
		console.log(JSON.stringify(app.storage.data));
		console.log("--------------------");
	},

	import: function(){
		input = prompt("Import data:");
		if (input.length > 2){
			localStorage.setItem(app.storage.store_name, input);
		}else{
			alert("Input too short.");
		}
	}
};
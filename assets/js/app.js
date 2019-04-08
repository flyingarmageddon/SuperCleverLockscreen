var app = {
	debug: false,
	
	init: function(){
		if (typeof window.lightdm == "undefined"){
			window.lightdm = app.debug.fakeLightDM;
		}

		app.ui.init();

		return true;
	}
};


document.body.onload = function(){app.init()};
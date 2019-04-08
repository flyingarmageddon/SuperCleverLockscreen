app.ui = {
	elements: {
		container: document.getElementById("container")
	},

	init: function(){
		app.ui.elements.container.innerHTML = "<h1>Hello World!</h1>";
		app.ui.elements.container.innerHTML += "I am running on: <b>" + window.lightdm.hostname + "</b><br>";
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.users).forEach(key => {
			app.ui.elements.container.innerHTML += "Available user: <b>" + JSON.stringify(window.lightdm.users[key]) + "</b><br>";
		})
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.sessions).forEach(key => {
			app.ui.elements.container.innerHTML += "Available session: <b>" + JSON.stringify(window.lightdm.sessions[key]) + "</b><br>";
		})
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.layouts).forEach(key => {
			app.ui.elements.container.innerHTML += "Available keymap: <b>" + JSON.stringify(window.lightdm.layouts[key]) + "</b><br>";
		})
		
		app.ui.elements.container.innerHTML += "<hr>";

		Object.keys(window.lightdm.languages).forEach(key => {
			app.ui.elements.container.innerHTML += "Available language: <b>" + JSON.stringify(window.lightdm.languages[key]) + "</b><br>";
		})
	}
};
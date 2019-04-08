app.ui = {
	elements: {
		container: document.getElementById("container")
	},

	init: function(){
		app.ui.elements.container.innerHTML = "<h1>Hello World!</h1>";
		app.ui.elements.container.innerHTML += "I am running on: <b>" + window.lightdm.hostname + "</b><br>";
		app.ui.elements.container.innerHTML += "Available users: <b>" + window.lightdm.users.join(", ") + "</b><br>";
		app.ui.elements.container.innerHTML += "Available sessions: <b>" + window.lightdm.sessions.join(", ") + "</b><br>";
		app.ui.elements.container.innerHTML += "Available keymaps: <b>" + window.lightdm.layouts.join(", ") + "</b><br>";
		app.ui.elements.container.innerHTML += "Available languages: <b>" + window.lightdm.languages.join(", ") + "</b><br>";
	}
};
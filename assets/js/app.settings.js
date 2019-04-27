app.settings = {
	data: {
		weather: {}
	},
	
	createModal: function(){
		app.all_languages = [
			{"desc": "Angielski", "value": "en"},
			{"desc": "Polski", "value": "pl"}
		];

		let sections = [
			{
				name: "Użytkownicy i logowanie",
				items: [
					{desc: 'Pokazuj pole "inny użytkownik"', 	type: "checkbox", 	data_bind: "ui.show_other_user"},
					{desc: 'Pokazuj pogodę', 					type: "checkbox", 	data_bind: "ui.show_weather"},
					{desc: 'Pokazuj wiadomości',				type: "checkbox", 	data_bind: "ui.show_news"},
					{desc: 'Język aplikacji', 					type: "select", 	data_bind: "app.language", 		data_src: app.all_languages},
				]
			},
			{
				name: "Wygląd",
				items: [
					{desc: 'Tło', 								type: "select", 	data_bind: "ui.show_other_user", 	data_src: app.all_languages},
					{desc: 'Pokazuj wiadomości', 				type: "checkbox", 	data_bind: "ui.show_other_user"},
					{desc: 'Lokalizacja', 						type: "text", 		data_bind: "weather.location"},
					{desc: 'Klucz API OWM',						type: "text", 		data_bind: "weather.api_key"},
				]
			}
		];

		let prefs_html = document.createElement("div");

		sections.forEach(section => {
			let sectionContainer = document.createElement("section");
			sectionContainer.innerHTML += `<h2>${section.name}</h2>`;

			section.items.forEach(item => {
				let row_setting = app.utils.createEWC("div", ["row_setting"]);

				value = app.storage.get(item.data_bind);
				
				if (item.type == "text") {
					if (value) {
						row_setting.innerHTML = `<input type="text" value="${value}">`;
					} else {
						row_setting.innerHTML = `<input type="text">`;
					}
				
				} else if (item.type == "checkbox") {
					row_setting.classList.add("lcontainer");
					if (value) {
						row_setting.innerHTML = `<input type="checkbox" checked="checked"><span class="checkmark"></span>`;
					}else {
						row_setting.innerHTML = `<input type="checkbox"><span class="checkmark"></span>`;
					}
				
				} else if (item.type == "select") {
					options = `<option>${item.desc}</option>`;

					item.data_src.forEach(src => {
						let selected = "";
						if (src.value == value) selected = "selected";
						options += `<option value="${src.value}" ${selected} >${src.desc}</option>`
					})

					row_setting.innerHTML = `<div class="custom-select"><select>${options}</select></div>`;
				
				} else {
					row_setting.innerHTML = "WTF?";
				}

				let label = app.utils.createEWC("label", ["row"]);
				label.innerHTML = item.desc;
				label.appendChild(row_setting);
				sectionContainer.appendChild(label);
				label.internalData = item;
			})

			prefs_html.appendChild(sectionContainer);
		})

		app.ui.overlay.modal.create("Ustawienia", prefs_html.innerHTML);
		customselect.refresh();
	}
};
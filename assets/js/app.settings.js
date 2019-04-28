app.settings = {
	data: {
		weather: {}
	},
	
	createModal: function(){
		app.all_languages = [
			{"desc": app.strings.languages.en.u(), "value": "en"},
			{"desc": app.strings.languages.pl.u(), "value": "pl"}
		];

		let sections = [
			{
				name: app.strings.settings.users_and_logon.u(),
				items: [
					{desc: app.i18n.stringBuilder(["settings.show", "another", "user"]),			type: "checkbox", 	data_bind: "ui.show_other_user"},
					{desc: app.i18n.stringBuilder(["settings.show", "settings.weather2"]), 			type: "checkbox", 	data_bind: "ui.show_weather"},
					{desc: app.i18n.stringBuilder(["settings.show", "settings.news"]),				type: "checkbox", 	data_bind: "ui.show_news"},
					{desc: app.strings.settings.app_language.u(), 									type: "select", 	data_bind: "app.language", data_src: app.all_languages},
				]
			},
			{
				name: app.strings.settings.look.u(),
				items: [
					{desc: app.strings.settings.background.u(), 									type: "select", 	data_bind: "ui.show_other_user", 	data_src: app.all_languages},
					{desc: app.strings.settings.location.u(), 										type: "text", 		data_bind: "weather.location"},
					{desc: app.i18n.stringBuilder(["settings.api_key", "settings.owm"]),			type: "text", 		data_bind: "weather.api_key"},
				]
			}
		];

		let prefs_html = document.createElement("div");

		sections.forEach(section => {
			let sectionContainer = document.createElement("section");
			sectionContainer.innerHTML += `<h2>${section.name}</h2>`;

			section.items.forEach(item => {
				let row_setting = app.utils.createEWC("div", ["row_setting"]);
				row_setting.setAttribute("data-type", "settings-row");

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

				row_setting.internalData = item;
				var label = app.utils.createEWC("label", ["row"]);
				label.innerHTML = item.desc;
				label.appendChild(row_setting);
				sectionContainer.appendChild(label);
			})
			prefs_html.appendChild(sectionContainer);
		})

		app.ui.overlay.modal.create({
			title: app.strings.settings.settings.u(),
			content_element: prefs_html,
			buttons: [
				{text: app.strings.ok, 			action: () => {app.settings.save(); app.ui.overlay.modal.cancel({}, true); document.location.reload()}},
				{text: app.strings.cancel.u(),	action: () => {app.ui.overlay.modal.cancel({}, true)}}
			]
		});
		customselect.refresh();
	},

	save: function(){
		let settings_rows = app.ui.elements.modal.querySelectorAll(`[data-type="settings-row"]`);
		settings_rows.forEach(row => {
			item = row.internalData;

			if (item.type == "text") {
				item_value = row.querySelector(`input[type="text"]`).value;
			} else if (item.type == "checkbox") {
				item_value = row.querySelector(`input[type="checkbox"]`).checked;
			} else if (item.type == "select") {
				item_value = row.querySelector(`select`).value;
			} 

			console.log(`Setting ${item.data_bind} = ${item_value}`);
			app.storage.set(item.data_bind, item_value);
		})
		app.storage.save();
	}
};
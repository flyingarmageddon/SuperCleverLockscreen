app.settings = {
	createModal: function(){
		// TODO: Create that based on config.
		prefs_html = `
			<section>
				<h2>Użytkownicy i logowanie</h2>
				
				<label class="row">
					Pokazuj pole "inny użytkownik"
					
					<div class="row_setting lcontainer">
						<input type="checkbox" checked="checked">
						<span class="checkmark"></span>
					</div>
				</label>


				<h2>Wygląd</h2>
				
				<label class="row">
					Tło
					
					<div class="row_setting">
						<div class="custom-select"><select>
							<option>Tło</option>
							<option>Ładne tło 1 (test.jpg)</option>
							<option>Ładne tło 2 (Pozdrawiam Mateusza)</option>
						</select></div>
					</div>
				</label>
				
				<label class="row">
					Pokazuj pogodę
					
					<div class="row_setting lcontainer">
						<input type="checkbox" checked="checked">
						<span class="checkmark"></span>
					</div>
				</label>
				
				<label class="row">
					Lokalizacja
					
					<div class="row_setting">
						<input type="text">
					</div>
				</label>
				
				<label class="row">
					Pokazuj wiadomości
					
					<div class="row_setting lcontainer">
						<input type="checkbox" checked="checked">
						<span class="checkmark"></span>
					</div>
				</label>


				<h2>Regionalne</h2>
				
				<label class="row">
					Język aplikacji
					
					<div class="row_setting">
						<div class="custom-select"><select>
							<option>Język aplikacji</option>
							<option>Polski</option>
							<option>Angielski</option>
						</select></div>
					</div>
				</label>
			</section>
		`;


		app.ui.overlay.modal.create("Ustawienia", prefs_html);
		customselect.refresh();
	}
};
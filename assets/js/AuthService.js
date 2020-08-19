/**
 * Povider for LightDM auth logic
 */
class AuthService {

	constructor() {
		this.username = null;
		this.authInProgress = false;
		this.authenticated = false;
		this.onLoginSuccess = function() {};
		this.onLoginFail = function() {};
		
		var _this = this;

		window.show_prompt = function() {};
		window.authentication_complete = function() {
			_this.authCompleteCallback();
		}
	}

	/**
	 * Start user auth process
	 * 
	 * @param {string} username username
	 */
	startAuth(username) {
		if (!this.authInProgress && !this.authenticated) {
			console.log(`Starting auth for ${username}`);

			this.username = username;
			this.authInProgress = true;
			lightdm.authenticate(username);
		}
	}

	/**
	 * Stop user auth process
	 */
	stopAuth() {
		if (this.authInProgress) {
			console.log(`Stopping auth for ${this.username}`);

			this.authInProgress = false;
			lightdm.cancel_authentication();
		}
	}

	/**
	 * Called on auth complete by lightdm.
	 */
	authCompleteCallback() {
		if (lightdm.is_authenticated) {
			this.authInProgress = false;
			this.authenticated = true;
			this.onLoginSuccess();
		} else {
			this.onLoginFail();
		}
	}

	/**
	 * Put password to lightdm service when auth is started.
	 * 
	 * @param {string} password user password
	 */
	providePassword(password) {
		if (this.authInProgress && !this.authenticated) {
			console.log(`Providing password for user ${this.username}`);
			lightdm.respond(password);
		}
	}

	/**
	 * Start session for authenticated user
	 */
	startSession() {
		if (this.authenticated) {
			console.log(`Starting session for user ${this.username}`);
			lightdm.start_session();
		}
	}
}
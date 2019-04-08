app.utils = {
	createEWC: function(elementName, classList){
		element = document.createElement(elementName);
		for (var i = 0; i < classList.length; i++){
			element.classList.add(classList[i]);
		}
		return element;
	}
};
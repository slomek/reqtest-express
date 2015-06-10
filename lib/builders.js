var _ = require('underscore')._;
var http = require('http');

module.exports.buildRequest = function(requestConfiguration) {

	return _.extend({}, { __proto__: http.IncomingMessage.prototype }, requestConfiguration);

}

module.exports.MockResponse = function() {

    var responseContent = '';

    function appendToContent(value) {
        responseContent += value;
    }

	this.response = {
            write: appendToContent,
	    	end: appendToContent,
	    	__proto__: http.ServerResponse.prototype
	    };

	this.getContent = function() {
		return responseContent;
	}


}
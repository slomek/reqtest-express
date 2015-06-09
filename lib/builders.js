var _ = require('underscore')._;
var http = require('http');

module.exports.buildRequest = function(requestConfiguration) {

	return _.extend({}, { __proto__: http.IncomingMessage.prototype }, requestConfiguration);

}

module.exports.MockResponse = function() {

	this.response = {
	    	end: _.noop,
	    	__proto__: http.ServerResponse.prototype
	    };

	spyOn(this.response, 'end');

	this.expectEnd = function(value) {
		expect(this.response.end).toHaveBeenCalledWith(value);
	}


}
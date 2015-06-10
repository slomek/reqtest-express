var _ = require('underscore')._;
var http = require('http');

module.exports.MockRequest = function(requestConfiguration) {
	var httpRequestPrototype = { __proto__: http.IncomingMessage.prototype };
	
	_.extend(this, httpRequestPrototype, requestConfiguration);
};
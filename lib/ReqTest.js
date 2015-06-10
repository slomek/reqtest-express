var MockRequest = require('./MockRequest').MockRequest,
    MockResponse = require('./MockResponse').MockResponse;

module.exports.ReqTest = function(app) {

    var application = app,
        response = new MockResponse();

    this.given = function(requestConfiguration) {
        var request = new MockRequest(requestConfiguration);

        application.handle(request, response.getRaw());

        return this;
    };

    this.check = function() {
        return response.check;
    };

    return this;
};
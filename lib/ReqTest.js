var builders = require('./builders');

module.exports.ReqTest = function() {

    var MockResponse = new builders.MockResponse();

    this.given = function(application, requestConfiguration) {
        var request = builders.buildRequest(requestConfiguration);

        application.handle(request, MockResponse.response);

        return new Expect();
    };

    function Expect() {
        this.expectStatus = function(status) {
        };

        this.expectContent = function(expectedContent) {
            var content = MockResponse.getContent();

            expect(content).toEqual(expectedContent);

            return this;
        };

        this.expectHeader = function(headerName, expectedValue) {
            var headerValue = MockResponse.response.getHeader(headerName);

            expect(headerValue).not.toBeNull();
            if (expectedValue) {
                expect(headerValue).toEqual(expectedValue).because('aa');
            }

            return this;
        };

        return this;
    }



    return this;
	
};

//new ReqTest()
//    .given({
//        url: '/abc/def',
//        method: 'get'
//    })
//    .expectStatus(200)
//    .expectContent('text/json', {
//        a:'b',
//        c:'d'
//    });
//
//    .expectRedirect('/some/location');
//
//    .expectNext();
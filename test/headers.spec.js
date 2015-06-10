var ReqTest = require('../').ReqTest,
	express = require('express');

describe("Response headers", function () {

	var app;

	beforeEach(function(){
		app = express();
		app.get('/get/one', function (req, res) {
		    res.setHeader('key1', 'value1');
		    res.setHeader('key2', '');
		});
	});

	describe("Checking existing header", function(){

		it("should pass when asking if header exists", function(){
			new ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().headerExists('key1');
		});

		it("should pass when checking header value", function(){
			new ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().headerValue('key1', 'value1');
		});

		it("should fail when checking header value incorrectly", function(){
			new ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().headerValue('key1', 'value2', function(err){
	            	expect(err).toBeDefined();
	            });
		});

	});

	xit("should check for correct value of existing header", function(){

		new ReqTest(app)
            .given({
                url: '/get/one',
                method: 'get'
            })
            .expectHeader('key1', 'value1');

	});

	xit("should throw when checking invalid header existence", function(){

		new ReqTest(app)
            .given({
                url: '/get/one',
                method: 'get'
            })
            .expectHeader('key1', 'value1');

	});

});
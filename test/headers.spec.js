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
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().headerExists('key1');
		});

		it("should pass when checking header value", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().headerValue('key1', 'value1');
		});

		it("should fail when checking header value incorrectly", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().headerValue('key1', 'value2', function(err){
	            	expect(err).toBeDefined();
	            });
		});

        it("should pass when checking incorrect header value", function(){
            ReqTest(app)
                .given({
                    url: '/get/one',
                    method: 'get'
                })
                .check().headerValue('key1', 'value2', function(err){
                    expect(err).toBeDefined();
                });
        });

	});

    describe("Checking non-existing header", function(){

        it("should fail when asking if header exists", function(){
            ReqTest(app)
                .given({
                    url: '/get/one',
                    method: 'get'
                })
                .check().headerExists('key0', function(err){
                    expect(err).toBeDefined();
                });
        });

        it("should fail when checking header's value", function(){
            ReqTest(app)
                .given({
                    url: '/get/one',
                    method: 'get'
                })
                .check().headerValue('key0', 'value0', function(err){
                    expect(err).toBeDefined();
                });
        });

    });

});
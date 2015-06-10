var ReqTest = require('../').ReqTest,
	express = require('express');

describe("Response content", function () {

	var app;

	beforeEach(function(){
		app = express();
	});

	describe("Using 'write' only", function(){

		beforeEach(function(){
			app.get('/get/one', function (req, res) {
			    res.write("firstWord ");
			    res.write("secondWord ");
			    res.write("thirdWord");
			});
		});

		it("should pass when expected valid response content", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().content('firstWord secondWord thirdWord');
		});

		it("should fail when expected invalid response content", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().content('incorrect!!', function(err){
	            	expect(err).toBeDefined();
	            });
		});

	});

	describe("Using 'end' only", function(){

		beforeEach(function(){
			app.get('/get/one', function (req, res) {
			    res.end("summary");
			});
		});

		it("should pass when expected valid response content", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
            	.check().content('summary');
		});

		it("should fail when expected invalid response content", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().content('incorrect!!', function(err){
	            	expect(err).toBeDefined();
	            });
		});

	});

	describe("Using both 'write' and 'end'", function(){

		beforeEach(function(){
			app.get('/get/one', function (req, res) {
			    res.write("firstWord ");
			    res.write("secondWord ");
			    res.write("thirdWord ");
			    res.end("summary");
			});
		});

		it("should pass when expected valid response content", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
            .check().content('firstWord secondWord thirdWord summary');
		});

		it("should fail when expected invalid response content", function(){
			ReqTest(app)
	            .given({
	                url: '/get/one',
	                method: 'get'
	            })
	            .check().content('incorrect!!', function(err){
	            	expect(err).toBeDefined();
	            });
		});

	});

});
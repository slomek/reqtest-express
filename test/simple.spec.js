var http = require('http');

var express = require('express');
var _ = require('underscore')._;




var app = express();
app.get('/getOne', function(req,res){
	console.log('res.end(success);')
    res.end('success');
});

describe("Simple", function(){

  it("abcde", function(){

  	var builders = require('.././lib/builders');
  	var request = builders.buildRequest({
    		url: '/getOne',
    		method: 'get'
	    }),
  		response = {
	    	end: _.noop,
	    	__proto__: http.ServerResponse.prototype
	    }

	var MockResponse = new builders.MockResponse();

	spyOn(response, 'end');

    app.handle(request, MockResponse.response)

    // expect(response.end).toHaveBeenCalled();

    MockResponse.expectEnd('a')

    /*
    {
    		url: '/getOne',
    		method: 'get'
	    }
	    */
  });

});
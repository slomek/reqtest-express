var http = require('http');

var express = require('express');
var _ = require('underscore')._;


var app = express();
app.get('/getOne', function (req, res) {
    console.log('res.end(success);');
    res.setHeader('a', 'def')
    res.write('pre ')
    res.end('success');
});

xdescribe("Simple ", function () {


    it("xyz", function() {

        var ReqTest = require('../lib/ReqTest').ReqTest;

        new ReqTest()
            .given(app, {
                url: '/getOne',
                method: 'get'
            })
            .expectHeader('a', 'def')
            .expectContent('pre success');


    });

});
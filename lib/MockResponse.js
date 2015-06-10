var http = require('http'),
    _ = require('underscore')._;

module.exports.MockResponse = function() {

	var raw = {
            write: appendToContent,
	    	end: appendToContent,
	    	__proto__: http.ServerResponse.prototype
	    },
	    content = '';

    function appendToContent(value) {
        content += value;
    }

    this.getRaw = function() {
    	return raw;
    };

	this.getContent = function() {
		return content;
	};

	this.check = {

		content: function(expectedContent, callback) {
            handleValidation(TextEqualityCheck(content), expectedContent, callback);

            return this;

        },

        headerExists: function(headerName, callback) {
            var headerValue = raw.getHeader(headerName);
            handleValidation(ExistanceCheck(headerValue), null, callback);

            return this;
        },

        headerValue: function(headerName, expectedValue, callback) {
            var headerValue = raw.getHeader(headerName);
            handleValidation(TextEqualityCheck(headerValue), expectedValue, callback);

            return this;
        }

	};

    function handleValidation(checker, expectedContent, callback) {
        try {
            var result = checker.validator(expectedContent);

            if(callback) {
                callback();
            }

            expect(result).toBeTruthy();

        } catch(err) {
            (callback || checker.callback)(err);
        } 
    }

    function TextEqualityCheck(actualValue) {
        this.validator = function(expectedContent) {
            if(actualValue !== expectedContent) {
                throw {
                    actual: actualValue,
                    expected: expectedContent
                };
            }

            return true;
        };

        this.callback = function(err) {
            expect(err.actual).toEqual(err.expected);
        };

        return this;
    }

    function ExistanceCheck(actualValue) {
        this.validator = function() {
            if(actualValue == null || typeof actualValue === 'undefined') {
                throw {
                    actual: actualValue,
                    expected: true
                };
            }

            return true;
        };

        this.callback = function(err) {
            expect(err.actual).toBeDefined();
        };

        return this;
    }

};
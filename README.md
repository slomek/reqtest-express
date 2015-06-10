# reqtest-express

Simple testing framework for testing Express.js middleware
[![Build Status](https://travis-ci.org/slomek/reqtest-express.svg?branch=master)](https://travis-ci.org/slomek/reqtest-express)

## Idea
  The idea behind this project is to provide a simple mechanism to test requests to the Express-based NodeJS server.

## Usage
```js
ReqTest(app)
    .given({
        url: '/get/one',
        method: 'get'
    })
    .check()
        .content('expectedContent')
        .headerExists('Content-Type')
        .headerValue('Header-Name', 'Header-Value');
```

  For more examples of use please refer to the tests in `test` directory

## API

### MockRequest configuration
#### options.url
The URL or a request sent to the server
#### options.method
The HTTP method used for the request
#### options.[custom-field]
Any custom field added to the request object

### MockRespone assertions
  To enter assertion mode one must call `check()` method right after `given(MockRequest)`.
#### content(expectedValue[, errorCallback])
Checks if the response has given content. For errorCallback see section below.
#### headerExists(headerName[, errorCallback])
Checks if the response has a non-empty header of given name. For errorCallback see section below.
#### headerValue(headerName, headerValue[, errorCallback])
Checks if the response has a header with specific value. For errorCallback see section below.

### Error callbacks
  In order to assert that the test should fail (eg. response header does not exist) one can provide errorCallback to suppress original expect error and handle it. Example simple handler for assumint that the error is thrown may look like this:
```js
    (...)
    .check()
        .headerExists('Content-Type', function(err){
            expect(err).toBeDefined();
        });
```

## Notes

  Inspired by [supertest](https://github.com/visionmedia/supertest).

## License

  MIT
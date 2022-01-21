/*
  Distant API testing.
*/

// Needed for the BACK_SERVER_URL variable
require('dotenv').config()


var should = require("should");   // Verbose and clear testing.
var request = require("request"); // Requesting the distant API.
var chai = require("chai");
var expect = chai.expect;
var urlBase = process.env.BACK_SERVER_URL+"/api/v1";

// Test case
describe("Back server API test",function() {
  // Testing /user : we need to have at least 1 user with a username that is a string.
  it("User with id=1 should exist and have a string a 'username'",function(done) {
    console.log(process.env.BACK_SERVER_URL);

    request.get({
        url : urlBase + "/user/1"
      },
      function(error, response, body) {
        // Convert the response to json.
        var _body = {};
        try{
          _body = JSON.parse(body);
        } catch(e) {
          _body = {};
        }

        // Using chai expect function, we check that the result is 200 (OK).
        expect(response.statusCode).to.equal(200);

        // Does the response has a 'username' property ?
        if( _body.should.have.property('username') ){
          // Is it a string ?
          expect(_body.username).to.be.a('string');
        }

        done();
      }
    );
  });
});


var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("Testing the forecast API", () => {
	it ("Testing the forecast API with wrong zipcode", (done)=>{
		chai.request(server)
			.get("/forecast/aaaa")
			.end((err, result)=>{
				result.body.should.have.status('failed');
				result.body.should.have.property('message');
				done()
		})
	})

it ("Testing the forecast API with correct zipcode", (done)=>{
	chai.request(server)
		.get("/forecast/02119")
		.end((err, result)=>{
			result.body.should.have.status('success');
			result.body.should.have.property('val');
			done()
	})
})
})
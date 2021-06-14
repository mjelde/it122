const expect = require("chai").expect
const data = require('../data.js');

describe("Speaker Data", () => {
 it("returns requested item", function() {
   var result = data.getItem("happiness");
   expect(result).to.deep.equal({name: "happiness", speaker:"Jennifer Allen", birthDate:1992, birthPlace:"Ruston, VA"});
   //{name: "happiness", speaker:"Jennifer Allen", birthDate:1992, birthPlace:"Ruston, VA"}
 });

 it("fails w/ invalid name", () => {
   var result = data.getItem("fake");
   expect(result).to.be.undefined;
 });

 it("add a valid speaker", () => {
   var result = data.addItem({name: "fun", speaker:"John Smith", birthDate:1979, birthPlace:"Austin, TX"});
   expect(result.added).to.be.true;
   console.log(result);
 });

 it("fails if name empty", () => {
   var result = data.addItem({name: "", speaker:"John Smith", birthDate:1979, birthPlace:"Austin, TX"});
   expect(result.added).to.be.false;
   console.log(result);
 });

 it("delete a valid speaker", () => {
   var result = data.deleteItem("happiness");
   expect(result.deleted).to.be.true;
 });

 it("fails if name empty", () => {
   var result = data.deleteItem("fake");
   expect(result.deleted).to.be.false;
 });

});
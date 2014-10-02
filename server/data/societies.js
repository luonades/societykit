//////////////////////////// ELEMENT: SOCIETIES (SERVER) /////////////////////////
/*
An abstract class for handling any kinds of "societies".
*/
Societies = {};

//////////////////////////// MODEL ////////////////////////////
//// CREATE DATABASE COLLECTION
Societies.Data = new Meteor.Collection("societies");

//// INSERT INITIAL DATA
//Meteor.startup(function () {});

//////////////////////////// VIEW ////////////////////////////
//// SELECT
Meteor.publish("societies", function( parameters ) {
  var cursor = Societies.Data.find();
  console.log("Societies::publish: Parameters: " + EJSON.stringify(parameters) + ". Return: " + EJSON.stringify( cursor.fetch() ) );
  return cursor;
});

Societies.Data.allow({
//// INSERT
insert: function() {
  return true;
},
  
//// UPDATE
update: function() {
  return true;
},

//// REMOVE
remove: function() {
  return true;
}
});

//////////////////////////// CONTROLLER ////////////////////////////
//// INTERFACE FOR OTHER ELEMENTS
//Societies.fn = function () {}

//// CONNECT TO OTHER ELEMENTS
//Meteor.startup(function(){ //Txtcmd.set([]); });

//////////////////////////// END OF FILE ////////////////////////////
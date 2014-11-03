//////////////////////////// ELEMENT: SITEEDITOR ////////////////////////////
/*
This class enables editing the contents of the website in any element.

NOTE! The SiteEditor class might prove unnecessary for the system and deleted
from the code at some point.
This class may also be somewhat overlapping with the SiteEditor class.
More software design is needed in this issue.
*/
SiteEditor = {};

//////////////////////////// MODEL ////////////////////////////
//// CREATE DATABASE COLLECTION
//SiteEditor.data = new Meteor.Collection("siteEditor");
//Meteor.subscribe("siteEditor");

//// INITIALIZE
//Meteor.startup(function(){});

//////////////////////////// VIEW ////////////////////////////
//// TEMPLATE
SiteEditor.template = Template.siteEditor;
//SiteEditor.template.helpers({});

/*
Function: SITEEDITOR::RIGHTS()
Description: Tells what rights the currently logged user has
with regards to editing the contents.
*/
SiteEditor.template.rights = function () {
  // TODO Get current user's role
  var role = "admin";
  
  // Use my own access control list to define rights to edit
  return SiteEditor._rigts[role];
}

//// EVENTS
//SiteEditor.template.events({});

//////////////////////////// CONTROLLER ////////////////////////////
Session.setDefault("siteEditorEditing",false);
SiteEditor.computation = Tracker.autorun(function() {
  //// OWN VARIABLES
  Object.defineProperties(SiteEditor, {
    
    editing: {
      get: function () {
        return Session.get("siteEditorEditing");
      },
      set: function (value) {
        
        if( value === true ) {
          // TODO Set body a class .editing
        }
        else {
          // TODO Remove class .editing from body
        }
        
        Session.set("siteEditorEditing", value);
        return true;
      }
    },
    
    _rights: {
      value: {
        
        "admin": true,
        "author": true,
        "user": false,
        "notlogged": false
      }
    }
  });
});

//// INTERFACE FOR OTHER ELEMENTS
//SiteEditor.fn = function () {...}

//// CONNECT TO OTHER ELEMENTS
//Meteor.startup(function(){});

//////////////////////////// END OF FILE ////////////////////////////
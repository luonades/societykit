//////////////////////////// ELEMENT: SOURCES ////////////////////////////
/*
- Handles data about "sources": adding/elementing/deleting
*/
Sources = {};

//////////////////////////// MODEL ////////////////////////////
//// CREATE DATABASE COLLECTION
Sources.Data = new Meteor.Collection("sources");
Meteor.subscribe("sources");

//// INITIALIZE
//Meteor.startup(function(){});

//////////////////////////// VIEW ////////////////////////////
//// TEMPLATE: SOURCES
Sources.template = Template.sources; // Rename the template

// Function: Returns whether the user is currently adding a new item and the add form fields should thus be shown.
Sources.template.adding = function() {
  return Sources._adding;
}

// Function: Lists all the sources in the database
Sources.template.list = function() {
  return Sources.Data.find();
}

// Function: Validates the data of a single 'source' item. Returns 'false' if all 
Sources.validate = function(data) {
  var isValid = true;
  var invalids = {};
  
  // TODO: Validate all the fields of the given source
  /*
  if( typeof data.name === "undefined" ) {
    invalids[data.name] = "Sorry, error on the website.";
    console.log("Sources::source::validate   Data: "+EJSON.stringify(data)+" -> name is missing." );
    isValid = false;
  }
  
  if( !data.name.length ) {
    invalids[data.name] = "Name of the source can not be empty";
    isValid = false;
  }
  // TODO: Unique name for txt 1?
  
  if( isValid ) {
    console.log( "Sources::source::validate   Data: "+EJSON.stringify(data)+" -> Valid!" );
    return false;
  }
  else {
    console.log( "Sources::source::validate   Data: "+EJSON.stringify(data)+" -> Invalid values: " + EJSON.stringify(invalids) );
    return invalids;
  }
  */
  
  if( isValid ) {
    return false;
  }
  else {
    return invalids;
  }
}


//// TEMPLATE: (A SINGLE) SOURCE
Sources.source = {};
Sources.source.template = Template.source;

// Function: get state (= is the source item shown in the list, view, edit or remove mode)
Sources.source._getState = function(_id) {
  var states = Sources._states;
  var state = states[_id];
  if( typeof state === "undefined" ) {
    state = Sources.source._defaultState;
  }
  return state;
}
// Function: return true, if the state (view, editing, removing, etc.) of the source is the same as given in the parameter
Sources.source.template.isState = function(state) {
  return (state === Sources.source._getState(this._id));
}

// Function: Returns all possible 'media types' of a source.
// Used by: EDIT SOURCE template and ADD SOURCE template
Sources.source.template.mediatypeValues = function () {
  //var sources2 = Sources2.get();
  // TODO Selected - under if statement. Put the 'selected:"selected"' field only on the selected source.
  
  // TODO Check if the current value is invalid/outdated, inform this to the user on the screen
  
  return [
    {value:"literature",title:"Literature",selected:this.dropdown}, 
    {value:"www",title:"WWW",selected:this.dropdown}, 
    {value:"other",title:"Other",selected:this.dropdown}
  ];
}

// Function: Returns all possible 'availability' types of a source
// Used by: EDIT SOURCE template and ADD SOURCE template
Sources.source.template.availabilityValues = function () {
  //var sources2 = Sources2.get();
  // TODO Selected - under if statement. Put the 'selected:"selected"' field only on the selected source.
  // TODO Check if the current value is invalid/outdated, inform this to the user on the screen
  return [
    {value:"available",title:"Available",selected:this.dropdown}, 
    {value:"restrictedAccess",title:"Restricted access",selected:this.dropdown}, 
    {value:"unavailable",title:"Unavailable",selected:this.dropdown}
  ];
}



//// TEMPLATE: EDIT A SOURCE
Sources.source.template.edit = Template.sourceEdit; // Rename the template

// Inherit functions
Sources.source.template.edit.checked = Items.checked;
Sources.source.template.edit.selected = Items.selected;
Sources.source.template.edit.mediatypeValues = Sources.source.template.mediatypeValues;
Sources.source.template.edit.availabilityValues = Sources.source.template.availabilityValues;



//// TEMPLATE: ADD A SOURCE
Sources.source.template.add = Template.sourceAdd; // Rename the template

// Inherit functions
Sources.source.template.add.checked = Items.checked;
Sources.source.template.add.selected = Items.selected;
Sources.source.template.add.mediatypeValues = Sources.source.template.mediatypeValues;
Sources.source.template.add.availabilityValues = Sources.source.template.availabilityValues;



//// EVENTS
Sources.template.events({
  
  // KEYBOARD NAVIGATION & MANIPULATION
  // TODO Use arrow keys, tab, enter and esc to navigate and edit sources
  
  // TODO Click outside everything --> remove listDetails
  
  // SOURCE: ADD
  'click #sourcesAddNew': function (evt, tmpl) {
    Sources._adding = true;
    console.log("Sources   Clicked 'Add new item'!");
  }
  ,
  'click #sourceAdd .add': function (evt, tmpl) { 
    console.log( "SourceAdd .add clicked. this = " + EJSON.stringify(this) );
    Items.add(evt, tmpl, Sources, this, '#sourceAdd')
    
  }
  ,
  'click #sourceAdd .cancel': function (evt, tmpl) {
    console.log("Sources::add   Reset form.");
    
    // Close the adding form
    Sources._adding = false;
  }
  // TODO: Automatic real-time validations while the user types in content -> inform the user
});
Sources.source.template.events({
  
  // SOURCE: LIST
  'click .sourceList': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::click.list" );
    
    // Show details on source
    parent._states = {listDetails:context._id};
  },
  
  // SOURCE: SELECT
  'click .sourceSelect': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "listDetails" );
    parent._states = {list:context._id};
  },
  
  // SOURCE: LIST DETAILS
  'click .sourceListDetails': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::list" );
    parent._states = {list:context._id};
  },
  'click .sourceListDetails .open': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::open" );
    parent._states = {view:context._id};
    evt.stopImmediatePropagation();
  },
  
  // SOURCE: VIEW
  'click .sourceView .close': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::close" );
    parent._states = {listDetails:context._id};
  },
  'click .sourceView .edit': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::edit" );
    parent._states = {edit:context._id};
  },
  'click .sourceView .remove': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::remove" );
    parent._states = {remove:context._id};
  },
  
  // SOURCE: EDIT
  'click .sourceEdit .edit': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::edit::commit" );
    
    evt.preventDefault();
    
    // Get data
    var form = {};
    $.each($('.sourceEdit').serializeArray(), function(){ form[this.name] = this.value; });
    
    // Validations for form data
    var invalids = parent.source.validate(form);
    
    if( !invalids ) {
      parent.Data.update({_id:context._id},{$set:form},{},
        function(error, affectedRowsCount) {
          if( !error ) {
            console.log("Sources::" + context._id + "edit   Edited source " + EJSON.stringify( form ) );
            parent._states = {view:context._id};
          }
          else {
            console.log("Sources::" + context._id + "edit   Error in editing source:" + EJSON.stringify(error) );
          }
        }
      );
    }
    else {
      // TODO Show erronous fields from 'invalids' variable
      console.log( "Sources::" + context._id + "edit   Not valid form data given." );
    }
  },
  'click .sourceEdit .cancel': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::edit::cancel" );
    parent._states = {view:context._id};
  },
  // TODO: Automatic real-time validations while the user types in content -> inform the user
  
  // SOURCE: REMOVE
  'click .sourceRemove .remove': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::remove::confirm" );
    
    evt.preventDefault();
    
    parent.Data.remove({_id:context._id},
      function(error) {
        if( !error ) {
          console.log("Sources::" + context._id + "remove   Removed source." );
          parent._states = {list:context._id};
        }
        else {
          console.log("Sources::" + context._id + "remove   Error in removing source:" + EJSON.stringify(error) );
        }
      }
    );
  },
  'click .sourceRemove .cancel': function (evt, tmpl) {
    var parent = Sources;
    var context = this;
    console.log( "Sources::" + context._id + "::remove::cancel" );
    parent._states = {view:context._id};
  }
  
});




//////////////////////////// CONTROLLER ////////////////////////////

// Private properties
Session.setDefault("sourcesAdding",false);
Session.setDefault("sourcesStates","{}");

Sources._adding = false; // Is the user now adding a new item so that the form fields should be visible.
Sources._multiSourceStates = ["select"];
Sources.source._defaultState = "list";

Object.defineProperties(Sources, {
  _adding: {
    get: function () {
      return Session.get("sourcesAdding");
    },
    set: function (update) {
      Session.set("sourcesAdding", update);
    }
  },
  
  _states: {
    // Save the object _states as a JSON string to the Meteor's session variable 'sourcesStates'
    get: function () {
      return EJSON.parse( Session.get("sourcesStates") );
    },
    set: function (update) {
      var self = Sources;
      
      // Turn the JSON string into a javascript object
      var states = EJSON.parse( Session.get("sourcesStates") );
      
      // Get update object (usually only for iteration is made)
      for(var state in update) {
        
        // Id of the source to be updated
        var id = update[state];
        
        // Set default state for all other sources
        for( otherId in states ) {
          
          // The set source's state is NOT in the same state as this source, or this source is NOT in a multi-source state?
          if( state !== states[otherId] || ($.inArray( states[otherId] === -1), self._multiSourceStates ) ) {
            // Set to default state
            delete states[otherId];
          }
        }
        
        // Set default state for this source?
        if( state === self.source._defaultState ) {
          // Remove source
          delete states[id];
        }
        // Non-default state?
        else {
          // Save the new state
          states[id] = state;
        }
      }
      
      // Save in the session variable
      Session.set("sourcesStates", EJSON.stringify(states));
    }
  }
});

/*Sources.computation = Tracker.autorun(function() {
  //////// OWN VARIABLES
  //Object.defineProperties(Sources, {});
});
*/

//////// INTERFACE FOR OTHER ELEMENTS
// Function: get sources data
Sources.get = function (selector) {
  console.log("Sources::get");
  var self = Sources;
  
  if( typeof selector !== "object" ) {
    selector = {};
  }
  
  var data = self.Data.find();
  
  // TODO Some access control?
  
  return data;
}




//// CONNECT TO OTHER ELEMENTS
Meteor.startup(function(){
  // Computation: Updates when the selected Page changes
  Sources.computation = Tracker.autorun(function() {
    
    // Page changes away from "Data"?
    if( Page.getPage() !== "data" ) {
      
      // Close all "adding" form elements
      Sources._adding = false;
    }
  });
});


//////////////////////////// END OF FILE ////////////////////////////
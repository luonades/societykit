//////////////////////////// ELEMENT: SOCIETIES ////////////////////////////
/*
- An abstract class for handling any kinds of "societies".
- Includes functionalities for adding/elementing/deleting these societies
on the user interface.
*/
Societies = {};

//////////////////////////// MODEL ////////////////////////////
//// CREATE DATABASE COLLECTION
Societies.Data = new Meteor.Collection("societies");
Meteor.subscribe("societies");

//// INITIALIZE
//Meteor.startup(function(){});

//////////////////////////// VIEW ////////////////////////////
//// TEMPLATE: SOCIETIES
Societies.template = Template.societies;

Societies.template.list = function() {
  return Societies.Data.find();
}
//Societies.template.helpers({});

//// TEMPLATE: SOCIETY
Societies.society = {};
Societies.society.template = Template.society;

// Function: get state
Societies.society._getState = function(_id) {
  var parent = Societies;
  
  var states = parent._states;
  var state = states[_id];
  if( typeof state === "undefined" ) {
    state = parent.society._defaultState;
  }
  
  return state;
}


Societies.society.template.isState = function(state) {
  var parent = Societies;
  var self = this;
  
  //console.log( "Societies::society::template::isState   " + this._id + ": " + state + "="+current+" > " + (state === current) );
  return (state === parent.society._getState(self._id));
}
//Societies.society.template.helpers({});


Societies.society.template.edit = Template.societyEdit;
Societies.society.template.edit.checked = function (field, value) {
  var parent = Societies;
  var tmpl = this;
  console.log( "Tmpl="+EJSON.stringify(tmpl) );
  
  if( tmpl[field] === value ) {
    return 'checked="checked" ';
  }
  else {
    return '';
  }
}
Societies.society.template.edit.selected = function (field, value) {
  var parent = Societies;
  var tmpl = this;
  console.log( "Tmpl="+EJSON.stringify(tmpl) );
  
  if( tmpl.selected === tmpl.value ) {
    return 'selected="selected" ';
  }
  else {
    return '';
  }
}

Societies.society.template.add = Template.societyAdd;
Societies.society.template.add.dropdownValues = function () {
  
  //var societies2 = Societies2.get();
  // TODO Selected - under if statement. Put the 'selected:"selected"' field only on the selected society.
  
  // TODO Check if the current value is invalid/outdated, inform this to the user on the screen
  
  return [{value:"id1",title:"DD1",selected:this.dropdown}, {value:"id2",title:"DD2",selected:this.dropdown}];
}
Societies.society.template.edit.dropdownValues = Societies.society.template.add.dropdownValues;






Societies.society.validate = function(data) {
  var isValid = true;
  var invalids = {};
  
  if( typeof data.name === "undefined" ) {
    invalids[data.name] = "Sorry, error on the website.";
    console.log("Societies::society::validate   Data: "+EJSON.stringify(data)+" -> name is missing." );
    isValid = false;
  }
  
  if( !data.name.length ) {
    invalids[data.name] = "Txt 1 must not be empty.";
    isValid = false;
  }
  // TODO: Unique name for txt 1?
  
  if( isValid ) {
    console.log( "Societies::society::validate   Data: "+EJSON.stringify(data)+" -> Valid!" );
    return false;
  }
  else {
    console.log( "Societies::society::validate   Data: "+EJSON.stringify(data)+" -> Invalid values: " + EJSON.stringify(invalids) );
    return invalids;
  }
}



//// EVENTS
Societies.template.events({
  
  // KEYBOARD NAVIGATION & MANIPULATION
  
  // TODO Use arrow keys, tab, enter and esc to navigate and edit societies
  
  
  // TODO Click outside everything --> remove listDetails
  
  
  // SOCIETY: ADD
  'click #societyAdd .add': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    
    evt.preventDefault();
    
    // Get data
    var form = {};
    $.each($('#societyAdd').serializeArray(), function(){ form[this.name] = this.value; });
    
    console.log( "Form data = " + EJSON.stringify(form) );
    
    // Validations for form data
    var invalids = parent.society.validate(form);
    
    if( !invalids ) {
      parent.Data.insert(form,
        function(error) {
          if( !error ) {
            console.log("Societies::add   Added society " + EJSON.stringify( form ) );
            $('#societyAdd')[0].reset();
          }
          else {
            console.log("Societies::add   Error in adding society:" + EJSON.stringify(error) );
          }
        }
      );
    }
    else {
      // TODO Show erronous fields from 'invalids' variable
      console.log( "Societies::add   Not valid form data given." );
    }
    /*
    var title = template.find(".title").value;
    var description = template.find(".description").value;
    var public = ! template.find(".private").checked;
    var coords = Session.get("createCoords");
    */
    
  },
  'click #societyAdd .cancel': function (evt, tmpl) {
    console.log("Societies::add   Reset form.");
    //$('.societyAdd')[0].reset();
    //return false;
  }
  // TODO: Automatic validations
});


Societies.society.template.events({
  
  // SOCIETY: LIST
  'click .societyList': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::click.list" );
    
    // Show details on society
    parent._states = {listDetails:context._id};
  },
  
  // SOCIETY: SELECT
  'click .societySelect': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "listDetails" );
    parent._states = {list:context._id};
  },
  
  // SOCIETY: LIST DETAILS
  'click .societyListDetails': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::list" );
    parent._states = {list:context._id};
  },
  'click .societyListDetails .open': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::open" );
    parent._states = {view:context._id};
    evt.stopImmediatePropagation();
  },
  
  // SOCIETY: VIEW
  
  'click .societyView .close': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::close" );
    parent._states = {listDetails:context._id};
  },
  'click .societyView .edit': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::edit" );
    parent._states = {edit:context._id};
  },
  'click .societyView .remove': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::remove" );
    parent._states = {remove:context._id};
  },
  
  
  // SOCIETY: EDIT
  
  'click .societyEdit .edit': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::edit::commit" );
    
    evt.preventDefault();
    
    // Get data
    var form = {};
    $.each($('.societyEdit').serializeArray(), function(){ form[this.name] = this.value; });
    
    // Validations for form data
    var invalids = parent.society.validate(form);
    
    if( !invalids ) {
      parent.Data.update({_id:context._id},{$set:form},{},
        function(error, affectedRowsCount) {
          if( !error ) {
            console.log("Societies::" + context._id + "edit   Edited society " + EJSON.stringify( form ) );
            parent._states = {view:context._id};
          }
          else {
            console.log("Societies::" + context._id + "edit   Error in editing society:" + EJSON.stringify(error) );
          }
        }
      );
    }
    else {
      // TODO Show erronous fields from 'invalids' variable
      console.log( "Societies::" + context._id + "edit   Not valid form data given." );
    }
  },
  'click .societyEdit .cancel': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::edit::cancel" );
    parent._states = {view:context._id};
  },
  // TODO: Automatic validations
  
  
  // SOCIETY: REMOVE
  'click .societyRemove .remove': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::remove::confirm" );
    
    evt.preventDefault();
    
    parent.Data.remove({_id:context._id},
      function(error) {
        if( !error ) {
          console.log("Societies::" + context._id + "remove   Removed society." );
          parent._states = {list:context._id};
        }
        else {
          console.log("Societies::" + context._id + "remove   Error in removing society:" + EJSON.stringify(error) );
        }
      }
    );
  },
  'click .societyRemove .cancel': function (evt, tmpl) {
    var parent = Societies;
    var context = this;
    console.log( "Societies::" + context._id + "::remove::cancel" );
    parent._states = {view:context._id};
  }
  
});




//////////////////////////// CONTROLLER ////////////////////////////

Session.setDefault("societiesStates","{}");
Societies.society._defaultState = "list";
Societies._multiSocietyStates = ["select"];

Object.defineProperties(Societies, {
  
  _states: {
    
    get: function () {
      return EJSON.parse( Session.get("societiesStates") );
    },
    
    set: function (update) {
      var self = Societies;
      var states = EJSON.parse( Session.get("societiesStates") );
      
      // Get update object (usually only for iteration is made)
      for(var state in update) {
        
        // Id of the society to be updated
        var id = update[state];
        
        // Set default state for all other societies
        for( otherId in states ) {
          
          // The set society's state is NOT in the same state as this society, or this society is NOT in a multi-society state?
          if( state !== states[otherId] || ($.inArray( states[otherId] === -1), self._multiSocietyStates ) ) {
            // Set to default state
            delete states[otherId];
          }
        }
        
        // Set default state for this society?
        if( state === self.society._defaultState ) {
          // Remove society
          delete states[id];
        }
        // Non-default state?
        else {
          // Save the new state
          states[id] = state;
        }
      }
      
      // Save in the session variable
      Session.set("societiesStates", EJSON.stringify(states));
    }
  }
});

/*Societies.computation = Tracker.autorun(function() {
  //////// OWN VARIABLES
  //Object.defineProperties(Societies, {});
});
*/

//////// INTERFACE FOR OTHER ELEMENTS
// Function: get societies data
Societies.get = function (selector) {
  console.log("Societies::get");
  var self = Societies;
  
  if( typeof selector !== "object" ) {
    selector = {};
  }
  
  var data = self.Data.find();
  
  // TODO Some access control?
  
  return data;
}




// * * * CONNECT TO OTHER ELEMENTS
//Meteor.startup(function(){});


//////////////////////////// END OF FILE ////////////////////////////
/*

*/
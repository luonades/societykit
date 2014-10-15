//////////////// ELEMENT: ITEMS ////////////////
/*
- An abstract class for handling any kinds of "items".
- Includes generic functionalities for adding/elementing/deleting these items
on the user interface, which actual item classes can inherit/copy.
*/
Items = {};

//////////////// MODEL ////////////////

//////////////// VIEW ////////////////
//// TEMPLATE: ITEMS
// Function: If it is true, mark that the value of the field "field" is CHECKED to be "value"
// Used by: Sources
Items.checked = function (field, value) {
  if( this[field] === value ) {
    return 'checked="checked" ';
  }
  else {
    return '';
  }
}
// Function: If it is true, mark that the value of the field "field" is SELECTED to be "value"
// Used by: Sources
Items.selected = function (field, value) {
  if( this.selected === this.value ) {
    return 'selected="selected" ';
  }
  else {
    return '';
  }
}

// Function: Adds an item for which the user has filled in a form
// Used by: Sources, ...
Items.add = function (evt, tmpl, itemsObject, itemContext, formId) {
  
  console.log( EJSON.stringify( itemContext ) );
  console.log( EJSON.stringify( formId ) );
  
  // Prevent the normal action of clicking the "submit" button of a form
  // (which is to upload the form contents and send a new HTML request)
  evt.preventDefault();
  
  // Get the data typed on the form fields
  var form = {};
  $.each($(formId).serializeArray(), function(){ form[this.name] = this.value; });
  console.log( "Form data = " + EJSON.stringify(form) + " for the formId " + formId );
  
  // Validations for form data
  var invalids = itemsObject.validate(form);
  
  // No invalid fields?
  if( !invalids ) {
    
    // Insert the item
    itemsObject.Data.insert(form,
      function(error) {
        if( !error ) {
          console.log("Items::add   Added item " + EJSON.stringify( form ) );
          $(formId)[0].reset();
        }
        else {
          console.log("Items::add   Error in adding an item:" + EJSON.stringify(error) );
        }
      }
    );
  }
  else {
    // TODO Show erronous fields from 'invalids' variable
    console.log( "Items::add   Not valid form data given." );
  }
}

//// EVENTS
//Items.template.events({});



//////////////// CONTROLLER ////////////////


//// INTERFACE FOR OTHER ELEMENTS

//// CONNECT TO OTHER ELEMENTS
//Meteor.startup(function(){});

//////////////// END OF FILE ////////////////
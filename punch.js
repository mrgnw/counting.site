Days = new Mongo.Collection("days");

UI.registerHelper("plus", function(n) {
    return n+1;
});

UI.registerHelper("minus", function(n) {
    return n-1;
});


// CLIENT
if (Meteor.isClient) {
  Meteor.subscribe("days");

  Template.day.helpers(
  );

  Template.body.helpers({
    days: function () { // Show most popular snacks first
      return Days.find();
    },
  });

  Template.body.events({
    "click .new-punch": function (event) {
      Meteor.call("newTally");
      // event.target.text.value = "";  // Clear form
      return false; // Prevent default form submit
    },
    "click .debug": function (event) {
      unlimited = !unlimited;
      console.log("UNLIMITED: " + unlimited);
    },
    "click .nuke": function (event) {
      Meteor.call("nuke");
      return false; // Prevent default form submit
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient


// METHODS
Meteor.methods({
  newTally: function () {
    console.log("Adding tally");
    Days.insert( {'n': 1} );
  },
  nuke : function () {
    // nuke the db
    Days.remove({})
    console.log("You shouldn't have pressed it! We're DOOOMED!");
  },

});


// SERVER
if (Meteor.isServer) {
  Meteor.publish("days", function () {
    return Days.find();
  });

  // publish goal
}

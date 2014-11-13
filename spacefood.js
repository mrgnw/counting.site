Days = new Mongo.Collection("days");

UI.registerHelper("dd", function(timestamp) {
    date = timestamp.getDate();
    return date;
});

UI.registerHelper("hhss", function(timestamp) {
    hh = timestamp.getHours() + ":" + timestamp.getMinutes();
    return hh;
});

// CLIENT
if (Meteor.isClient) {
  Meteor.subscribe("days");

  Template.body.helpers({
    days: function () { // Show most popular snacks first
      return Days.find({}, {sort: {votes: -1, data_ins: -1}});
    }
  });

  Template.body.events({
    "click .new-punch": function (event) {
      Meteor.call("addPunch");
      // event.target.text.value = "";  // Clear form
      return false; // Prevent default form submit
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient


// METHODS
Meteor.methods({
  addPunch: function () {
    // todo: check if today already exists
    Days.insert({
      time: new Date() // current time
    });

    console.log(Days);
  },
});


// SERVER
if (Meteor.isServer) {
  Meteor.publish("days", function () {
    return Days.find();
  });
}

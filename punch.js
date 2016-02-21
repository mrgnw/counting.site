Days = new Mongo.Collection("days");


// CLIENT
if (Meteor.isClient) {
  Meteor.subscribe("days");

  Template.day.events({
    "click .ring": function (event) {
      Meteor.call('plus', this._id);
      return this.n+1;
    }
  }
  );

  Template.body.helpers({
    days: function () {
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
    console.log("Creating tally ring");
    Days.insert( {'n': 0} );
  },
  plus: function (id) {
    var newCount = Days.findOne(id).n+1;
    console.log("NEW COUNT", newCount);
    Days.update(id, {
        $set: {'n': newCount}
      });
  },
  minus: function (id) {

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

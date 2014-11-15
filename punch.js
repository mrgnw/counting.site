Days = new Mongo.Collection("days");
// TODO: create Goal
goal = new Date();
goal.setHours(8, 30);

UI.registerHelper("dd", function(timestamp) {
    date = timestamp.getDate();
    return date;
});

UI.registerHelper("hhss", function(timestamp) {
    hh = timestamp.getHours()
    mm = timestamp.getMinutes();
    display = hh + ":";
    if (mm < 10) { display += "0" + mm; }
      else { display += mm; }

    return display;
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
    },
    "submit .new-goal": function (event) {
      Meteor.call("changeGoal");
      return false;
    },
    "click .nuke": function (event) {
      Meteor.call("nuke");
      return false; // Prevent default form submit
    },
    "isOnTime": function(time) {
      Meteor.call("isOnTime");
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient


// METHODS
Meteor.methods({
  addPunch: function () {
    var start = new Date();
    start.setHours(0,0,0);
    var end = new Date();
    end.setHours(23,59,59);
    var x = Days.find({time: {$gte: start, $lt: end}}).count();

    if (x == 0) {
      Days.insert({ time: new Date() });
    } else {
      console.log("You already have an entry on that date");
    }
  },
  changeGoal: function (time) {
    // TODO: update goal
  },
  nuke : function () {
    // nuke the db
    Days.remove({})
    console.log("You shouldn't have pressed it! We're DOOOMED!");
  },
  isOnTime: function(time) {
    // Make the dates match

    

    return time < goal;
  }

});


// SERVER
if (Meteor.isServer) {
  Meteor.publish("days", function () {
    return Days.find();
  });

  // publish goal
}

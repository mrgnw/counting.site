Days = new Mongo.Collection("days");

goal = new Date();
goal.setHours(8, 30);

var unlimited = false;

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

function isOnTime(time) {
  return time > goal;
}

function isFirstToday(){
  var start = new Date();
  start.setHours(0,0,0);
  var end = new Date();
  end.setHours(23,59,59);
  var x = Days.find({time: {$gte: start, $lt: end}}).count();
  return (x < 1);
}

// CLIENT
if (Meteor.isClient) {
  Meteor.subscribe("days");

  Template.day.helpers({
  isOnTime: function (t) {
    console.log("the time is " + t);
    console.log(goal);
    return (t < goal);
  }
});

  Template.body.helpers({
    days: function () { // Show most popular snacks first
      return Days.find({}, {sort: {votes: -1, data_ins: -1}});
    },
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
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient


// METHODS
Meteor.methods({
  addPunch: function () {
    if (isFirstToday()) {
      Days.insert({ time: new Date() });
    } else if (unlimited){
      console.log("You. Are. LIMITLESS")
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
    console.log("On Time: " + time < goal);
    return (time < goal);
  }

});


// SERVER
if (Meteor.isServer) {
  Meteor.publish("days", function () {
    return Days.find();
  });

  // publish goal
}

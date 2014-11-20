Days = new Mongo.Collection("days");

goal = new Date();
goal.setHours(9,30,59);

var unlimited = false;
if (unlimited)(console.log("You. Are. LIMITLESS"));
console.log(goal);

var dayCount = 1
function randomDate() {
    var start = new Date();
    var end = new Date();
    end.setHours(14, 26);

    var result = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    // console.log("result: " + result);
    result.setDate(new Date().getDate() + dayCount);
    console.log("generated: " + result);
    dayCount += 1;

    return result;
}

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
  // only compare hours (for testing).
  var goal_copy = new Date();
  goal_copy.setHours(goal.getHours());
  console.log(goal_copy);

  return (time <= goal_copy);
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
    return (t < goal);
  }
});

  Template.body.helpers({
    days: function () { // Show most popular snacks first
      return Days.find({}, {sort: {time: -1}});
    },
  });

  Template.body.events({
    "click .new-punch": function (event) {
      var new_date;
      var shouldAdd = true;

      if (isFirstToday() && !unlimited){
        console.log('1st & normal');
        new_date = new Date();
      } else if (isFirstToday() && unlimited) {
        console.log("1st & unlimited");
        new_date = new Date();
      } else if (unlimited) {
        console.log("just unlimited");
        new_date = randomDate();
      } else {
        console.log("Noooope. Not adding anything");
        should_add = false;
      }

      console.log("");
      console.log(new_date);
      console.log("");

      if (shouldAdd) {
        Meteor.call("addPunch", new_date);
      }

      // event.target.text.value = "";  // Clear form
      return false; // Prevent default form submit
    },
    "submit .new-goal": function (event) {
      Meteor.call("changeGoal");
      return false;
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
  addPunch: function (date) {
    console.log("");
    console.log("Adding..." + date);
    console.log("");
    Days.insert( {time: date} );
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

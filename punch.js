Days = new Mongo.Collection("days");

goal = new Date();
goal.setHours(9,30,59);
//TODO: add onTime attribute to each day.
// -> https://www.meteor.com/try/8

var unlimited = false;
if (unlimited)(console.log("You. Are. LIMITLESS"));
console.log(goal);

// TODO: Set dayCount dynamically
  // get highest date. if > today, daycount = highest - today.
var dayCount = 1;

function randomDate() {
    var start = new Date();
    start.setHours(0,0,0);
    var end = new Date();
    end.setHours(14, 26);

    var result = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    result.setDate(new Date().getDate() + dayCount);
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
  compareTime: function (t) {
    if (t){
      var goal_copy = new Date(t.getTime());
      goal_copy.setHours(goal.getHours());
      console.log("");
      console.log(t);
      console.log(goal_copy);
      var result = (t <= goal_copy);
      console.log("= ", result);
      return result;
    }
    else {
      console.log(t + " is undefined")
    }

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
        // console.log('1st & normal');
        new_date = new Date();
      } else if (isFirstToday() && unlimited) {
        // console.log("1st & unlimited");
        new_date = new Date();
      } else if (unlimited) {
        // console.log("just unlimited");
        new_date = randomDate();
      } else {
        // console.log("Noooope. Not adding anything");
        shouldAdd = false;
      }

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
      dayCount = 1; // reset
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
    console.log("Adding..." + date);
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

});


// SERVER
if (Meteor.isServer) {
  Meteor.publish("days", function () {
    return Days.find();
  });

  // publish goal
}

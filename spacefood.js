Snacks = new Mongo.Collection("snacks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    snacks: function () { // Show most popular snacks first
      return Snacks.find({}, {sort: {votes: -1, data_ins: -1}});
    }

  });

  Template.body.events({
    "submit .new-snack": function (event) {
      // This function is called when the new snack form is submitted
      var text = event.target.text.value;

      Meteor.call("addSnack", text);
      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  // TODO: Highlight current user likes
  Template.snack.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteSnack", this._id);
  },
  "click .upVote": function () {
    Meteor.call("toggleLike", this);
  }
});

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient


Meteor.methods({
  addSnack: function (text) {
    // Make sure the user is logged in before inserting a snack
    if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

    Snacks.insert({
      text: text,
      votes: 1,
      likers: [Meteor.user().username],
      createdAt: new Date() // current time
    });
  },
  deleteSnack: function (SnackId) {
    Snacks.remove(SnackId);
  },
  setChecked: function (SnackId, setChecked) {
    Snacks.update(SnackId, { $set: { checked: setChecked} });
  },
  toggleLike: function(snack) {
    // If logged in:
    var user = Meteor.user().username;
    likers = Snacks.findOne(snack._id).likers;
    isLiker = (likers.indexOf(user) != -1);

    function dislike (snack) { // -1, remove user from likers
      Snacks.update(snack._id, {$set: {votes: snack.votes - 1 }});
      Snacks.update(snack._id, {$pull: {likers: user }});
    }

    var like = function(snack) { // +1, add user to likers
      Snacks.update(snack._id, {$set: {votes: snack.votes + 1 }});
      Snacks.update(snack._id, {$push: {likers: user }});
    }

    if(user){
      //  DISLIKE: User in likers
      if(isLiker){ dislike(snack);
      } else { like(snack);
      }
    } else {
      // not logged in
      // todo: ask to log in.
    }
  }

});

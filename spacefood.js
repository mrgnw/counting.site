Snacks = new Mongo.Collection("snacks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    snacks: function () {
      // Show most popular snacks first
      return Snacks.find({}, {sort: {votes: -1, data_ins: 1}});
    }

  });

  Template.body.events({
    "submit .new-snack": function (event) {
      // This function is called when the new snack form is submitted
      var text = event.target.text.value;

      Snacks.insert({
        text: text,
        votes: 1,
        likers: [Meteor.user().username],
        createdAt: new Date() // current time
      });

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
    Snacks.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    Snacks.remove(this._id);
  },
  "click .upVote": function () {
    // If logged in:
    var user = Meteor.user().username;
    likers = Snacks.findOne(this._id).likers;
    isLiker = (likers.indexOf(user) != -1);

    var dislike = function(snack) { // -1, remove user from likers
      Snacks.update(snack._id, {$set: {votes: snack.votes - 1 }});
      Snacks.update(snack._id, {$pull: {likers: user }});
    }

    var like = function(snack) { // +1, add user to likers
      Snacks.update(snack._id, {$set: {votes: snack.votes + 1 }});
      Snacks.update(snack._id, {$push: {likers: user }});
    }

    if(user){
      //  DISLIKE: User in likers
      if(isLiker){ dislike(this);
      } else { like(this);
      }
    } else {
      // not logged in
      // todo: ask to log in.
    }
  }
});

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient

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


  // TODO: Add current user to snack.likers
  // Meteor.user().username
  // TODO: Like/dislike based on current user
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
    // increase current votes by 1
    Snacks.update(this._id, {$set: {votes: this.votes +1 }});

    // Add current user to likers
    Snacks.update(this._id, {$push: {likers: { $each: [Meteor.user().username]}}})
  }

//   db.students.update(
//    { name: "joe" },
//    { $push: { scores: { $each: [ 90, 92, 85 ] } } }
// )


});

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient

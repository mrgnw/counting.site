Days = new Mongo.Collection("days");


// CLIENT
if (Meteor.isClient) {

  Meteor.subscribe("days");
  var nullSelection = 'Dracula! Ah, ha, ha';
  Session.set('selectedCount', nullSelection);

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

} // isClient


// METHODS
Meteor.methods({
  newTally: function () {
    console.log("Creating tally ring");
    // uses rzymek:randomcolor
    newColor = randomColor({
      luminosity: 'dark',
      // hue: 'purple'
    });
    // if logged in
    if(Meteor.userId()) {
      Days.insert({'n':0, 'name': '', color:newColor, userId: Meteor.userId()})
    }
    else { // not logged in
      Days.insert( {'n': 0, 'name': ''} );
    }
  },
});


// SERVER
if (Meteor.isServer) {
  Meteor.methods({
    add: function(id, x) {
      var n = Days.findOne(id).n;
      var newCount = n + x;
      // if(x < 0) { console.log(n + "" + x, "=", newCount); }
      // else { console.log(n + "+" + x, "=", newCount); }

      Days.update(id, {
        $set: {'n': newCount}
      });
    },
    plus: function (id) {
      Meteor.call("add", id, 1);
    },
    minus: function (id) {
      Meteor.call("add", id, -1);
    },

    nuke : function() {
      // nuke the db
      Days.remove({})
      console.log("You shouldn't have pressed it! We're DOOOMED!");
    },
    delete: function (id) {
      Days.remove({_id: id});
    },
    clear: function (userToClear) {
      Days.remove({userId: userToClear});
    },
  }) // meteor methods
}

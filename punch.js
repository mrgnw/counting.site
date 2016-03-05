Days = new Mongo.Collection("days");


// CLIENT
if (Meteor.isClient) {

  Meteor.subscribe("days");
  var nullSelection = 'Dracula! Ah, ha, ha';
  Session.set('selectedCount', nullSelection);

  globalHotkeys = new Hotkeys();
  globalHotkeys.add({
      combo : "backspace",
      callback : function(){
        Meteor.call('delete', Session.get('selectedCount'));
        console.log("SHOULD DELETE", Session.get('selectedCount'));
        }
      })


  Template.day.events({
    "click .ring": function (event) {
      Meteor.call('plus', this._id);
      return this.n+1;
    },
    "mousedown .ring": function (event) {
         if (event.button == 2) {
             // this code will run on right-click
             Meteor.call('minus', this._id);
             return this.n-1;
           }
       },
    "contextmenu .ring": function (event) {
      return false;
    },
    'mouseover .ring': function (event) {
      // Meteor.call("delete", this._id);
      Session.set("selectedCount", this._id);
      // console.log("ID", this._id);
    },
    'mouseout .ring' : function (event) {
      Session.set("selectedCount", nullSelection);
      // console.log('reset the count. Zero, Ah, ha, ha');
    },


});

  Template.body.helpers({
    days: function () {
      return Days.find();
    },
    speedyTap: function() {
      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
    }
  });

  Template.body.events({
    // todo: keyboard shortcuts - keycode.info/
    "click .new-punch": function (event) {
      Meteor.call("newTally");
      // event.target.text.value = "";  // Clear form
      return false; // Prevent default form submit
    },
    "click .clear": function (event) {
      Meteor.call("clear", Meteor.userId());
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
  add: function(id, x) {
    var n = Days.findOne(id).n;
    var newCount = n+x;

    if(x < 0) { console.log(n + "" + x, "=", newCount); }
    else { console.log(n + "+" + x, "=", newCount); }

    Days.update(id, {
      $set: {'n': newCount}
    });
  },
  plus: function (id) {
    Meteor.call("add", id, 1, function(error, result){
      if(error){  console.log("error adding", error);  }
      if(result){ console.log("+1"); }
    });
  },
  minus: function (id) {
    Meteor.call("add", id, -1, function(error, result){
      if(error){  console.log("error adding", error);  }
      if(result){ console.log("+1"); }
    });
  },

});


// SERVER
if (Meteor.isServer) {
  Meteor.methods({
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
    }
  })
}

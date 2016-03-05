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
  // 'longlick .ring' : function (event) {
  //   Session.set("selectedCount", this._id);
  //   alert("touched", Session.get('selectedCount'));
  // },


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

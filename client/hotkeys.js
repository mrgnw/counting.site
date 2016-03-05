globalHotkeys = new Hotkeys();
globalHotkeys.add ({
  combo : "space",
  callback : function() { Meteor.call('newTally'); }
})

// Mousetrap.bind('del', Meteor.call('delete', Session.get('selectedCount')), 'keyup');
// Mousetrap.bind('backspace', Meteor.call('delete', Session.get('selectedCount')), 'keyup');

globalHotkeys.add ({
  combo : "backspace",
  callback : function() { Meteor.call('delete', Session.get('selectedCount'));}
})

globalHotkeys.add ({
  combo : "del",
  callback : function() { Meteor.call('delete', Session.get('selectedCount'));}
})

globalHotkeys.add ({
  combo : "-",
  callback : function() { Meteor.call('minus', Session.get('selectedCount'));}
})

globalHotkeys.add ({
  combo : "=",
  callback : function() { Meteor.call('plus', Session.get('selectedCount'));}
})


$(document).on("keydown", function (event) {
 if (event.keyCode === 8) {
    event.preventDefault();
  }
});

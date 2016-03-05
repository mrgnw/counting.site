globalHotkeys = new Hotkeys();
globalHotkeys.add ({
  combo : "space",
  callback : function() { Meteor.call('newTally'); }
})

globalHotkeys.add ({
  combo : "del",
  callback : function() { Meteor.call('delete', Session.get('selectedCount')); },
})

globalHotkeys.add ({
  combo : "-",
  callback : function() { Meteor.call('minus', Session.get('selectedCount'));}
})

globalHotkeys.add ({
  combo : "=",
  callback : function() { Meteor.call('plus', Session.get('selectedCount'));}
})

// 0123456789

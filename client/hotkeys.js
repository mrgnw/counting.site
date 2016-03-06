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
globalHotkeys.add ({
  combo : "0",
  callback : function() {
    Meteor.call('setCount', Session.get('selectedCount'), 0);
  }
})

globalHotkeys.add ({
  combo : "2",
  callback : function() {
    Meteor.call('add', Session.get('selectedCount'), 2);
  }
})

globalHotkeys.add ({
  combo : "3",
  callback : function() {
    Meteor.call('add', Session.get('selectedCount'), 3);
  }
})

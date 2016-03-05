Meteor.publish("days", function () {
    return Days.find({
      $or: [
        { userId: null },
        { userId: this.userId }
      ]
    });
});

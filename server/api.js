var mainUrl = "http://api.runkeeper.com";
var userURI = "/user";

var accessToken;
var user;

var getUser = function() {
  HTTP.get(mainUrl + userURI, {
    headers: {
      Accept: 'application/vnd.com.runkeeper.User+json',
      Authorization: 'Bearer ' + accessToken
    }
  },function(error, result) {
    if(result) {
      user = JSON.parse(result.content);
    }
    if(error) {
      console.error(result);
    }
  })
};

var getActivities = function() {
  HTTP.get(mainUrl + user["fitness_activities"], {
    headers: {
      Accept: 'application/vnd.com.runkeeper.FitnessActivityFeed+json',
      Authorization: 'Bearer ' + accessToken
    }
  },function(error, result) {
    if(result) {
      console.log(result);
    }
    if(error) {
      console.error(result);
    }
  })
}

Meteor.methods({
  init: function() {
    if(Meteor.user() && Meteor.user().services && Meteor.user().services.runkeeper) {
      accessToken = Meteor.user().services.runkeeper.accessToken;
      getUser();
      getActivities();
    }
  }
});
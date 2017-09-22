// initialize firebase
var config = {
    apiKey: "AIzaSyBVrLMdbFF2eJcsvaRot7T1yqYuXdy-SEI",
    authDomain: "beercast-149f8.firebaseapp.com",
    databaseURL: "https://beercast-149f8.firebaseio.com",
    projectId: "beercast-149f8",
    storageBucket: "beercast-149f8.appspot.com",
    messagingSenderId: "599636463743"
};

firebase.initializeApp(config);

var database = firebase.database();

// ajax call to breweryDB api
var queryURL = "http://api.brewerydb.com/v2/beers?styleId=97&key=e97ade06c4cddc2a58ecba58cb8b4bd9";


$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
	console.log(response);
});
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

var database = firebase.database().ref("/");

var loc = database.child("location");
var beers = database.child("beers");

var statesArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

$(document).ready(function() {
	for (var i = 0; i < statesArray.length; i++) {
		var stateOption = $("<option>");
		stateOption.attr("value", statesArray[i]);
		stateOption.html(statesArray[i]);
		$("#inlineFormCustomSelect").append(stateOption);
	}
});

// adding zip code for weather forecast
$("#submit-btn").on("click", function(event) {
	event.preventDefault();

	//grabs user input
	var userCity = $("#userInput").val().trim();
	var userState = $("#inlineFormCustomSelect").val();
	console.log(userState);

	//create location object
	var newLocation = {
		city: userCity,
		state: userState
	}

	loc.push(newLocation);
	console.log(newLocation);

	// clears the input box
	$("#userInput").val("");
});
	
// ajax call to breweryDB api
var queryURL = "http://api.brewerydb.com/v2/beers?styleId=97&key=e97ade06c4cddc2a58ecba58cb8b4bd9";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
	console.log(response);
});



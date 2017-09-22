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

// creates a "location" child and a "beers" child in the main database
var loc = database.child("location");
var beers = database.child("beers");

// initalize global variables
var userCity;
var userState;

// code for creating a drop down form selector for the states
var statesArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

$(document).ready(function() {
	for (var i = 0; i < statesArray.length; i++) {
		var stateOption = $("<option>");
		stateOption.attr("value", statesArray[i]);
		stateOption.html(statesArray[i]);
		$("#inlineFormCustomSelect").append(stateOption);
	}
});

// function to dynamically add a 3-day weather forecast to the DOM based on city and state input
function createForecast() {
	$("#weatherArea").empty(); // empties weatherArea div so that we don't get duplicates

	var queryURL = "http://api.wunderground.com/api/404b6bf115d36806/forecast/q/" + userState + "/" + userCity + ".json";

	// ajax call the to the Weather Underground API
	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		var response = response.forecast.txt_forecast.forecastday;

		// creates a display card for each day's forecast that contains the date/day, weather image, temperature, and weather description
		 
	});
}


// when button is clicked, createForecast function is called and data is pushed to firebase
$("#submit-btn").on("click", function(event) {
	event.preventDefault();

	//grabs user input
	userCity = $("#userInput").val().trim();
	userState = $("#inlineFormCustomSelect").val();
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
	$("#inlineFormCustomSelect").val("default");

	// adds the city and state values to the html
	$("#spanCity").html(userCity);
	$("#spanState").html(userState);


	createForecast();
});
	
// ajax call to breweryDB api
var queryURL = "http://api.brewerydb.com/v2/beers?styleId=97&key=e97ade06c4cddc2a58ecba58cb8b4bd9";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function(response) {
	console.log(response);
});



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
var beerStyleID;

// code for creating a drop down form selector for the states
var statesArray = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"];

for (var i = 0; i < statesArray.length; i++) {
	var stateOption = $("<option>");
	stateOption.attr("value", statesArray[i]);
	stateOption.html(statesArray[i]);
	$("#inlineFormCustomSelect").append(stateOption);
}


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
		for (var i = 0; i < 6; i++) {
			var weatherCard = $("<div>");
			weatherCard.addClass("card weatherCard text-center");
			weatherCard.attr("style", "background-color: rgba(245, 245, 245, 0.4);");

			var cardImg = $("<img>");
			cardImg.addClass("card-img-top weatherImg");
			cardImg.attr("src", response[i].icon_url);
			cardImg.attr("alt", "Weather icon");

			var cardBody = $("<div>");
			cardBody.addClass("card-body");

			var cardTitle = $("<h4>");
			cardTitle.addClass("card-title");
			cardTitle.html(response[i].title);

			var cardDesc = $("<p>");
			cardDesc.addClass("card-text");
			cardDesc.html(response[i].fcttext);

			var beerRecsBtn = $("<button>");
			beerRecsBtn.addClass("btn btn-primary beer-recs-btn");
			beerRecsBtn.attr("weatherType", response[i].icon);
			beerRecsBtn.html("Beer Me");
			// console.log(beerRecsBtn.attr("weatherType"));

			weatherCard.append(cardImg);
			weatherCard.append(cardBody);
			cardBody.append(cardTitle);
			cardBody.append(cardDesc);
			cardBody.append(beerRecsBtn);
			$("#weatherArea").append(weatherCard);
		}
		var weatherDivText = $("<p class='text-center body-content'>Three day weather forecast for " + userCity + ", " + userState + " </p>");
		$("#weatherArea").prepend(weatherDivText);
	});
}

// function to pull beer types from the breweryDB API based on weather type and then dynamically create the beer cards to display on tne DOM
function createBeerRecs() {
	$("#beerArea").empty(); // empties beerArea div to prevent duplicates

	var queryURL = "https://cors.io/?http://api.brewerydb.com/v2/beers?key=e97ade06c4cddc2a58ecba58cb8b4bd9&" + beerStyleID;
	// var queryURL = "https://cors.io/?http://api.brewerydb.com/v2/beers?key=e97ade06c4cddc2a58ecba58cb8b4bd9&styleId=97";

	// ajax call to the breweryDB API
	$.ajax ({
		url: queryURL,
		method: "GET",
		// format: "application/json"
	}).done(function(response) {
		var newResponse = JSON.parse(response);
		console.log(newResponse);
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

	createForecast();
});

// when "Beer Me" button is clicked, the weather type for that day is grabbed and the createBeerRecs function is called
$("body").on("click", ".beer-recs-btn",function(event) {
	event.preventDefault();

	// grabs the weather type for the day clicked
	var weatherType = $(this).attr("weatherType");
	console.log(weatherType);

	if (weatherType == "cloudy" || ) {
		beerStyleID = /*stouts*/;
	}

	createBeerRecs();
});



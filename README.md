# BeerCast

### A beer for any weather, any time.
BeerCast is a clean and easy-to-use single-page web application that will recommend an appropriate beer based on the weather forecasted for your location. Beer and weather may seem like an unlikely pairing, but it's a pairing that takes into consideration the mood and vibe of an experience in order to create a memorable impression. BeerCast can recommend a beer that tastes like it was made just for the occasion.

### How It Works
* The user inputs a city and state (which is validated) into the form field and clicks the Submit button
* On click of the Submit button, the city and state values are pushed to Firebase for storage and are then used as parameters in an AJAX "GET" call to the Weather Underground API
* The Weather Underground API returns a JSON object with a three-day weather forecast that's used to dynamically generate the weather HTML to display on the DOM, and the view automatically scrolls to the top of the generated weather forecast
* Each day of the weather forecast has a "Beer Me" button that can be clicked for beer recommendations for that day and that weather
* On click of a "Beer Me" button, the weather type for that day is grabbed and used in an algorithm that pairs a weather type to a style of beer
* The style of beer is passed as a parameter in an AJAX "GET" call to the Punk API (the beer API), and Punk API returns all the data for that particular style of beer, which is then used to dynamically generate the beer recommendations HTML that displays on the DOM

### Technologies Used
HTML, CSS, JavaScript, jQuery, AJAX, JSON, Bootstrap, Bootswatch, Firebase, Weather Underground API, Punk API

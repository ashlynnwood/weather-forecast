// Global Variables
var apiKey = '924c5e9602e9958e3465ca67604517da';
var searchBtn = $('#searchBtn')

$(function () {
  // Listener for click events on the search button
  searchBtn.on('click', function () {
    // Get the user city input from search
    var cityInput = $(this).siblings('#searchCity').val();
   
    // Save in local storage
    localStorage.setItem("cities", JSON.stringify(cityInput));
  
  });
});
// 1. Get the city value from the form
// 2. Pass the city to the geoCode function
// 3. Pass the Lat and Long to the GetWeather function
// 4. Build HTML with the Data we get from the weather

// First function being called on submit (click search btn)
// Pass in city to geocode api
fetch(`http://api.openweathermap.org/geo/1.0/direct?appid=${apiKey}&q=Orlando`
)
// Parse data into JSON (object)
  .then(function (response) {
    return response.json();
  })
// Get the data object back
  .then(function (data) {
// Make sure I get data
    console.log(data)
// Get the lat and lon of the city
    getWeather(data[0].lat,data[0].lon)
  });

  //Get 5 day forcast from lat/lon
function getWeather(lat,lon){
  console.log(lat,lon);
  fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=924c5e9602e9958e3465ca67604517da&units=imperial`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (weather) {
    console.log(weather)

    // Build the history searched city buttons
    let btnText = weather.city.name;
    document.querySelector(".city").append(btnText);

    //getting the Icon and make an image with it..
    let iconData = weather.list[0].weather[0].icon
    console.log(iconData);
    let temp = weather.list[0].main.temp
    document.querySelector(".temp").append(temp);

    let icon =  document.createElement("img")
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconData}@2x.png`)

    document.querySelector(".icon").append(icon);
  });
}

// // Event listener for clicking search button
// searchBtn.addEventListener('click', );


// use geocoding end point first- pass in orlando to geocode api
// this gives us lat/long --> pass lat/lon into forecast 

// geocode function- takes city off btn, click btn, get city off form
// take that and pass in funcyion to make fetch to geocode api
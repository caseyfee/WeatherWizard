// Variables
var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "chicago";
var state;
var country;
var zipCode;
var zipCodeQuery = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zipCode + "&appid=" + APIKey;
var limit = 5;
var extraCityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// Dom Elements
// Create an element that takes in the user input

var cityInputEl = document.getElementById("cityName");
var searchContainerEl = document.querySelector('#input-group');


// https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=029f73215f94df358a06425c3bef0fed


// Create an action to pull the city data from the input
// Use class to change text.content of all of them at once? [class=currentCity]

// var mainSearchInput = function(event){
//     event.preventDefault();

//     var city=cityInputEl.value.trim();

//     if (city) {
//         getCityInfo(city);

//         mainSearchInput.textContent = '';
//         cityInputEl.value='';
//         console.log(searchContainerEl);
//     }
//     else {
//         console.log("there is an issue");
//     }}

  var showCurrentWeather = function(cityName, data) {
    var currentWeatherHTML = `<h4 class="currentCity mb-1 sfw-normal">${cityName}</h4>
    <p class="mb-2">Current temperature: <strong>${data.main.temp}°C</strong></p>
    <p>Feels like: <strong>4.37°C</strong></p>
    <p>Max: <strong>6.11°C</strong>, Min: <strong>3.89°C</strong></p>

    <div class="d-flex flex-row align-items-center">
        <p class="mb-0 me-4">Scattered Clouds</p>
        <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>
    </div>`;

    $('#currentCityWeather').html(currentWeatherHTML)

  };


//     console.log(event.target)

var getCityInfo = function (city) {

    var cityQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    fetch(cityQueryURL)
        .then(function (response) {
            console.log(response.status);
            if (response.status !== 200) {
                console.log("CHECK NETWORK")
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Created lat and long dynamically by taking from the first API pull to make sure 5 day forecast is pulling correct city

            // console.log(data [1].lat);
            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            fiveDayInfo(cityLat, cityLon);
            showCurrentWeather(city, data);
        })
};

// Pull another API for 5 day forecast using the city Lat and Lon

var fiveDayInfo = function (cityLat, cityLon) {
    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + APIKey;
    fetch(fiveDayQueryURL)
        .then(function (fiveDayResponse) {
            if (fiveDayResponse.ok) {
                return fiveDayResponse.json();
                // var fiveDayData = "";
            }
        })
        .then(function (fiveDayData) {
            console.log(fiveDayData);

        })
}

function show5Day(dataArray){
    var fivedayHTML

    for(var i=0;i<dataArray.length;i++){
        fivedayHTML += `
        html for 5 day card
        `
    }

    $().html(fivedayHTML)
}


        // https://api.openweathermap.org/data/2.5/forecast?lat=41.85&lon=-87.65&appid=029f73215f94df358a06425c3bef0fed

    //  Create dom variables to connect with index file and start populating current data



    // Save the search events by creating keys for each datapoints that are pulled and save them locally
    // mainSearchEl.addEventListener('click', mainSearchInput);

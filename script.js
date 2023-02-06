// Variables
var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "chicago";
var limit = 5;


// Dom Elements
// Create an element that takes in the user input

var cityInputEl = document.getElementById("cityName");
var searchContainerEl = document.querySelector('#input-group');
var fiveDayEL=document.getElementById("#fiveDaysCards");


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
    <p class="mb-2">Current temperature: <strong>${data.main.temp-273.15}°C</strong></p>
    <p>Feels like: <strong>${data.main.feels_like-273.15}°C</strong></p>
    <p>Max: <strong>${data.main.temp_max-273.15}°C</strong>, Min: <strong>${data.main.temp_min-273.15}°C</strong></p>

    <div class="d-flex flex-row align-items-center">
        <p class="mb-0 me-4">${data.weather.main}</p>
        <i class="fas fa-cloud fa-3x" style="color: #eee;"> ${data.weather.icon}</i>
    </div>`;

    // var mainTemp = data.main.temp-273.15;
    // var feelsTemp = data.main.feels_like-273.15;
    // var maxTemp = data.main.temp_max-273.15;
    // var minTemp = data.main.temp_min-273.15;

    $('#currentCityWeather').html(currentWeatherHTML)

  };

var getCityInfo = function (city) {

    var cityQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    
    // $( "p" ).addClass( "hide" );
    
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

            var cityLat = data.coord.lat;
            var cityLon = data.coord.lon;
            fiveDayInfo(cityLat, cityLon);
            showCurrentWeather(city, data);
        })
};

// Pull another API for 5 day forecast using the city Lat and Lon

var fiveDayInfo = function (cityLat, cityLon) {
    var fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIKey}`;
    fetch(fiveDayQueryURL)
        .then(function (fiveDayResponse) {
            if (fiveDayResponse.ok) {
                return fiveDayResponse.json();
                var fiveDayData = "";
            }
        })
        .then(function (fiveDayData) {
            console.log(fiveDayData.list);
            
                        
            // Create loop that picks up every 8 entries in the 40 entry long list to get each day's time
                for(var i=0; i<5; i++){
                    if (i % 8 ===0) {
                    var dataArray = fiveDayData.list[i];
                    console.log(dataArray);
                    // console.log(dataArray.length); - undefined?
                    show5Day (city, dataArray);
                    }
                }
            // dataArray = fiveDayData.list.filter((fiveDates)=>{fivedate%8===0});
            // console.log(dataArray);
        })
}



function show5Day(city, dataArray){
    for(var i=0;i<dataArray;i++){
       var fivedayHTML = `
        <div class="forecast d-flex justify-content-around" id="fiveDayContainer">
                <div class="card shadow-0 border">
                    <div class="card-body p-4 bg-info mb-3" id="Day1">
                        <h4 class="currentCity mb-1 sfw-normal">${city}</h4>
                        <p class="mb-2 dayOneTemp">Current temperature: <strong>${dataArray[0].main.temp}°C</strong></p>
                        <p class="dayOneWind">Wind: <strong>${dataArray[0].weather.main}</strong></p>
                        <p class="dayOneHumid">Humidity: <strong>${dataArray[0].main.humidity}</strong></p>

                        <div class="d-flex flex-row align-items-center">
                            <p class="mb-0 me-4">Scattered Clouds</p>
                            <i class="fas fa-cloud fa-3x" style="color: #eee;"> ${dataArray[0].weather.icon} </i>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `
        $('#fiveDayContainer').html(fivedayHTML)
    }
    
    // var fiveDayTemp = main.temp;
    // var fiveDayWind = weather.main;
    // var fiveDayHumid = main.humidity;
    // var fiveDayIcon = weather.icon;
    $('#fiveDays').html(fivedayHTML)
}




  

        // https://api.openweathermap.org/data/2.5/forecast?lat=41.85&lon=-87.65&appid=029f73215f94df358a06425c3bef0fed

    //  Create dom variables to connect with index file and start populating current data



    // Save the search events by creating keys for each datapoints that are pulled and save them locally
    // mainSearchEl.addEventListener('click', mainSearchInput);

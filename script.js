// Variables
var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "";
var limit = 5;


// Dom Elements
// Create an element that takes in the user input

var cityInputEl = document.getElementById("cityName");
var searchContainerEl = document.querySelector('#input-group');
var fiveDayEL = document.getElementById("#fiveDaysCards");


// Create an action to pull the city data from the input
// Use class to change text.content of all of them at once? [class=currentCity]

var mainSearchInput = function () {
    city = cityInputEl.value.trim();

    if (city) {
        getCityInfo(city);

        let searchHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem("cityHistory", JSON.stringify(searchHistory));
            displayHistory();
        }

        // mainSearchInput.textContent = '';
        cityInputEl.value = '';
        console.log(searchContainerEl);
    }
    else {
        console.log("there is an issue");
    }
}

var showCurrentWeather = function (cityName, data) {

    var todayDate = "";
    // Get today's date
    const unixTime = `${data.dt}`;
    const milliseconds = unixTime * 1000;
    const dateobject = new Date(milliseconds);
    const newDateFormat = dateobject.toLocaleString();
    console.log(newDateFormat);

    todayDate = newDateFormat;
    var currentWeatherHTML = `<h4 class="currentCity mb-1 sfw-normal">${cityName}</h4>
    <h5 mb-1 sfw-normal">${todayDate}</h5>
    <p class="mb-2">Current temperature: <strong>${convertTemp(Number(data.main.temp).toFixed(1))}°F</strong></p>
    <p>Feels like: <strong>${convertTemp(Number(data.main.feels_like).toFixed(1))}°F</strong></p>
    <p>Max: <strong>${convertTemp(Number(data.main.temp_max).toFixed(1))}°F</strong>, Min: <strong>${convertTemp(Number(data.main.temp_min).toFixed(1))}°F</strong></p>

    <div class="d-flex flex-row align-items-center">
        <p class="mb-0 me-4">${data.weather[0].description}</p>
        <img class="fas fa-cloud fa-3x" style="color: #eee;" src = "http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
    </div>`;

    $('#currentCityWeather').html(currentWeatherHTML)

    function convertTemp(k) {
        return Math.floor((k - 273.15) * 1.8 + 32);
    }

};

//   Initial function to call to API
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
                // var fiveDayData = "";
            }
        })
        .then(function (fiveDayData) {
            console.log(fiveDayData.list);

            var dataArray = [];

            // Create loop that picks up every 8 entries in the 40 entry long list to get each day's time
            for (var i = 0; i < 40; i++) {
                if (i % 8 === 0) {
                    // 8 entries per day, want to find one for each of the 5 days
                    dataArray.push(fiveDayData.list[i]);
                    console.log(dataArray);

                }

            } show5Day(dataArray);
        })
}

function show5Day(dataArray) {
    var fivedayHTML = ``;
    var date = "";

    for (var i = 0; i < dataArray.length; i++) {

        // Get 5 days of dates
        const time = `${dataArray[i].dt_txt}`;
        // console.log(`${dataArray[i].dt}`);
        const newDateFormat = time.toLocaleString();
        console.log(newDateFormat);
        // date = str.split(' ');
        date = newDateFormat;
        // new date[0] = newDateFormat;


        fivedayHTML += `
        <div class="forecast d-flex justify-content-around" id="fiveDayContainer">
                <div class="card shadow-0 border">
                    <div class="card-body p-4 bg-info mb-3" id="Day1">
                        <h4 class="mb-1 sfw-normal">${date}</h4>
                        <p class="mb-2 dayOneTemp">Current temperature: <strong>${convertTemp(Number(dataArray[i].main.temp).toFixed(1))}°C</strong></p>
                        <p class="dayOneWind">Wind Speed: <strong>${Number(dataArray[i].wind.speed).toFixed(1)} mph</strong></p>
                        <p class="dayOneHumid">Humidity: <strong>${Number(dataArray[i].main.humidity).toFixed(1)}%</strong></p>

                        <div class="d-flex flex-row align-items-center">
                            <p class="mb-0 me-4">${dataArray[i].weather[0].description}</p>
                            <img class="fas fa-cloud fa-3x" style="color: #eee;" src = "http://openweathermap.org/img/wn/${dataArray[i].weather[0].icon}.png">
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `
        function convertTemp(k) {
            return Math.floor((k - 273.15) * 1.8 + 32);
        }


    } $('#fiveDayContainer').html(fivedayHTML);
}



// Saving Searches
// Save the search events by creating keys for each datapoints that are pulled and save them locally
function displayHistory() {
    var previousSearchesHTML = ``;

    let searchHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];

    for (var i = 0; i < searchHistory.length; i++) {
        const city = searchHistory[i];
        previousSearchesHTML += `
        <a type="button" onclick="getCityInfo('${city}')">
            <span class="input-group-text border-0 fw-bold" >
                ${city}
            </span>
        </a>`
    }
    $('#previousCities').html(previousSearchesHTML);
}

displayHistory();



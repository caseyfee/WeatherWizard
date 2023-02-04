// Variables
var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "chicago";
var state;
var country;
var zipCode;
var zipCodeQuery ="https://api.openweathermap.org/geo/1.0/zip?zip="+zipCode+"&appid="+APIKey;
var limit = 5;
var extraCityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
var cityQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit="+limit+"&appid="+APIKey;

// Dom Elements
// Create an element that takes in the user input

var cityInputEl = document.getElementById("cityName");
var searchContainerEl = document.querySelector('#input-group');


// https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=029f73215f94df358a06425c3bef0fed


// Create an action to pull the city data from the input
// Use class to change text.content of all of them at once? [class=currentCity]

var mainSearchInput = function(event){
    event.preventDefault();
   
    var city=cityInputEl.value.trim();
    
    if (city) {
        getCityInfo(city);

        searchContainerEl.textContent = '';
        cityInputEl.value='';
        console.log(searchContainerEl);
    }
    else {
        console.log("there is an issue");
    }

    
    
//     console.log(event.target)

var getCityInfo = function(city){

    fetch(cityQueryURL)
    .then(function (response) {
        console.log(response.status);
        if (response.status !==200){
            console.log("CHECK NETWORK")
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
// Created lat and long dynamically by taking from the first API pull to make sure 5 day forecast is pulling correct city

        // console.log(data [1].lat);
        var cityLat = data[1].lat;
        var cityLon = data[1].lon;
        
        // Pull another API for 5 day forecast using the city Lat and Lon
        var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLat+"&lon="+cityLon+"&appid="+APIKey;
        fetch(fiveDayQueryURL)
        .then(function (fiveDayResponse){
            if(fiveDayResponse.ok) {
            return fiveDayResponse.json();
            // var fiveDayData = "";
            .then(function(fiveDayData)) {
                console.log(fiveDayData);

            }}
            }
            
            )
        })};
    
// }

        cityLat = data[1].lat;
        cityLon = data[1].lon;
        
        
        // https://api.openweathermap.org/data/2.5/forecast?lat=41.85&lon=-87.65&appid=029f73215f94df358a06425c3bef0fed

    //  Create dom variables to connect with index file and start populating current data



    // Save the search events by creating keys for each datapoints that are pulled and save them locally
    // mainSearchEl.addEventListener('click', mainSearchInput);

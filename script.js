
var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "chicago";
var state;
var country;
var zipCode;
var zipCodeQuery ="https://api.openweathermap.org/geo/1.0/zip?zip="+zipCode+"&appid="+APIKey;
var limit = 5;
var extraCityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
var cityQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit="+limit+"&appid="+APIKey;

// https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=029f73215f94df358a06425c3bef0fed

var lat;
var lon;

// var latlongQueryURL = "api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;

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
        for 
    });
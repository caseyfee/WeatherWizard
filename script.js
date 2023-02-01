
// https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "chicago";
var state;
var county;
var zipCode;
var queryURL = "api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;

fetch(queryURL)
    .then(function (response) {
        console.log(response.status);
        if (response.status !==200){
            console.log("CHECK NETWORK")
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
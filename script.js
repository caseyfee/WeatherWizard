
var APIKey = "029f73215f94df358a06425c3bef0fed";
var city = "chicago";
var state;
var country;
var zipCode;
var zipCodeQuery ="https://api.openweathermap.org/geo/1.0/zip?zip="+zipCode+"&appid="+APIKey;
var limit = 5;
var extraCityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey;
var cityQueryURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit="+limit+"&appid="+APIKey;
var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;

// https://api.openweathermap.org/geo/1.0/direct?q=chicago&limit=5&appid=029f73215f94df358a06425c3bef0fed

// Create lat and long dynamically by taking from the first API pull to make sure 5 day forecast is pulling correct city
var lat = "41.85";
var lon = "-87.65";

// var latlongQueryURL = "api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey;

// Create an action to pull the city data from the input


// var mainSearchInput = function(event){
//     event.preventDefault();
//     // Prevent Default

//     var mainSearchEL=event.target.getElementbyId('search-addon');
    
//     console.log(event.target)

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

        // Go through array and chose the first city suggested 

        // for (var i = 0; i < 1; i++) {
            // var userName = document.createElement('h3');
            // var issueTitle = document.createElement('p');
            // userName.textContent = data[i].user.login;
            // issueTitle.textContent = data[i].title;
            // issueContainer.append(userName);
            // issueContainer.append(issueTitle);
        // }
    });
// }


// Pull another API with the 5 day forcast

fetch("https://api.openweathermap.org/data/2.5/forecast?lat=41.85&lon=-87.65&appid=029f73215f94df358a06425c3bef0fed")
    .then(function (response) {
        console.log(response.status);
        if (response.status !==200){
            console.log("CHECK NETWORK")
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Connect data with index.html location where it will be presented
        // 
    });

    // Save the search events by creating keys for each datapoints that are pulled and save them locally
    // mainSearchEl.addEventListener('click', mainSearchInput);

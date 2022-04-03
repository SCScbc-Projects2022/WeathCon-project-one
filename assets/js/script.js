var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");
// departure will be current location, destination will be search location
//Brennan's code here
//Candice's code here
// var city = "toronto";
var getWeather = function(city){
    console.log(city);
    var apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + city + "&aggregateHours=24&forecastDays=15&unitGroup=metric&shortColumnNames=false&contentType=json&iconSet=icons1&key=DDEWS835GJQFSW9E6Z6B3TS3K";
    fetch(apiURL)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                  displayWeather(data, city);
                
            })
         } else {
             //insert error handling here
         };
    })
}
 var displayWeather = function(data, city){
var cityName = city;
var weatherTitleEl = document.createElement("div");
weatherTitleEl.textContent=data.locations[cityName].address;
containerOne.appendChild(weatherTitleEl);

var currentWeather = document.createElement("div");
currentWeather.textContent = "Temp: " + data.locations[cityName].currentConditions.temp + " °C";
containerOne.appendChild(currentWeather);

// var currentIcon = document.createElement("div");
// currentIcon.innerHTML="<img src='https://www.weatherbit.io/static/img/icons/" + data.locations.city.currentConditions.icon + ".png'>"
// containerOne.appendChild(currentIcon);

var dropForecast = document.createElement("select");
dropForecast.classList.add("select");
containerOne.appendChild(dropForecast);
var fiveDay = document.createElement("option");
fiveDay.textContent="5 Day Forecast";
$(fiveDay).attr("id", "5");
dropForecast.appendChild(fiveDay);
var sevenDay = document.createElement("option");
sevenDay.textContent = "7 Day Forecast";
$(sevenDay).attr("id", "7");
dropForecast.appendChild(sevenDay);
var fourteenForecast = document.createElement("option");
fourteenForecast.textContent="14 Day Forecast";
$(fourteenForecast).attr("id", "14");
dropForecast.appendChild(fourteenForecast);

// fiveDay.addEventListener("change", function(){
//     for(var i = 1; i < 6; i++){
//         var destinationDayEl = document.createElement("div");
//         destinationDayEl.classList.add("border");
//         containerOne.appendChild(destinationDayEl);
        
//         var days = document.createElement("ul");
//         destinationDayEl.appendChild(days);
        
//         var date = document.createElement("li");
//         date.setAttribute("class", "days-text");
//         date.textContent=data.locations[cityName].values[i].datetime;
//         days.appendChild(date);

//         var temp = document.createElement("li");
//         temp.setAttribute("class", "days-text");
//         temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
//         days.appendChild(temp);

//         var humidity = document.createElement("li");
//         humidity.setAttribute("class", "days-text");
//         humidity.textContent= "Humidity: " + data.locations[cityName].values[i].humidity + "%";
//         days.appendChild(humidity);
//     }
// })
 };
 

 getWeather("toronto");
 


//Veronica's code here
//Cory's code here
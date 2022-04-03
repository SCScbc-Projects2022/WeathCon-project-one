var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");
// departure will be current location, destination will be search location
//Brennan's code here
//Candice's code here
// var city = "toronto";
var getWeather = function(city){
    var apiURL = "https://api.weatherbit.io/v2.0/forecast/daily?units=I&days=15&city=ottawa&key=023238f0f4fa4eb49d76fc4a4b8d5c55";
    fetch(apiURL)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
                 displayWeather(data);
                console.log(data);
            })
         } else {
             //insert error handling here
         };
    })
}
 var displayWeather = function(data){

var weatherTitleEl = document.createElement("div");
weatherTitleEl.textContent=data.city_name;
containerOne.appendChild(weatherTitleEl);

var currentWeather = document.createElement("div");
currentWeather.textContent = "Temp: " + data.data[0].temp + " °C";
containerOne.appendChild(currentWeather);

var currentIcon = document.createElement("div");
currentIcon.innerHTML="<img src='https://www.weatherbit.io/static/img/icons/" + data.data[0].weather.icon + ".png'>"
containerOne.appendChild(currentIcon);

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
 }

 var destinationForecast = function(num){
     for (var i = 1; i<num;i++){

     }
 }
//  $(".select").change(function(){
//      if($(this).id === "14"){

//      }else if($(this).id === "7"){

//      } else {

//      }
//  })

 getWeather();

//Veronica's code here
//Cory's code here
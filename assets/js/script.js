var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");
// departure will be current location, destination will be search location
//Brennan's code here
//Candice's code here
// var city = "toronto";
var getWeather = function(city){
    var apiURL = "https://api.weatherbit.io/v2.0/forecast/daily?units=I&days=15&city=" + city + "&key=023238f0f4fa4eb49d76fc4a4b8d5c55";
    fetch(apiURL)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
                // displayWeather(data);
                console.log(data);
            })
//         } else {
//             //insert error handling here
         };
    })
}
// var displayWeather = function(data){

// }
getWeather();
//Veronica's code here
//Cory's code here
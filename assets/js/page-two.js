//logic passing parameters from page one to two
var locations = [];
var text = document.location.search;
var sentence = text.split("?");
parsing();
function parsing() {
    for (i = 0; i < sentence.length; i++) {
        var item = sentence[i].split("%20").join(" ").trim();
        locations.push(item);
    }
}
var departureCity = locations[1];
var departureCountry = locations[2];
var destinationCity = locations[3];
var destinationCountry = locations [4];

//adding console.log for ease of variable substitution - to be removed for final version
console.log(departureCity);//new york
console.log(departureCountry);//united states
console.log(destinationCity);//toronto
console.log(destinationCountry);//canada

//don't need query selectors after streamlining + using jQuery
var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");

//Brennan's code here
//capture destination change - code to run when destination is changed - V
$("#new-destination-form").on("click", "#submit-new-destination", updateDestination);

function updateDestination(event) {
    console.log("this is a placeholder function");
}

//Candice's code here
var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityinput.value.trim().toLowerCase();
    if (city){
        getWeather()
    }
    }
    
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
    
    var icon=document.createElement("div");
    icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].currentConditions.icon + ".png>";
    containerOne.appendChild(icon);
    
    //tabs 
    var tabForecast = document.createElement("div");
    tabForecast.setAttribute("id", "tabs")
    containerOne.appendChild(tabForecast);
    
    var tabHolder = document.createElement("ul");
    tabForecast.appendChild(tabHolder);
    
    var fiveDay = document.createElement("li");
    fiveDay.innerHTML="<a href='#5'>5 Day</a>";
    tabHolder.appendChild(fiveDay);
    
    var sevenDay = document.createElement("li");
    sevenDay.innerHTML="<a href='#7'>7 Day</a>";
    tabHolder.appendChild(sevenDay);
    
    var fourteenDay = document.createElement("li");
    fourteenDay.innerHTML="<a href='#14'>14 Day</a>";
    tabHolder.appendChild(fourteenDay);
    
    var fiveDayTab = document.createElement("div");
    fiveDayTab.setAttribute("id", "5");
    fiveDayTab.classList.add("grid", "grid-cols-5")
    
    var sevenDayTab = document.createElement("div");
    sevenDayTab.setAttribute("id", "7");
    
    var fourteenDayTab = document.createElement("div");
    fourteenDayTab.setAttribute("id", "14");
    
    tabForecast.appendChild(fiveDayTab);
    //dont forget to figure out display not being block to show containers side by side(devtools)
    for(var i = 1; i<6; i++){
        var dayEl = document.createElement("div");
            dayEl.classList.add("border");
            fiveDayTab.appendChild(dayEl);
            
            var days = document.createElement("ul");
            dayEl.appendChild(days);
            
            var date = document.createElement("li");
            date.classList.add("font-weight-bold", "days-text");
            date.textContent=moment(data.locations[cityName].values[i].datetimeStr).format("L");
            days.appendChild(date);
    
            var icon=document.createElement("li");
            icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].values[i].icon + ".png>";
            days.appendChild(icon);
    
            var temp = document.createElement("li");
            temp.setAttribute("class", "days-text");
            temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
            days.appendChild(temp);
    
            var humidity = document.createElement("li");
            humidity.setAttribute("class", "days-text");
            humidity.textContent= "Humidity: " + data.locations[cityName].values[i].humidity + "%";
            days.appendChild(humidity);
    }
    tabForecast.appendChild(sevenDayTab);
    for(var i = 1; i<8; i++){
        var dayEl = document.createElement("div");
            dayEl.classList.add("border");
            sevenDayTab.appendChild(dayEl);
            
            var days = document.createElement("ul");
            dayEl.appendChild(days);
            
            var date = document.createElement("li");
            date.classList.add("font-weight-bold", "days-text");
            date.textContent=moment(data.locations[cityName].values[i].datetimeStr).format("L");
            days.appendChild(date);
    
            var icon=document.createElement("li");
            icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].values[i].icon + ".png>";
            days.appendChild(icon);
    
            var temp = document.createElement("li");
            temp.setAttribute("class", "days-text");
            temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
            days.appendChild(temp);
    
            var humidity = document.createElement("li");
            humidity.setAttribute("class", "days-text");
            humidity.textContent= "Humidity: " + data.locations[cityName].values[i].humidity + "%";
            days.appendChild(humidity);
    }
    tabForecast.appendChild(fourteenDayTab);
    for(var i = 1; i<15; i++){
        var dayEl = document.createElement("div");
            dayEl.classList.add("border");
            fourteenDayTab.appendChild(dayEl);
            
            var days = document.createElement("ul");
            dayEl.appendChild(days);
            
            var date = document.createElement("li");
            date.classList.add("font-weight-bold", "days-text");
            date.textContent=moment(data.locations[cityName].values[i].datetimeStr).format("L");
            days.appendChild(date);
    
            var icon=document.createElement("li");
            icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].values[i].icon + ".png>";
            days.appendChild(icon);
    
            var temp = document.createElement("li");
            temp.setAttribute("class", "days-text");
            temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
            days.appendChild(temp);
    
            var humidity = document.createElement("li");
            humidity.setAttribute("class", "days-text");
            humidity.textContent= "Humidity: " + data.locations[cityName].values[i].humidity + "%";
            days.appendChild(humidity);
    }
    
        $("#tabs").tabs();
     };
    
     getWeather("toronto");
     


//Veronica's code here

//To do:
//CSS
//streamline code
//error handling and validations - change to modals

//start currency API logic
$("#conversionHistory").sortable();

//format numerical values
var dollarUSLocale = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
});

//currency codes from getCurrency();
var locationCode = "";
var destinationCode = "";

//convert from
function generateFrom(symbol, name, code, flag) {
    var amountLabel = $("<label>").addClass("mr-1").attr("for", "amount").text(symbol).attr("id", "fromSymbol");
    var amountInput = $("<input>").addClass("border form-width").attr("type", "text").attr("id", "amount").attr("placeholder", "1.00");
    $("#convertFrom").append(amountLabel);
    $("#convertFrom").append(amountInput);
    var fromCurrency = $("<p>").text(name + " (" + code + ")").addClass("italic").attr("id", "fromCurrency");
    $("#convertFrom").append(fromCurrency);
    var fromFlag = $("<img>").attr("src", flag).attr("alt", "country flag");
    $("#fromFlag").append(fromFlag);
}

//generate to
function generateTo(symbol, name, code, amount, flag) {
    var convertedLabel = $("<label>").addClass("mr-1").attr("for", "convertedAmount").text(symbol).attr("id", "toSymbol");
    var convertedAmount = $("<p>").text(dollarUSLocale.format(amount)).addClass("inline-block").attr("id", "convertedAmount");
    $("#convertTo").append(convertedLabel);
    $("#convertTo").append(convertedAmount);
    var toCurrency = $("<p>").text(name + " (" + code + ")").addClass("italic").attr("id", "toCurrency");
    $("#convertTo").append(toCurrency);
    var toFlag = $("<img>").attr("src", flag);
    $("#toFlag").append(toFlag).attr("alt", "country flag");
}

//on conversion click
function convertAmount() {
    //changes the amount being converted
    var amount = $("#amount").val().trim();
    if (!amount) {
        alert ("please enter a value to be converted");
        return;
    }
    if (isNaN(amount)) {
        alert("please enter a numerical value (no symbols)");
        return;
    }
    if (amount % 1 != 0) {
        alert("please enter a whole number value");
        return;
    }
    if (amount < 1 || amount > 1000000) {
        alert("please enter a value between 1 and 1,000,000");
        return;
    }
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&amount=" + amount + "&places=2";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    $("#convertedAmount").text(dollarUSLocale.format(data.result));
                    $("#amount").val("").attr("placeholder", dollarUSLocale.format(amount));
                    var search = $("<li>").text($("#fromSymbol").text() + " " + dollarUSLocale.format(amount) + " (" + locationCode + ") = " + $("#toSymbol").text() + " " + dollarUSLocale.format(data.result) + " (" + destinationCode + ")").addClass("bg-white");
                    $("#conversionHistory").prepend(search);
                    $(".conversionHistory .history").slice(10).remove();
                });
            } else {
                alert("unable to retrieve conversion data");
                return;
            }
        })
        .catch(function(error) {
            alert("unable to connect with currency API");
            return;
        });

    // set so that the amount field now captures changed country to test function
    // var country = $.trim($("#amount").val()); //change id for the form element in header
    // swapDestination(country);
}

//set up for change in destination
async function swapDestination(country) {
    var newCurrency = await getCurrency(country);
    destinationCode = newCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&amount=&places=2";
        fetch(apiUrl)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        $("#convertTo").empty();
                        $("#toFlag").empty();
                        generateTo(newCurrency.currencySymbol, newCurrency.currencyName, destinationCode, data.result, newCurrency.countryFlag);
                    });
                } else {
                    alert("unable to retrieve conversion data");
                    return;
                }
            })
            .catch(function(error) {
                alert("unable to connect with currency API");
                return;
            });
}

//convert country to currency code
async function getCurrency(country) {
    var apiUrl = "https://restcountries.com/v3.1/name/" + country + "?fields=currencies,flags";
    var dataOne = fetch(apiUrl)
        .then(function(response) {
            if (response.ok){
                var data =  response.json().then(function(data) {
                    var currency = Object.keys(data[0].currencies)[0];
                    var currencyObj = {currency: Object.keys(data[0].currencies)[0], currencyName: data[0].currencies[currency].name, currencySymbol: data[0].currencies[currency].symbol, countryFlag: data[0].flags.png};
                    return currencyObj;
                });
                return data;
            } else {
                alert("unable to retrieve conversion data");
                return;
            }
        })
        .catch(function(error){
            alert("unable to connect with currency API");
            return;
        });
    return dataOne; 
}

//on submit, run the following
async function convertCurrency(destinationCountry, departureCountry) {
    var baseCurrency =  await getCurrency(departureCountry);
    var convertedCurrency = await getCurrency(destinationCountry);
    locationCode = baseCurrency.currency;
    destinationCode = convertedCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&places=2";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                generateFrom(baseCurrency.currencySymbol, baseCurrency.currencyName, locationCode, baseCurrency.countryFlag);
                generateTo(convertedCurrency.currencySymbol, convertedCurrency.currencyName, destinationCode, data.result, convertedCurrency.countryFlag);
                var setConversion = $("<p>").text(baseCurrency.currencySymbol + " 1.00 " + "(" + locationCode + ")" + " = " + convertedCurrency.currencySymbol + " " + dollarUSLocale.format(data.result) + " (" + destinationCode + ")").addClass("italic");
                $(setConversion).insertBefore($("#historyTitle"));
            });
        } else {
            alert("unable to retrieve conversion data");
        }
    })
    .catch(function(error) {
        alert("unable to connect with currency API");
        return;
    });
}

$("#container-2").on("click", "#convert", convertAmount);
$("#container-2").on("dblclick", "li", function() {
    $(this).remove();
});

convertCurrency(destinationCountry, departureCountry);//on click, run this

    //Cory's code here
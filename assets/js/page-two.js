//logic passing query string from page one to two - Veronica
var locations = [];
var text = document.location.search;
var query = text.split("?");
parsing();
function parsing() {
    for (i = 0; i < query.length; i++) {
        var item = query[i].split("%20").join(" ").trim();
        locations.push(item);
    }
}
var departureCity = locations[1];//paris
var departureCountry = locations[2];//france
var destinationCity = locations[3];//tokyo
var destinationCountry = locations[4];//japan

//query selectors to accommodate pure JavaScript coding
var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");

//capture destination change - Veronica
$("#new-destination-form").on("click", "#submit-new-destination", updateDestination);
function updateDestination(event) {
    var newDestinationCity = $.trim($("#new-destination-city").val());
    var newDestinationCountry = $.trim($("#new-destination-country").val());
    // console.log("this is a placeholder function");
    //Candice's location change function call goes here
    getWeather(newDestinationCity, newDestinationCountry);
    //Veronica's location change function call goes here
    swapDestination(newDestinationCountry);
    //Cory's location change function call goes here
}

//Brennan's code here
//Candice's code here    
var getWeather = function (city, country) {
    //console.log(city);
    var apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + city + "," + country + "&aggregateHours=24&forecastDays=15&unitGroup=metric&shortColumnNames=false&contentType=json&iconSet=icons1&key=DDEWS835GJQFSW9E6Z6B3TS3K";
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city, country);
                    saveLocations(city, country);
                })
            } else {
                //insert error handling here
            };
        })
}
var displayWeather = function (data, city, country) {
    containerOne.innerHTML="";
    var cityCountryName = city + "," + country;

    var weatherTitleEl = document.createElement("div");
    weatherTitleEl.textContent = data.locations[cityCountryName].address;
    weatherTitleEl.classList.add("boxes", "cTitle", "w-5/6");
    containerOne.appendChild(weatherTitleEl);

    var currentWeather = document.createElement("div");
    currentWeather.textContent = "Temp: " + data.locations[cityCountryName].currentConditions.temp + " °C";
    currentWeather.classList.add("boxes", "cBoxes", "w-1/3");
    containerOne.appendChild(currentWeather);

    var icon = document.createElement("div");
    icon.innerHTML = "<img src=./assets/images/weathericons/" + data.locations[cityCountryName].currentConditions.icon + ".png>";
    icon.classList.add("boxes", "cBoxes", "w-1/3");
    containerOne.appendChild(icon);

    //tabs 
    var tabForecast = document.createElement("div");
    tabForecast.setAttribute("id", "tabs")
    tabForecast.classList.add("w-full");
    containerOne.appendChild(tabForecast);

    var tabHolder = document.createElement("ul");
    tabForecast.appendChild(tabHolder);

    var fiveDay = document.createElement("li");
    fiveDay.innerHTML = "<a href='#5'>5 Day</a>";
    tabHolder.appendChild(fiveDay);

    var sevenDay = document.createElement("li");
    sevenDay.innerHTML = "<a href='#7'>7 Day</a>";
    tabHolder.appendChild(sevenDay);

    var fourteenDay = document.createElement("li");
    fourteenDay.innerHTML = "<a href='#14'>14 Day</a>";
    tabHolder.appendChild(fourteenDay);

    var fiveDayTab = document.createElement("div");
    fiveDayTab.setAttribute("id", "5");
    fiveDayTab.classList.add("flex", "flex-wrap", "flex-row")

    var sevenDayTab = document.createElement("div");
    sevenDayTab.setAttribute("id", "7");

    var fourteenDayTab = document.createElement("div");
    fourteenDayTab.setAttribute("id", "14");

    tabForecast.appendChild(fiveDayTab);
    //dont forget to figure out display not being block to show containers side by side(devtools)
    for (var i = 1; i < 6; i++) {
        var dayEl = document.createElement("div");
        dayEl.classList.add("border", "w-1/5");
        fiveDayTab.appendChild(dayEl);

        var days = document.createElement("ul");
        dayEl.appendChild(days);

        var date = document.createElement("li");
        date.classList.add("font-weight-bold", "days-text");
        date.textContent = moment(data.locations[cityCountryName].values[i].datetimeStr).format("L");
        days.appendChild(date);

        var icon = document.createElement("li");
        icon.innerHTML = "<img src=./assets/images/weathericons/" + data.locations[cityCountryName].values[i].icon + ".png>";
        days.appendChild(icon);

        var temp = document.createElement("li");
        temp.setAttribute("class", "days-text");
        temp.textContent = "Temp: " + data.locations[cityCountryName].values[i].temp + " °C";
        days.appendChild(temp);

        var humidity = document.createElement("li");
        humidity.setAttribute("class", "days-text");
        humidity.textContent = "Humidity: " + data.locations[cityCountryName].values[i].humidity + "%";
        days.appendChild(humidity);
    }
    tabForecast.appendChild(sevenDayTab);
    for (var i = 1; i < 8; i++) {
        var dayEl = document.createElement("div");
        dayEl.classList.add("border", "w-1/4");
        sevenDayTab.appendChild(dayEl);

        var days = document.createElement("ul");
        dayEl.appendChild(days);

        var date = document.createElement("li");
        date.classList.add("font-weight-bold", "days-text");
        date.textContent = moment(data.locations[cityCountryName].values[i].datetimeStr).format("L");
        days.appendChild(date);

        var icon = document.createElement("li");
        icon.innerHTML = "<img src=./assets/images/weathericons/" + data.locations[cityCountryName].values[i].icon + ".png>";
        days.appendChild(icon);

        var temp = document.createElement("li");
        temp.setAttribute("class", "days-text");
        temp.textContent = "Temp: " + data.locations[cityCountryName].values[i].temp + " °C";
        days.appendChild(temp);

        var humidity = document.createElement("li");
        humidity.setAttribute("class", "days-text");
        humidity.textContent = "Humidity: " + data.locations[cityCountryName].values[i].humidity + "%";
        days.appendChild(humidity);
    }
    tabForecast.appendChild(fourteenDayTab);
    for (var i = 1; i < 15; i++) {
        var dayEl = document.createElement("div");
        dayEl.classList.add("border", "w-1/6");
        fourteenDayTab.appendChild(dayEl);

        var days = document.createElement("ul");
        dayEl.appendChild(days);

        var date = document.createElement("li");
        date.classList.add("font-weight-bold", "days-text");
        date.textContent = moment(data.locations[cityCountryName].values[i].datetimeStr).format("L");
        days.appendChild(date);

        var icon = document.createElement("li");
        icon.innerHTML = "<img src=./assets/images/weathericons/" + data.locations[cityCountryName].values[i].icon + ".png>";
        days.appendChild(icon);

        var temp = document.createElement("li");
        temp.setAttribute("class", "days-text");
        temp.textContent = "Temp: " + data.locations[cityCountryName].values[i].temp + " °C";
        days.appendChild(temp);

        var humidity = document.createElement("li");
        humidity.setAttribute("class", "days-text");
        humidity.textContent = "Humidity: " + data.locations[cityCountryName].values[i].humidity + "%";
        days.appendChild(humidity);
    }

    $("#tabs").tabs();
};

getWeather(destinationCity, destinationCountry);

var savedDestinations = JSON.parse(localStorage.getItem("locations")) || [];
var saveDestinations = function(){
    
    var newSave = [departureCity, departureCountry, destinationCity, destinationCountry];
    // console.log(newSave);
     var flatLocations = savedDestinations.flat();
     if (flatLocations.indexOf(departureCity) !== -1 && flatLocations.indexOf(departureCountry) !== -1){
       console.log("a-bombed");
     } else {
        savedDestinations.push(newSave);
     }

     localStorage.setItem("destinations", JSON.stringify(savedDestinations)); 
}



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
        alert("please enter a value to be converted");
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
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    $("#convertedAmount").text(dollarUSLocale.format(data.result));
                    $("#amount").val("").attr("placeholder", dollarUSLocale.format(amount));
                    var search = $("<li>").text($("#fromSymbol").text() + " " + dollarUSLocale.format(amount) + " (" + locationCode + ") = " + $("#toSymbol").text() + " " + dollarUSLocale.format(data.result) + " (" + destinationCode + ")").addClass("bg-white");
                    $("#conversionHistory").prepend(search);
                    $(".conversionHistory .bg-white").slice(10).remove();
                });
            } else {
                alert("unable to retrieve conversion data");
                return;
            }
        })
        .catch(function (error) {
            alert("unable to connect with currency API");
            return;
        });
}

//set up for change in destination
async function swapDestination(newDestination) {
    var newCurrency = await getCurrency(newDestination);
    destinationCode = newCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&amount=&places=2";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    $("#convertTo").empty();
                    $("#toFlag").empty();
                    generateTo(newCurrency.currencySymbol, newCurrency.currencyName, destinationCode, data.result, newCurrency.countryFlag);
                });
            } else {
                alert("unable to retrieve conversion data");
                return;
            }
        })
        .catch(function (error) {
            alert("unable to connect with currency API");
            return;
        });
}

//convert country to currency code
async function getCurrency(country) {
    var apiUrl = "https://restcountries.com/v3.1/name/" + country + "?fields=currencies,flags";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                var data = response.json().then(function (data) {
                    var currency = Object.keys(data[0].currencies)[0];
                    var currencyObj = { currency: Object.keys(data[0].currencies)[0], currencyName: data[0].currencies[currency].name, currencySymbol: data[0].currencies[currency].symbol, countryFlag: data[0].flags.png };
                    return currencyObj;
                });
                return data;
            } else {
                alert("unable to retrieve conversion data");
                return;
            }
        })
        .catch(function (error) {
            alert("unable to connect with currency API");
            return;
        });
    return dataOne;
}

//change the country to the currency code, then run conversion API and populate dynamic fields
async function convertCurrency(departureCountry, destinationCountry) {
    var baseCurrency =  await getCurrency(departureCountry);
    var convertedCurrency = await getCurrency(destinationCountry);
    locationCode = baseCurrency.currency;
    destinationCode = convertedCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&places=2";
    fetch(apiUrl).then(function (response) {
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
        .catch(function (error) {
            alert("unable to connect with currency API");
            return;
        });
}

$("#container-2").on("click", "#convert", convertAmount);
$("#container-2").on("dblclick", "li", function () {
    $(this).remove();
});

convertCurrency(departureCountry, destinationCountry);//on page load, run this

    //Cory's code here
var APIkey = '01393325d86d48eab9f40e48844eb632';



//Local or Departure Time
function getDepartureTime(){
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=${APIkey}&location=${departureCity},%20${departureCountry}`)
        .then(response => response.json())
        .then(data => {
            var departureTime=`<span class="timeZone-departure" >` + departureCity + ` ,<br>${data.geo.country},<br> ${data.time_12}</span>`;

            $('#departureTime').append(departureTime);
        });
}
//Destination time
function getDestinationTime(){
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=${APIkey}&location=${destinationCity},%20${destinationCountry}`)
        .then(response => response.json())
        .then(data => {
            var destinationTime=`<span class="timeZone-destination">` + destinationCity + ` ,<br>${data.geo.country},<br> ${data.time_12}</span>`;
            $('#destinationTime').append(destinationTime);
        });
}



getDepartureTime(departureCity, departureCountry);
getDestinationTime(destinationCity, departureCountry);

// Get the modal
var modal = $("#modal");
// Get the <span> element that closes the modal
var span = $(".close")[0];
// When the user clicks on the button, open the modal
 function openModal() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
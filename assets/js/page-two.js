//Veronica's code here
//redirect
$("#logo").on("click", function () {
    document.location.replace("./index.html");
})

//logic passing query string from page one to two
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

//location variables
var departureCity = locations[1];
var departureCountry = locations[2];
var destinationCity = locations[3];
var destinationCountry = locations[4];

//query selectors to accommodate pure JavaScript coding
var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");

redirect(departureCity, departureCountry, destinationCity, destinationCountry);
getCountries();
aBombed();

//modal redirect
async function redirect(departureCity, departureCountry, destinationCity, destinationCountry) {
    var weather = await getWeather(destinationCity, destinationCountry);
    var currency = await convertCurrency(departureCountry, destinationCountry);
    var departTime = await getDepartureTime(departureCity, departureCountry);
    var arriveTime = await getDestinationTime(destinationCity, destinationCountry);
    if (!weather || !currency || !departTime || !arriveTime) {
        document.location.replace("./index.html?modal=true");
    }
}

//load destination country options
async function getCountries() {
    var apiUrl = "https://countriesnow.space/api/v0.1/countries/info?returns=name,cities";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                var data = response.json().then(function (data) {
                    for (i = 0; i < data.data.length; i++) {
                        if (data.data[i].cities) {
                            var country = data.data[i].name;
                            var option = $("<option>").attr("value", country).data("index", i).text(country);
                            $("#country-picker").append(option);
                        }
                    }
                });
                return data;
            } else {
                //modal here
                return false;
            }
        })
        .catch(function (error) {
            return false;
        });
    return dataOne;
}

//populate destination cities on destination country selection
async function getDestinationCities(country) {
    var apiUrl = "https://countriesnow.space/api/v0.1/countries/info?returns=name,cities,flag";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                var data = response.json().then(function (data) {
                    for (i = 0; i < data.data[country].cities.length; i++) {
                        var city = data.data[country].cities[i];
                        var option = $("<option>").text(city);
                        $("#city-picker").append(option);
                    }
                });
                return data;
            } else {
                alert("unable to retrieve location data");
                return;
            }
        })
        .catch(function (error) {
            alert("unable to connect with location API");
            return;
        });
    return dataOne;
}

//trigger city options
$("#country-picker").on("change", function () {
    $("#city-picker").empty();
    getDestinationCities($("#country-picker").find(":selected").data("index"));
});

//capture destination change
$("#new-destination-form").on("click", "#submit-new-destination", updateDestination);
function updateDestination(event) {
    event.preventDefault();
    destinationCity = $("#city-picker").val();
    destinationCountry = $("#country-picker").val();
    if (!destinationCity || !destinationCountry) {
        alert("please enter valid departure and destination locations");
    } else {
        document.location.replace("?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry);
    }
}

//Brennan's code here
//Candice's code here    

async function getWeather(city, country) {
    //console.log(city);
    var apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + city + "," + country + "&aggregateHours=24&forecastDays=15&unitGroup=metric&shortColumnNames=false&contentType=json&iconSet=icons1&key=UT9ETQEPJ8MCCY3HSCF2Z6358";
    var getData = await fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data, city, country);
                })
                return true;
            } else {
                openModal();
                return false;
            }
        })
        .catch(function (error) {
            return false;
        });
    console.log("c" + getData);
    return getData;
}
var displayWeather = function (data, city, country) {
    containerOne.innerHTML = "";
    containerOne.style.backgroundColor= "";
    var cityCountryName = city + "," + country;
    if (data.locations) {
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
    } else {
        containerOne.textContent = "Sorry unable to collect weather data from this location";
        containerOne.style.backgroundColor = "white";
    }
};

var savedDestinations = JSON.parse(localStorage.getItem("destinations")) || [];
var saveLocations = function (city, country, departurec, departurecc) {
    if (city === null || country === null || departurec === null || departurecc === null) {
        return;
    } else {

        var newSave = [city, country, departurec, departurecc];
        var flatLocations = savedDestinations.flat();
        if (flatLocations.indexOf(city) !== -1 && flatLocations.indexOf(country) !== -1 && flatLocations.indexOf(departurec) !== -1 && flatLocations.indexOf(departurecc) !== -1) {
            console.log("a-bombed");
        } else {
            if (savedDestinations.length === 9) {
                savedDestinations.shift();
                savedDestinations.push(newSave);
            } else {
                savedDestinations.push(newSave);
            };
        }

        localStorage.setItem("destinations", JSON.stringify(savedDestinations));
    }
}
saveLocations(destinationCity, destinationCountry, departureCity, departureCountry);

var cityBtnEl = document.querySelector(".btn-holder");
var saveButtons = function () {
    cityBtnEl.innerHTML = "";
    for (var i = 0; i < savedDestinations.length; i++) {
        newBtn = document.createElement("button");
        newBtn.classList.add("newbtn", "font-bold", "py-2", "px-4", "rounded");
        newBtn.textContent = savedDestinations[i][2] + " → " + savedDestinations[i][0];
        newBtn.value = savedDestinations[i][0] + "," + savedDestinations[i][1] + "," + savedDestinations[i][2] + "," + savedDestinations[i][3];
        cityBtnEl.appendChild(newBtn);

        newBtn.addEventListener("click", function (event) {

            var newArr = [];
            debugger;
            var fck = event.target.value.split(",");
            newArr.push(fck);
            newArr = newArr.flat();
            console.log(newArr[0]);
            var destcity = newArr[0];
            var destcount = newArr[1];
            var depcity = newArr[2];
            var depcount = newArr[3];
            getWeather(destcity, destcount);
            swapLocations(depcount, destcount);
            getDestinationTime(destcity, destcount);
            getDepartureTime(depcity, depcount);



        });
    };

}
saveButtons();




//Veronica's code here
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
    var amountInput = $("<input>").addClass("border form-width").attr("type", "text").attr("id", "amount").attr("placeholder", "1.00").attr("name", "amount");
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
    var convertedAmount = $("<p>").text(dollarUSLocale.format(amount)).addClass("inline-block").attr("id", "convertedAmount").attr("name", "convertedAmount");
    $("#convertTo").append(convertedLabel);
    $("#convertTo").append(convertedAmount);
    var toCurrency = $("<p>").text(name + " (" + code + ")").addClass("italic").attr("id", "toCurrency");
    $("#convertTo").append(toCurrency);
    var toFlag = $("<img>").attr("src", flag);
    $("#toFlag").append(toFlag).attr("alt", "country flag");
}

//on conversion click
async function convertAmount() {
    //changes the amount being converted
    var amount = $("#amount").val().trim();
    if (!amount || isNaN(amount) || amount % 1 != 0 || amount < 1 || amount > 1000000) {
        openCurrencyModal();
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
                return true;
            } else {
                //add modal
                return false;
            }
        })
        .catch(function (error) {
            //add modal
            return false;
        });
}

//swap locations when history button is clicked
//set up for change in destination
async function swapLocations(newDepartureCountry, newDestinationCountry) {
    var newDepartureCurrency = await getCurrency(newDepartureCountry);
    var newDestinationCurrency = await getCurrency(newDestinationCountry);
    locationCode = newDepartureCurrency.currency;
    destinationCode = newDestinationCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&amount=&places=2";
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    $("#convertFrom").empty();
                    $("#fromFlag").empty();
                    $("#convertTo").empty();
                    $("#toFlag").empty();
                    generateFrom(newDepartureCurrency.currencySymbol, newDepartureCurrency.currencyName, locationCode, newDepartureCurrency.countryFlag);
                    generateTo(newDestinationCurrency.currencySymbol, newDestinationCurrency.currencyName, destinationCode, data.result, newDestinationCurrency.countryFlag);
                });
            } else {
                //add modal
                return false;
            }
        })
        .catch(function (error) {
            //add modal
            return false;
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
                return false;
            }
        })
        .catch(function (error) {
            return false;
        });
    return dataOne;
}

//change the country to the currency code, then run conversion API and populate dynamic fields
async function convertCurrency(departureCountry, destinationCountry) {
    var baseCurrency = await getCurrency(departureCountry);
    var convertedCurrency = await getCurrency(destinationCountry);
    locationCode = baseCurrency.currency;
    destinationCode = convertedCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&places=2";
    var getData = await fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                generateFrom(baseCurrency.currencySymbol, baseCurrency.currencyName, locationCode, baseCurrency.countryFlag);
                generateTo(convertedCurrency.currencySymbol, convertedCurrency.currencyName, destinationCode, data.result, convertedCurrency.countryFlag);
                var setConversion = $("<p>").text(baseCurrency.currencySymbol + " 1.00 " + "(" + locationCode + ")" + " = " + convertedCurrency.currencySymbol + " " + dollarUSLocale.format(data.result) + " (" + destinationCode + ")").addClass("italic");
                $(setConversion).insertBefore($("#historyTitle"));
            });
            return true;
        } else {
            return false;
        }
    })
        .catch(function (error) {
            return false;
        });
    console.log("v" + getData);
    return getData;
}

//interactive elements in currency feature
$("#container-2").on("click", "#convert", convertAmount);
$("#container-2").on("dblclick", "li", function () {
    $(this).remove();
});

//for funsies
function aBombed() {
    if (departureCity === destinationCity && departureCountry === destinationCountry) {
        console.log("a-bombed");
    }
}

//Cory's code here
var APIkey = '01393325d86d48eab9f40e48844eb632';



//Local or Departure Time
async function getDepartureTime(depCity, depCountry) {
    var getData = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${APIkey}&location=` + depCity + `,%20` + depCountry)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(data => {
                        $('#departureTime').empty();
                        var departureTime = `<span class="timeZone-departure" >` + depCity + ` ,<br>${data.geo.country},<br> ${data.time_12}</span>`;
                        $('#departureTime').append(departureTime);
                    })
                return true;
            } else {
                return false;
            }
        })
        .catch(function (error) {
            return false;
        });
    console.log("cor" + getData);
    return getData;
}
//Destination time
async function getDestinationTime(destCity, destCountry) {
    var getData = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${APIkey}&location=` + destCity + `,%20` + destCountry)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(data => {
                        $('#destinationTime').empty();
                        var destinationTime = `<span class="timeZone-destination">` + destCity + ` ,<br>${data.geo.country},<br> ${data.time_12}</span>`;
                        $('#destinationTime').append(destinationTime);
                    })
                return true;
            } else {
                return false;
            }
        })
        .catch(function (error) {
            return false;
        });
    console.log("cor2" + getData)
    return getData;
}

// Modal
var modal = $("#modal");
// Get the <span> element that closes the modal
var span = $(".close")[0];
// When the user clicks on the button, open the modal
function openModal() {
    $("#modal").css("display", "block")
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    $("#modal").css("display", "none");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Modal
var currencyModal = $("#currencyModal");
// Get the <span> element that closes the modal
var currencySpan = $(".closeCurrency")[0];
// When the user clicks on the button, open the modal
function openCurrencyModal() {
    $("#currencyModal").css("display", "block")
}
// When the user clicks on <span> (x), close the modal
currencySpan.onclick = function () {
    $("#currencyModal").css("display", "none");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
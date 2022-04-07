
var header = $("#header");
var containerOne = $("#container-1");
var containerTwo = $("#container-2");
var containerThree = $("#container-3");

var departure = "Toronto";
var destination = "New York";
var destinationContainer = document.querySelector("#new-current-destination");


// departure will be current location, destination will be search location
//Brennan's code here


//Candice's code here

var updateDestination = function(){
	var newDestination = $("#textDestination").val();
	console.log(newDestination);
	destination = newDestination;
	
	getWeather();
	convertCurrency();
}

var getWeather = function(){//city){
    //console.log(destination);
    var apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + destination + "&aggregateHours=24&forecastDays=15&unitGroup=metric&shortColumnNames=false&contentType=json&iconSet=icons1&key=DDEWS835GJQFSW9E6Z6B3TS3K";
    fetch(apiURL)
    .then(function(response){
        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                  displayWeather(data, destination);
                  var country = data.locations[destination].address.split(",")
                  convertCurrency(country[2]);
            })
         } else {
             //insert error handling here
         };
    });
}
var displayWeather = function(data){//, city){
	var weatherTitleEl = document.createElement("div");
	weatherTitleEl.textContent=data.locations[destination].address;
	containerOne.append(weatherTitleEl);

	var currentWeather = document.createElement("div");
	currentWeather.textContent = "Temp: " + data.locations[destination].currentConditions.temp + " °C";
	containerOne.append(currentWeather);

// // var icon=document.createElement("div");
// icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].currentConditions.icon + ".png>";
// containerOne.appendChild(icon);
	var icon=document.createElement("div");
	icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[destination].values[1].icon + ".png>";
	containerOne.append(icon);

	//tabs 
	var tabForecast = document.createElement("div");
	tabForecast.setAttribute("id", "tabs")
	containerOne.append(tabForecast);

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
			date.textContent=moment(data.locations[destination].values[i].datetimeStr).format("L");
			days.appendChild(date);

        var icon=document.createElement("li");
        icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].values[i].icon + ".png>";
        days.appendChild(icon);

        // var temp = document.createElement("li");
        // temp.setAttribute("class", "days-text");
        // temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
        // days.appendChild(temp);
		// 	var temp = document.createElement("li");
		// 	temp.setAttribute("class", "days-text");
		// 	temp.textContent= "Temp: " + data.locations[destination].values[i].temp + " °C";
		// 	days.appendChild(temp);

			var humidity = document.createElement("li");
			humidity.setAttribute("class", "days-text");
			humidity.textContent= "Humidity: " + data.locations[destination].values[i].humidity + "%";
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
			date.textContent=moment(data.locations[destination].values[i].datetimeStr).format("L");
			days.appendChild(date);

        var icon=document.createElement("li");
        icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].values[i].icon + ".png>";
        days.appendChild(icon);

        // var temp = document.createElement("li");
        // temp.setAttribute("class", "days-text");
        // temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
        // days.appendChild(temp);
		// 	var temp = document.createElement("li");
		// 	temp.setAttribute("class", "days-text");
		// 	temp.textContent= "Temp: " + data.locations[destination].values[i].temp + " °C";
		// 	days.appendChild(temp);

			var humidity = document.createElement("li");
			humidity.setAttribute("class", "days-text");
			humidity.textContent= "Humidity: " + data.locations[destination].values[i].humidity + "%";
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
			date.textContent=moment(data.locations[destination].values[i].datetimeStr).format("L");
			days.appendChild(date);

        var icon=document.createElement("li");
        icon.innerHTML="<img src=./assets/images/weathericons/" + data.locations[cityName].values[i].icon + ".png>";
        days.appendChild(icon);

        // var temp = document.createElement("li");
        // temp.setAttribute("class", "days-text");
        // temp.textContent= "Temp: " + data.locations[cityName].values[i].temp + " °C";
        // days.appendChild(temp);
		// 	var temp = document.createElement("li");
		// 	temp.setAttribute("class", "days-text");
		// 	temp.textContent= "Temp: " + data.locations[destination].values[i].temp + " °C";
		// 	days.appendChild(temp);

			var humidity = document.createElement("li");
			humidity.setAttribute("class", "days-text");
			humidity.textContent= "Humidity: " + data.locations[destination].values[i].humidity + "%";
			days.appendChild(humidity);
	}

    $("#tabs").tabs();
 };

 getWeather(destination);
 


//Veronica's code here

//To do:
//CSS
//streamline code
//error handling and validations - change to modals
//conversion history?

// .max-size {
//     max-width: 30px;
//     margin: 0 10px;
// }

// .form-width {
//     max-width: 75px;
// }

// #loadingImg {
//     max-width: 100px;
// }

// #convert {
//     border-radius: 15px;
//     background: orange;
// }

//currency API
//placeholder variables
//var departure = "Toronto";
//var destination = "United States";//needs to be a country (assumes taking value from weather call)

//load screen for delay in promise fulfillment
function loading() {
    containerTwo.addClass("p-3 text-center")
    var flexContainer = $("<div>");
    $(flexContainer).addClass("flex justify-center").attr("id", "flexContainer");
    containerTwo.append(flexContainer);
    var loading = $("<img>");
    $(loading).attr("src", "./weathcon-favicon.png").attr("alt", "loading").attr("id", "loadingImg");
    $("#flexContainer").append(loading);
    var loadingText = $("<h2>");
    $(loadingText).text("Loading...").addClass("m-1");
    containerTwo.append(loadingText);  
	
	
	$('<input/>').attr({type:'text', id:'textDestination', name:'textDestination'}).addClass('d-inline-block').appendTo(destinationContainer);
	$('<input/>').attr({type:'button', id:'btnDestination', name:'btnDestination', value:'Go'}).addClass('d-inline-block').appendTo(destinationContainer);   
	//.append('<i class="fa-solid fa-city"></i>')
	$(destinationContainer).on("click", "#btnDestination", updateDestination);
}

//top-level divs
function generateFormat() {
    //top-level
    var conversionDiv = $("<div>");
    $(conversionDiv).addClass("border m-5").attr("id", "conversionDiv");
    $("#container-2").append(conversionDiv);
    var historyDiv = $("<div>");
    $(historyDiv).addClass("border m-5").attr("id", "historyDiv");
    $("#container-2").append(historyDiv);
    //mid-level divs conversion
    var fromDiv = $("<div>");
    $(fromDiv).addClass("p-3").attr("id", "convertFrom");
    $("#conversionDiv").append(fromDiv);
    var ButtonDiv = $("<div>")
    $(ButtonDiv).addClass("flex justify-center items-center").attr("id", "convertButtons");
    $("#conversionDiv").append(ButtonDiv);
    var toDiv = $("<div>")
    $(toDiv).addClass("p-3").attr("id", "convertTo");
    $("#conversionDiv").append(toDiv);
    //button div elements conversion
    var fromFlagDiv = $("<div>");
    $(fromFlagDiv).addClass("border inline-block max-size").attr("id", "fromFlag");
    $("#convertButtons").append(fromFlagDiv);
    var conversionButton = $("<button>");
    $(conversionButton).text("CONVERT TO").addClass("px-3 py-1").attr("id", "convert");
    $("#convertButtons").append(conversionButton);
    var toFlagDiv = $("<div>");
    $(toFlagDiv).addClass("border inline-block max-size").attr("id", "toFlag");
    $("#convertButtons").append(toFlagDiv);
    //mid-level elements history
    var historyTitle = $("<h2>").text("Conversion History:").attr("id", "historyTitle");
    $("#historyDiv").append(historyTitle);
    var conversionHistory = ("<ul>");
    $(conversionHistory).addClass("border").attr("id", "conversionHistory");
    $("#historyDiv").append(conversionHistory);
}

//internally dynamic elements
//convert from
function generateFrom(symbol, name, code, flag) {
    var amountLabel = $("<label>");
    $(amountLabel).addClass("mr-1").attr("for", "amount").text(symbol);
    var amountInput = $("<input>").addClass("border form-width").attr("type", "text").attr("id", "amount").attr("placeholder", "1.00");
    $("#convertFrom").append(amountLabel);
    $("#convertFrom").append(amountInput);
    var fromCurrency = $("<p>").text(name + " (" + code + ")").addClass("italic").attr("id", "fromCurrency");
    $("#convertFrom").append(fromCurrency);
    var fromFlag = $("<img>");
    $(fromFlag).attr("src", flag).attr("alt", "country flag");
    $("#fromFlag").append(fromFlag);
}
//generate to
function generateTo(symbol, name, code, amount, flag) {
    var convertedLabel = $("<label>");
    $(convertedLabel).addClass("mr-1").attr("for", "convertedAmount").text(symbol);
    var convertedAmount = $("<p>");
    $(convertedAmount).text(amount).addClass("inline-block").attr("id", "convertedAmount");
    $("#convertTo").append(convertedLabel);
    $("#convertTo").append(convertedAmount);
    var toCurrency = $("<p>");
    $(toCurrency).text(name + " (" + code + ")").addClass("italic").attr("id", "toCurrency");
    $("#convertTo").append(toCurrency);
    var toFlag = $("<img>");
    $(toFlag).attr("src", flag);
    $("#toFlag").append(toFlag).attr("alt", "country flag");
}

//start currency API logic
var locationCode = "";//currency code returned from getCurrency()
var destinationCode = "";//currency code returned from getCurrency()

//on conversion click
function convertAmount() {
    //changes the amount being converted
    var submitForm = document.querySelector("#amount");
    var amount = submitForm.value.trim();
    if (isNaN(amount)) {
        alert("please enter a numerical value");
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
                    $("#convertedAmount").text(data.result);
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

    // set so that the amount field now captures changed country to test function - add function call to Candice's code to get country from city
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
                if(response.ok) {
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

//get country user is currently in
function getCountry(country) {
    var apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + country + "?key=X9LBGTKUKSQ3B9GUW69YR2WX9";//replace personal key
    var dataOne = fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                var data = response.json().then(function(data) {
                    var country = data.resolvedAddress.split(",");
                        var countryCode = getCurrency(country[2]).then(res => {
                            // console.log({res});
                            return res;
                        })
                        return countryCode;
                    });
                    return data;
            } else {
                alert("unable to retrieve conversion data");
                return;
            }
        })
        .catch(function(error) {
            alert("unable to connect with currency API");
            return;
        });
   return dataOne;
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

 async function convertCurrency() { //destination) { //add convertCurrency(locationCodeFromWeatherAPI) to Candice's code
    // var departure = $.trim($("#amount").val()); //change id for the form element in header
    //var departure="New York";
    var baseCurrency =  await getCountry(departure);
	var convertedCurrency = await getCountry(destination);
	//console.log(destinationCountry);
    //var convertedCurrency = await getCurrency(destinationCountry);
    locationCode = baseCurrency.currency;
    destinationCode = convertedCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + locationCode + "&to=" + destinationCode + "&places=2";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                $("#container-2").empty();
                generateFormat();
                generateFrom(baseCurrency.currencySymbol, baseCurrency.currencyName, locationCode, baseCurrency.countryFlag);
                generateTo(convertedCurrency.currencySymbol, convertedCurrency.currencyName, destinationCode, data.result, convertedCurrency.countryFlag);
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

$(containerTwo).on("click", "#convert", convertAmount);
// convertCurrency(departure, destination); //form capture, parse from weather promise - add to Candice's code or the overall click handler

loading();

//Cory's code here
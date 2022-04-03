var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");
// departure will be current location, destination will be search location
//Brennan's code here
//Candice's code here
//Veronica's code here

//top-level divs
function topLevel(cls, id) {
    var createDiv = document.createElement("div");
    createDiv.className = cls;
    createDiv.setAttribute("id", id)
    containerTwo.appendChild(createDiv);
}
topLevel("border convert-from", "convertFrom");
topLevel("border convert-buttons", "convertButtons");
topLevel("border convert-to", "convertTo");

//mid-level divs
var createDiv = document.createElement("div");
createDiv.className = "border from-form";
createDiv.setAttribute("id", "fromForm")
convertFrom.appendChild(createDiv);

var createDiv = document.createElement("div");
createDiv.className = "border to-form";
createDiv.setAttribute("id", "toForm")
convertTo.appendChild(createDiv);

//inner elements
var from = document.createElement("h2");
from.textContent = "FROM";
convertFrom.appendChild(from);

var to = document.createElement("h2");
to.textContent = "TO";
convertTo.appendChild(to);

var conversionButton = document.createElement("button");
conversionButton.textContent = "CONVERT";
convertButtons.appendChild(conversionButton);

//internally dynamic elements
//input form
var amountLabel = document.createElement("label");
amountLabel.setAttribute("for", "amount");
amountLabel.textContent = "$";//change to be variable for symbol
var amountInput = document.createElement("input");
amountInput.type = "text";
amountInput.id = "amount";
amountInput.placeholder = 1;
convertFrom.appendChild(amountLabel);
convertFrom.appendChild(amountInput);

//inner elements
var fromCurrency = document.createElement("p");
fromCurrency.textContent = "Canadian Dollars (CAD)"; //change to be variable for currency name and code
fromCurrency.className = "currencyName";
fromCurrency.setAttribute = ("id", "fromCurrency");
convertFrom.appendChild(fromCurrency);

var convertedAmount = document.createElement("p");
convertedAmount.textContent = "$1";//change to variable
convertTo.appendChild(convertedAmount);

var toCurrency = document.createElement("p");
toCurrency.textContent = "Canadian Dollars (CAD)"; //change to be variable for currency name and code
toCurrency.className = "currencyName";
toCurrency.setAttribute = ("id", "toCurrency");
convertTo.appendChild(toCurrency);

//start logic
var departure = "Toronto";
var destination = "Hong Kong";
var amount = 1;

//get country user is currently in
function departureCountry(departure) {
    var apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + departure + "?key=X9LBGTKUKSQ3B9GUW69YR2WX9";//replace personal key
    var dataOne = fetch(apiUrl).then(function(response) {
       var data = response.json().then(function(data) {
           var country = data.resolvedAddress.split(",");
            var countryCode = getCurrency(country[2]).then(res => {
                // console.log({res});
                return res;
            })
            return countryCode;
        });
        return data;
    });
   return dataOne;
}

//convert country to currency code
async function getCurrency(country) {
    var apiUrl = "https://restcountries.com/v3.1/name/" + country;
    var dataOne = fetch(apiUrl).then(function(response) {
       var data =  response.json().then(function(data) {
            var currency = Object.keys(data[0].currencies)[0];
            var currencyName = data[0].currencies[currency].name;
            var currencySymbol = data[0].currencies[currency].symbol;
            console.log(currencyName);
            console.log(currencySymbol);
            return currency;
        });
        return data;
    });
  return dataOne; 
}

//on submit, run the following
async function convertCurrency(departure, destination, amount) {
    var baseCurrency =  await departureCountry(departure);
            console.log(currencyName);
            console.log(currencySymbol);
    var convertedCurrency = await getCurrency(destination);
            console.log(currencyName);
            console.log(currencySymbol);
    console.log(baseCurrency); //undefined
    console.log(convertedCurrency);
    var apiUrl = "https://api.exchangerate.host/convert?from=" + baseCurrency + "&to=" + convertedCurrency + "&amount=" + amount + "&places=2";
    console.log(apiUrl);
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data.result);
        });
    })
}

convertCurrency(departure, destination, amount); //form capture, parse from weather promise, form capture

//Cory's code here
var header = document.querySelector("#header");
var containerOne = document.querySelector("#container-1");
var containerTwo = document.querySelector("#container-2");
var containerThree = document.querySelector("#container-3");
// departure will be current location, destination will be search location
//Brennan's code here
//Candice's code here
//Veronica's code here

//To do:
//capture form fields
//formatting
//CSS
//streamline code

//top-level divs
function topLevel() {
    var fromDiv = $("<div>");
    $(fromDiv).addClass("border convert-from").attr("id", "convertFrom");
    $("#container-2").append(fromDiv);
    var ButtonDiv = $("<div>")
    $(ButtonDiv).addClass("border convert-buttons").attr("id", "convertButtons");
    $("#container-2").append(ButtonDiv);
    var toDiv = $("<div>")
    $(toDiv).addClass("border convert-to").attr("id", "convertTo");
    $("#container-2").append(toDiv);
    // var createDiv = document.createElement("div");
    // createDiv.className = cls;
    // createDiv.setAttribute("id", id)
    // containerTwo.appendChild(createDiv);
}

//mid-level divs
function midLevel() {
    var fromFormDiv = $("<div>");
    $(fromFormDiv).addClass("border from-form").attr("id", "fromForm");
    $("#convertFrom").append(fromFormDiv);
    var toFormDiv = $("<div>");
    $(toFormDiv).addClass("border to-form").attr("id", "toForm")
    $("#convertTo").append(toFormDiv);
    // var createDiv = document.createElement("div");
    // createDiv.className = "border from-form";
    // createDiv.setAttribute("id", "fromForm")
    // convertFrom.appendChild(createDiv);
    // var createDiv = document.createElement("div");
    // createDiv.className = "border to-form";
    // createDiv.setAttribute("id", "toForm")
    // convertTo.appendChild(createDiv);
}

//inner elements
function innerElements() {
    var from = $("<h2>");
    $(from).text("FROM");
    $("#convertFrom").append(from);
    var to = $("<h2>");
    $(to).text("TO");
    $("#convertTo").append(to);
    var conversionButton = $("<button>");
    $(conversionButton).text("CONVERT").attr("id", "convert");
    $("#convertButtons").append(conversionButton);
    // var from = document.createElement("h2");
    // from.textContent = "FROM";
    // convertFrom.appendChild(from);
    // var to = document.createElement("h2");
    // to.textContent = "TO";
    // convertTo.appendChild(to);
    // var conversionButton = document.createElement("button");
    // conversionButton.textContent = "CONVERT";
    // conversionButton.setAttribute("id", "convert");
    // convertButtons.appendChild(conversionButton);
}

topLevel();
midLevel();
innerElements();

//internally dynamic elements
//convert from
function generateFrom(symbol, name, code) {
    var amountLabel = $("<label>");
    $(amountLabel).attr("for", "amount").text(symbol);
    var amountInput = $("<input>").attr("type", "text").attr("id", "amount").attr("placeholder", 1);
    $("#convertFrom").append(amountLabel);
    $("#convertFrom").append(amountInput);
    var fromCurrency = $("<p>").text(name + " (" + code + ")").addClass("currencyName").attr("id", "fromCurrency");
    $("#convertFrom").append(fromCurrency);
    // var amountLabel = document.createElement("label");
    // amountLabel.setAttribute("for", "amount");
    // amountLabel.textContent = symbol;
    // var amountInput = document.createElement("input");
    // amountInput.type = "text";
    // amountInput.id = "amount";
    // amountInput.placeholder = 1;
    // convertFrom.appendChild(amountLabel);
    // convertFrom.appendChild(amountInput);
    // var fromCurrency = document.createElement("p");
    // fromCurrency.textContent = name + " (" + code + ")";
    // fromCurrency.className = "currencyName";
    // fromCurrency.setAttribute = ("id", "fromCurrency");
    // convertFrom.appendChild(fromCurrency);
}
//generate to
function generateTo(symbol, name, code, amount) {
    var convertedLabel = $("<label>");
    $(convertedLabel).attr("for", "convertedAmount").text(symbol);
    var convertedAmount = $("<p>");
    $(convertedAmount).text(amount).attr("id", "convertedAmount");
    $("#convertTo").append(convertedLabel);
    $("#convertTo").append(convertedAmount);
    var toCurrency = $("<p>");
    $(toCurrency).text(name + " (" + code + ")").addClass("currencyName").attr("id", "toCurrency");
    $("#convertTo").append(toCurrency);
    // var convertedAmount = document.createElement("p");
    // convertedAmount.textContent = symbol + amount;//change to variable
    // convertTo.appendChild(convertedAmount);
    // var toCurrency = document.createElement("p");
    // toCurrency.textContent = name + " (" + code + ")";
    // toCurrency.className = "currencyName";
    // toCurrency.setAttribute = ("id", "toCurrency");
    // convertTo.appendChild(toCurrency);
}

//start logic
var departure = "Europe";
var destination = "Hong Kong";
var setLocation = "";
var setDestination = "";

//on conversion click
function clickHandler(event) {
    var targetElement = event.target
    if (targetElement.matches("#convert")) {
        var submitForm = document.querySelector("#amount");
        var amount = submitForm.value.trim();
        var apiUrl = "https://api.exchangerate.host/convert?from=" + setLocation + "&to=" + setDestination + "&amount=" + amount + "&places=2";
        fetch(apiUrl).then(function(response) {
            response.json().then(function(data) {
                $("#convertedAmount").text(data.result);
            });
        })
    }
}


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
            var currencyObj = {currency: Object.keys(data[0].currencies)[0], currencyName: data[0].currencies[currency].name, currencySymbol: data[0].currencies[currency].symbol};
            return currencyObj;
        });
        return data;
    });
  return dataOne; 
}

//on submit, run the following
async function convertCurrency(departure, destination, amount) {
    var baseCurrency =  await departureCountry(departure);
    var convertedCurrency = await getCurrency(destination);
    setLocation = baseCurrency.currency;
    setDestination = convertedCurrency.currency;
    var apiUrl = "https://api.exchangerate.host/convert?from=" + setLocation + "&to=" + setDestination + "&places=2";
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            generateFrom(baseCurrency.currencySymbol, baseCurrency.currencyName, setLocation);
            generateTo(convertedCurrency.currencySymbol, convertedCurrency.currencyName, setDestination, data.result);
        });
    })
}

convertCurrency(departure, destination); //form capture, parse from weather promise
containerTwo.addEventListener("click", clickHandler);

//Cory's code here
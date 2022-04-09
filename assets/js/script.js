//Veronica's code here
//redirect
$("#logo").on("click", function() {
	document.location.replace("./index.html");
});

getCountries();
//populate country drop downs
function getCountries() {
    var apiUrl = "https://countriesnow.space/api/v0.1/countries/info?returns=name,cities";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                var data = response.json().then(function (data) {
					for (i = 0; i < data.data.length; i++) {
						if (data.data[i].cities) {
							var country = data.data[i].name;
							var option = $("<option>").attr("value", country).data("index", i).text(country);
							$("#country-selector").append(option);
						}
					}
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

function getDepartureCities(country) {
	var apiUrl = "https://countriesnow.space/api/v0.1/countries/info?returns=name,cities,flag";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
				console.log(country);
				var data = response.json().then(function (data) {
					console.log(data.data[country].cities)
					for (i = 0; i < data.data[country].cities.length; i++) {
						console.log("should be generated")
                    var city = data.data[country].cities[i];
					var option = $("<option>").text(city);
					$("#city-selector").append(option);
					}
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

function getDestinationCities(country) {
	var apiUrl = "https://countriesnow.space/api/v0.1/countries/info?returns=name,cities,flag";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
				console.log(country);
				var data = response.json().then(function (data) {
					console.log(data.data[country].cities)
					for (i = 0; i < data.data[country].cities.length; i++) {
						console.log("should be generated")
                    var city = data.data[country].cities[i];
					var option = $("<option>").text(city);
					$("#city-picker").append(option);
					}
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

$("#country-selector").on("change", function() {
	$("#city-selector").empty();
	getDepartureCities($("#country-selector").find(":selected").data("index"));
});

$("#country-picker").on("change", function() {
	$("#city-picker").empty();
	getDestinationCities($("#country-picker").find(":selected").data("index"));
});

$("#initialSubmit").on("click", function() {
	var departureCity = $("#city-selector").val();
	var departureCountry = $("#country-selector").val();
	var destinationCity = $("#city-picker").val();
	var destinationCountry = $("#country-picker").val();
	if (!departureCity || !departureCountry || !destinationCity || !destinationCountry) {
		alert("please enter valid departure and destination locations");
	} else {
		document.location.replace("./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry);
	}
});
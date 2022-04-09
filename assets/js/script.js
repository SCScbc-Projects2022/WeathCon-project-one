//Veronica's code here
//redirect
$("#logo").on("click", function() {
	document.location.replace("./index.html");
});

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

//populate departure cities on departure country selection
function getDepartureCities(country) {
	var apiUrl = "https://countriesnow.space/api/v0.1/countries/info?returns=name,cities,flag";
    var dataOne = fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
				var data = response.json().then(function (data) {
					for (i = 0; i < data.data[country].cities.length; i++) {
                    var city = data.data[country].cities[i];
					var option = $("<option>").text(city);
					$("#city-selector").append(option);
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

//populate destination cities on destination country selection
function getDestinationCities(country) {
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

//event handlers
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

getCountries();

// Modal
var modal = $("#modal");
// Get the <span> element that closes the modal
var span = $(".close")[0];
// When the user clicks on the button, open the modal
 function openModal() {
  $("#modal").css("display","block")
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  $("#modal").css("display","none");
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

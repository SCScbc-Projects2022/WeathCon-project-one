//Veronica's code here
//redirect
$("#logo").on("click", function() {
	document.location.replace("./index.html");
});

//drop down menus
$(function() {
    $("#country-selector").selectmenu();
	$("#city-selector").selectmenu();
    $("#country-picker").selectmenu();
	$("#city-picker").selectmenu();
});

//use these placeholders if you want to test your code without it breaking
var departureCity = "";
var departureCountry = "";
var destinationCity = "";
var destinationCountry = "";

$("#initialSubmit").on("click", function() {
	departureCity = $("#city-selector").val();
	departureCountry = $("#country-selector").val();
	destinationCity = $("#city-picker").val();
	destinationCountry = $("#country-picker").val();
	if (!departureCity || !departureCountry || !destinationCity || !destinationCountry) {
		alert("please enter valid departure and destination locations");
	} else {
		document.location.replace("./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry);
	}
});
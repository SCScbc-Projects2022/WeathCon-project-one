//Brennan to add code 
$("#initialSubmit").click(function(event) {
	event.preventDefault();
	event.stopPropagation();
	window.location.replace("./page-two.html?departureCity=" + encodeURI($('#current-city').val()) + "&departureCountry=" + encodeURI($('#current-country').val()) + 
	"&destinationCity=" + encodeURI($('#destination-city').val()) + "&destinationCountry=" + encodeURI($('#destination-country').val()));
});








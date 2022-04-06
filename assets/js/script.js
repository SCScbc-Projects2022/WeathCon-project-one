//Brennan to add code to on click, capture value of input fields
//placeholder variables
var departureCity = "new york";
var departureCountry = "united states";
var destinationCity = "toronto";
var destinationCountry = "canada";
//then those captured fields will automatically populate as parameters to be passed to page two - do not change this logic
$("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");

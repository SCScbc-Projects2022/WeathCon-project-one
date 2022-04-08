//capture and update form fields - Veronica
// var departureCity = "";
// var departureCountry = "";
// var destinationCity = "";
// var destinationCountry = "";

// $("#current-city").on("change", function() {
//   departureCity = $(this).val();
//   $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
// });
// $("#current-country").on("change", function() {
//   departureCountry = $(this).val();
//   $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
// });
// $("#destination-city").on("change", function() {
//   destinationCity = $(this).val();
//   $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
// });
// $("#destination-country").on("change", function() {
//   destinationCountry = $(this).val();
//   $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
// });

//use these placeholders if you want to test your code without it breaking
var departureCity = "paris";
var departureCountry = "france";
var destinationCity = "tokyo";
var destinationCountry = "japan";

$("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
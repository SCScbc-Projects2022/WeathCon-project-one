//capture and update form fields - Veronica
var departureCity = "";
var departureCountry = "";
var destinationCity = "";
var destinationCountry = "";

$("#current-city").on("change", function() {
  departureCity = $(this).val();
  $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
});
$("#current-country").on("change", function() {
  departureCountry = $(this).val();
  $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
});
$("#destination-city").on("change", function() {
  destinationCity = $(this).val();
  $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
});
$("#destination-country").on("change", function() {
  destinationCountry = $(this).val();
  $("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");
});

//use these placeholders if you want to test your code without it breaking
// var departureCity = "paris";
// var departureCountry = "france";
// var destinationCity = "tokyo";
// var destinationCountry = "japan";

$("#initialSubmit").html("<a href='./page-two.html?" + departureCity + "?" + departureCountry + "?" + destinationCity + "?" + destinationCountry + "'>Submit</a>");

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
//Add event listener to create new button with input title
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    
    var newShow = $("#new-show").val().trim();
    console.log(newShow);

    var showButton = $("<button>");
    showButton.attr("id", newShow);
    showButton.text(newShow);
    $("#button-div").append(showButton);

var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newShow + "&api_key=bBlegFujhJCYdMATQpNX51744gjcVYd0&limit=10";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

});
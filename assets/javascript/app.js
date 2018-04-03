//Create initial array of TV shows
var tvShows = ["Friends", "Cheers", "Parenthood", "Scrubs"];

//Load TV show buttons from array when window loads
$(window).on('load', displayButtons());

//Function to display array items as buttons
function displayButtons(){
    //Enpty div before reloading with new buttons
    $("#button-div").empty();
    //For loop to go through array and create a button for each
    for(i=0; i<tvShows.length; i++){
    var showName = tvShows[i];
    //Create button
    var tvButton = $("<button>");
    //Add ID to button
    buttonID = tvButton.attr("id", showName);
    console.log(buttonID);
    //Add bootstrap button classes to buttons
    tvButton.attr("class", "showbtn btn btn-default");
    //Add text to button
    tvButton.attr("name", showName);
    //Add text to button
    tvButton.text(showName);
    //Add button to page
    $("#button-div").append(tvButton);
    };
}

//Add event listener to push new show to array
$("#submit-button").on("click", function(event) {
    //Stop from reloading
    event.preventDefault();
    console.log(buttonID)
    //Grab user input from input box
    var newShow = $("#new-show").val().trim();
    //Push user input to buttons array
    tvShows.push(newShow);
    //Display buttons with new input
    displayButtons();

});

    //Create click event for new buttons
    $(".showbtn").on("click", function(event) {
        event.preventDefault();
        console.log(buttonID);
        
        //Create Giphy URL
        var queryURL = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + this.id + "&api_key=bBlegFujhJCYdMATQpNX51744gjcVYd0";
        console.log(queryURL);

        //Create AJAX request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            console.log(results);

        //Create for loop to go through AJAX results and pull relevent information
        for(i = 0; i < results.length; i++){

            // Creating a div with the class "item"
            var gifDiv = $("<div class='item'>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var tvGif = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            tvGif.attr("src", results[i].images.fixed_height.url);
            tvGif.attr("data-animate", results[i].images.fixed_height.url);
            tvGif.attr("data-still", results[i].images.fixed_height_still.url);
            tvGif.attr("data-state", "still");
            tvGif.attr("class", "gif-class");

            console.log(tvGif);

            // Append the paragraph and gif we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(tvGif);

            // Prepend the gifDiv to the div in the HTML
            $("#gif-div").prepend(gifDiv);

            console.log("data-state")
        }

        $(".gif-class").on("click", function() {
            event.preventDefault();
            console.log("clicked");
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
        });
    });
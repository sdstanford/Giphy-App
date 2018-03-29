//Add event listener to create new button with input title
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    
    var newShow = $("#new-show").val().trim();
    console.log(newShow);

    var showButton = $("<button>");
    showButton.attr("id", newShow);
    showButton.text(newShow);
    $("#button-div").append(showButton);

    $("#" + newShow).on("click", function(event) {
        event.preventDefault();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newShow + "&api_key=bBlegFujhJCYdMATQpNX51744gjcVYd0&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            var results = response.data;

            console.log(results);

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

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(tvGif);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gif-div").prepend(gifDiv);
        }
        });
    });
});
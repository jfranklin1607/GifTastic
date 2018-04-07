//initializing topic array



function displayTopicGif() {

    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        // Storing the rating data
        var results = response.data;
        for (var i = 0; i < results.length; i++) {


            // Creating a div to hold the topic
            var topicDiv = $("<div class='topic'>");

            var rating = results[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            topicDiv.append(pOne);

            // Creating an element to hold the image
            var image = $("<img>");
            image.attr("src", results[i].images.fixed_height.url);

            // Appending the image
            topicDiv.append(image);

            // Putting the entire topic above the previous topic
            $("#giphy-view").append(topicDiv);

        }
    });
}

var topics = ["Black Panther", "Home Alone", "Jumanji", "Revenge of the Nerds", "Jurassic Park",
    "Space Jam", "Titanic", "City of God", "Avengers: Infinity War", "Scarface", "Back to the Future", "Training Day"];


// Function for displaying image data
function renderButtons() {

    // Deleting the images prior to adding new topics
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of topic to our button
        a.addClass("topic");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the giphy-view div
        $("#buttons-view").append(a);


    }
}


// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#giphy-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our topic array
    renderButtons();
});

$(document).on("click", ".topic", displayTopicGif);

// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();    
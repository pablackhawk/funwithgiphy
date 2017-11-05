$(document).ready(function() {
	var topics = ["Aircraft", "Cars", "D&D", "Star Trek",
				  "Star Wars", "Disney", "Video Games", 
				  "Anaheim Ducks"];

	function displayTopics() {
		var images = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        images + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {
        	var gifDiv = $("<div class ='gif'>");
        	var rating = "";
        });
	}
	//creates buttons
	function renderButtons() {
		$("#buttonStorage").empty();
		for (var i =0; i<topics.length; i++) {
			var a = $("<button>");
			a.addClass("topic");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#buttonStorage").append(a);
		}
	}
	//handles adding topic
	$("#addTopic").on("click", function(event) {
		event.preventDefault();
		var newTopic = $("#topicInput").val().trim();
		topics.push(newTopic);
		renderButtons();
	});

	$(document).on("click", ".topic", displayTopics);

	renderButtons();
});
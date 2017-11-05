$(document).ready(function() {
	var topics = ["Aircraft", "Cars", "D&D", "Star Trek",
				  "Star Wars", "Disney", "Video Games", 
				  "Anaheim Ducks"];
		

		$(".image").on("click", function() {
        		var state = $(this).attr("data-state");
        		console.log(state);
        		if (state === "still") {
		          $(this).attr("src", $(this).attr("data-animate"));
		          $(this).attr("data-state", 'animate');

		        }
		        else if ( state === 'animate') {
		          $(this).attr('src', $(this).attr("data-still"));
		          $(this).attr("data-state", 'still');

        		}
        	});

	function displayTopics() {
		$("#gifStorage").empty();
		var images = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        images + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {
        	console.log(response);
        	var results = response.data;
        	for(var i = 0; i < results.length; i++) {
        	var gifDiv = $("<div class ='gif'>");
        	var p = $("<p>").text("Rating: " + results [i].rating);
        	var gifImage = $("<img>");
        	gifImage.attr("src", results[i].images.fixed_height_still.url);
        	gifImage.attr("data-state", 'still');
        	gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        	gifImage.attr("data-animate", results[i].images.looping.mp4);
        	gifImage.attr("class", 'image');
        	gifDiv.append(p);
        	gifDiv.append(gifImage);

        	$("#gifStorage").append(gifDiv);


        }
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
	$("#add-topic").on("click", function(event) {
		event.preventDefault();
		var newTopic = $("#topic-input").val().trim();
		console.log(newTopic);
		topics.push(newTopic);
		renderButtons();
	});

	$(document).on("click", ".topic", displayTopics);

	renderButtons();

	
});
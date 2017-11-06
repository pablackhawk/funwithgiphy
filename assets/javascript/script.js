$(document).ready(function() {

	var topics = ["Aircraft", "Cars", "Dungeons & Dragons", "Star Trek",
				  "Star Wars", "Disney", "Video Games", 
				  "Anaheim Ducks"];	

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
        	if (results == ""){
        		alert("There are no gifs for that topic")
        	}

        	for(var i = 0; i < results.length; i++) {
	        	var gifDiv = $("<div class ='gif'>");
	        	var thisRating = results[i].rating;
	        	var p = $("<p>").text("Rating: " + thisRating);
	        	if (thisRating === ""){
	        		thisRating = 'Unrated';
	        	}

	        	var gifImage = $("<img>");
	        	gifImage.attr("src", results[i].images.fixed_height_still.url); //still gif
	        	gifImage.attr("data-still", results[i].images.fixed_height_still.url); //still gif
	        	gifImage.attr("data-animate", results[i].images.fixed_height.url); //animated gif, supposedly
	        	gifImage.attr("data-state", 'still'); //supposed to imput check for moving or still
	        	gifImage.attr("class", 'image'); //selector for the gif
	        	gifDiv.append(p);
	        	gifDiv.append(gifImage);

	        	$("#gifStorage").append(gifDiv); //places gifs on the page

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

	renderButtons();
	$(document).on("click", ".topic", displayTopics);
	
	
		$("body").on("click", ".image", function() {
        		var state = $(this).attr("data-state");
        		console.log(this);
	        		if (state === "still") {
			          $(this).attr("src", $(this).data('animate'));
			          $(this).attr("data-state", 'animate');

			        }
			        else {
			          $(this).attr("src", $(this).data('still'));
			          $(this).attr("data-state", 'still');

	        		}
	        	});
	
});
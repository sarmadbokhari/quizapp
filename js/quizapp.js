/* selectors */

/* views */
var $movieSelector = $('#movie-selector');
var $results = $('#results');

/* btns */
var $btnNext = $('#next');
var $btnAgain = $('#again');
var $btnSubmit = $('#submit');
var $btnRestart = $('#restart');

/* movie views */
var $movieTitle = $('#title');
var $movieStarring = $('#starring');
var $moveieReview = $('#review');
var $movieCover = $('#cover');
var $movieCoverMessage = $('p',$movieCover);
var $movieCoverImg = $('img',$movieCover);

/* message */
var $message = $('#message');

/* quiz app */
function MovieQuiz(){

	var batmanBegins = { title: "Batman Begins", starring: "Christian Bale", img: "batmanbegins.jpg" };
	var chamber = { title: "Chamber of Secrets", starring: "Harry Potter", img: "chamberofsecrets.jpg"};
	var inception = { title: "Inception", starring: "Leonardo DiCaprio", img: "inception.jpg" };
	var lionKing = { title: "Lion King", starring: "Simba", img: "lionking.jpg" };
	var lionOfTheDesert = { title: "Lion of the Desert", starring: "Anthony Quinn", img: "lionofdesert.jpg" };
	var lotr = { title: "Lord of the Rings", starring: "Elijah Wood, Ian McKellan", img: "lotr.jpg" };
	var malcolmX = { title: "Malcolm X", starring: "Denzel Washington", img: "malcolmx.jpg" };
	var matrix = { title: "The Matrix", starring: "Keanu Reeves", img: "matrix.jpg" };
	var shawshank = { title: "Shawshank Redemption", starring: "Tim Robbins, Morgan Freeman", img: "shawshank.jpg" };
	var theAvengers = { title: "The Avengers", starring: "Robert Downey Jr. & others", img: "avengers.jpg" };
	var theGodfather = { title: "The Godfather", starring: "Marlon Brando Jr.", img: "godfather.jpg" };
	var theHobbit = { title: "The Hobbit", starring: "Martin Freeman", img: "hobbit.jpg" };
	var theIllusionist = { title: "The Illusionist", starring: "Edward Norton", img: "illusionist.jpg" };
	var tron = { title: "Tron", starring: "Jeff Bridges", img: "tron.jpg" };
	var vForVendetta = { title: "V for Vendetta", starring: "Natalie Portmon", img: "vendetta.jpg" };

	var movies = [batmanBegins,chamber,inception,lionKing,lionofdesert,lotr,malcolmX,matrix,shawshank,theAvengers,theHobbit,theIllusionist,theGodfather,tron,vForVendetta];

	var question1 = { answer: matrix, review: "It depicts a dystopian future in which reality as perceived by most humans is actually a simulated reality, created by sentient machines to subdue the human population, while their bodies heat and electrical activity are used as an energy source. Computer programmer Neo learns this truth and is drawn into a rebellion against the machines, which involves other people who have been freed from the dream world."};
	var question2 = { answer: inception, review: "A thief who commits corporate espionage by infiltrating the subconscious of his targets. He is offered a chance to regain his old life as payment for a task considered to be impossible: the implantation of another persons idea into a targets subconscious."};
	var question3 = { answer: theIllusionist, review: "The film tells the story of Eisenheim, a magician in fin de siècle Vienna, who uses his abilities to secure the love of a woman far above his social standing"};
	var question4 = { answer: malcolmX, review: "The biopic of the controversial and influential Black leader."};
	var question5 = { answer: lionOfTheDesert, review: "Between two worlds wars, a struggle for freedom took place in the African desert. This movie is the historicaly accurate story about the Libyan resistance leader, Omar Mukhtar, who led the Libyan resistance against the Italian opressors from 1911-1931. The movie takes place during the reign of Mussolini."};

	var quesions = [question1,question2,question3,question4,question5];

/* what's going on here */

	var index = 0;
	var curr_question = questions[this.index];
	var curr_movie = null;

	var correct = 0;

/* what's going on here */

	/* private methods */

	var fill_movie_choices = function(){

		var $choices = $('#choices');

		for (var i = 0; i < movies.length; i++) {
			var movie = movies[i];
			var html = '<label><input type="radio" name="movies"><img src="img/' + movie.img + '""></label>';
			$choices.append(html);
		}
	};

	/* public methods */

	this.init = function(){
		fill_movie_choices();
		this.start_quiz();
	}

	this.start_quiz = function(){
		index = 0;
		correct = 0;
		this.next_question();

		$btnNext.html("Next Question");
	};

	var $question_count = $('#question-count');

	this.render_question = function (num) {
		curr_question = questions[num];

		$movieCoverImg.attr('src','img/movie.png');
		$movieCoverMessage.html('Select Movie');
		$movieTitle.html('<span class="highlight">Title</span>');
		$movieStarring.html('<span class="highlight">Starring</span>');
		$movieReview.html(curr_question.review);

		// show right buttons
		$btnNext.hide();
		$btnAgain.hide();
		$btnSubmit.show();

		// uncheck last selection
		$('input[type="radio"]:checked').prop('checked', false);

		// update count
		$question_count.html( (num + 1) + ' / ' + questions.length);

		//clear any message
		this.clear_message();
	};

	this.next_question = function(){
		curr_movie = null;
		this.render_question(index);

		index++;

		if ( this.last_question() ) {
			$btnNext.html("See My Score");
		}
	};

	this.last_question = function () {
		return ( index === questions.length );
	};

	this.select_movie = function(num){
		curr_movie = movies[num];

		$movieCoverImg.attr('src', 'img/' + curr_movie.img);
		$('p', $movieCover).html('');
		$movieTitle.html(curr_movie.title);
		$movieStarring.html(curr_movie.starring);
	};

	this.test_answer = function(){
		if( curr_movie === curr_question.answer ){
			this.show_message("Correct!", "success checkmark");
			$btnAgain.hide();
			correct++;
		} else {
			this.show_message("Nope, that's not the right movie", "warning xmark");
			$movieCover.effect( "shake" );
			$btnAgain.show();
		}

		$btnSubmit.hide();
		$btnNext.show();
	};

	this.answered_correctly = function(){
		return $btnAgain.is(':hidden') && $btnSubmit.is(':hidden');
	}

	this.selected_a_movie = function(){
		return curr_movie != null;
	};

	this.show_message = function(text, text_class){
		$message.html("<p class='" + text_class + "''>" + text + "</p>")
	};

	this.clear_message = function(){
		$('p', $results).html("You matched " + correct + " of " + questions.length + " movies correctly");

	}

	this.init();

}

/* private vars */

$(document).ready(function() {

	var quiz = new MovieQuiz();

	$movieSelector.click(function(){
		$(this).fadeOut('fast');
		quiz.clear_message();
	})

	$movieCover.add($movieStarring).add($movieTitle).click(function(){
		if ( ! quiz.answered_correctly() ) {
			$movieSelector.fadeIn('fast');
		}
	});

	$('input[type=radio]').click(function(){
		var selection = $('input[type=radio]').index(this);
		quiz.select_movie(selection);
	});

	$btnSubmit.add($btnAgain.click(function(){
		if ( quiz.selected_a_movie() ){
			quiz.test_answer();
		} else {
			quiz.show_message('Please select a movie for this review', 'warning');
		}
	});

	$btnNext.click(function() {
		if ( quiz.last_question() ) {
			quiz.show_results();
			$results.fadeIn('fast');
		} else {
			quiz.next_question();
		}
	});

	$btnRestart.click(function(){
		$results.fadeOut('fast');
		quiz.start_quiz();
	});

});

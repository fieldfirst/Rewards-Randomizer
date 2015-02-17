var numberOfGifts;
var selectedGifts = [];
var persons;
var gifts;
var counter;

function getRandomInt() {
	var randInt = Math.floor(Math.random() * (numberOfGifts - 0)) + 0;
	if (selectedGifts.indexOf(randInt) === -1) {
		selectedGifts[counter] = randInt;
		return randInt;
	}
	else
	{
		return getRandomInt();
	}
}

function calculateRowSize() {
	$('.row_wrapper').height($(window).height() - 110);
}

function init() {
	
	/* jshint multistr: true */
	var htmlA = '<div class=\"col-md-offset-2 col-lg-offset-2 col-md-2 col-lg-2\">\
						<div class=\"card\">\
							<div class=\"back\">\
								<img src=\""/>\
								<h4 class=\"bs-callout-blue\">John Abracle</h2>\
							</div>\
							<div class=\"front\">\
								<img src=\"./resources/img/placeholder.png\"/>\
							</div>\
						</div>\
					</div>';
	var htmlB = '<div class=\"col-md-offset-1 col-lg-offset-1 col-md-2 col-lg-2\">\
						<div class=\"card\">\
							<div class=\"back\">\
								<img src=\""/>\
								<h4 class=\"bs-callout-blue\">John Abracle</h2>\
							</div>\
							<div class=\"front\">\
								<img src=\"./resources/img/placeholder.png\"/>\
							</div>\
						</div>\
					</div>';
	var htmlC = '<div class=\"col-md-offset-1 col-lg-offset-1 col-md-2 col-lg-2\">\
						<div class=\"card\">\
							<div class=\"back\">\
								<img src=\""/>\
								<h4 class=\"bs-callout-blue\">John Abracle</h2>\
							</div>\
							<div class=\"front\">\
								<img src=\"./resources/img/placeholder.png\"/>\
							</div>\
						</div>\
					</div>';
	var row = '<div class=\"row\"></div>';
	
	persons = jQuery.parseJSON(sessionStorage.getItem('persons'));
	$.getJSON('./config.json.html', function(data){
		numberOfGifts = data.number_of_gifts;
		gifts = data.gifts;
		var row_wrapper = $('.row_wrapper');
		for (counter = 1; counter <= persons.length; counter++) {
			var randInt = getRandomInt();
			if (counter % 3 === 1) {
				row_wrapper.children('.row:last-child').append(htmlA);
				$('.row_wrapper .row .card:last img:first').prop('src', gifts[randInt].url);
				$('.row_wrapper .row .card:last').prop('id', randInt);
			}
			else if (counter % 3 === 2) {
				row_wrapper.children('.row:last-child').append(htmlB);
				$('.row_wrapper .row .card:last img:first').prop('src', gifts[randInt].url);
				$('.row_wrapper .row .card:last').prop('id', randInt);
			}
			else {
				row_wrapper.children('.row:last-child').append(htmlC);
				$('.row_wrapper .row .card:last img:first').prop('src', gifts[randInt].url);
				$('.row_wrapper .row .card:last').prop('id', randInt);
				row_wrapper.append(row);
			}
		}
	})
	.done(function(){
		counter = 0;
		$('#player_name').text(persons[counter].name);
		$('.card').click(function(){
			if (counter >= persons.length-1) {
				$('#redirect_info').css('display','block');
				
				setTimeout(function(){
					sessionStorage.setItem('persons', JSON.stringify(persons));
					window.location = './summary.html';
				}, 4000);
			}
			persons[counter].gift = parseInt($(this).prop('id'));
			$(this).find('.back h4').text(persons[counter].name).addClass(persons[counter].color);
			if (! $(this).hasClass('flipped')) {
				$(this).addClass('flipped');
			}
			$(this).off('click');
			counter++;
			$('#player_name').text(persons[counter].name);
		});
		$('.loader').fadeOut(1600);
	});
}

$(function(){
	init();
	calculateRowSize();
	$(window).resize(function(){
		calculateRowSize();
	});
});
var persons = [];
var counter = 1;
var maxPersons;

var person = function(name, color){
	this.name = name;
	this.color = color;
	this.gift = 0;
};

var colors = ['bs-callout-blue', 'bs-callout-cyan', 'bs-callout-green', 'bs-callout-orange', 'bs-callout-brown', 'bs-callout-grey', 'bs-callout-purple', 'bs-callout-red', 'bs-callout-pink'];

function init() {

	var pageHeight = $(window).height() - 50;
	$('#main').height(pageHeight);
	$('#sidebar').height(pageHeight);
	$('#person-holder').height($('person-holder').height - 136);
	
	$.getJSON('./config.json.html', function(data){
		maxPersons = data.number_of_gifts;
	});
	
	persons[0] = {'name': 'Dj Suharit', 'color': 'bs-callout-blue', 'gift': 0};
	
	$('.loader').fadeOut(1600);
}

function checkDuplicateName(name) {
	return (name in persons);
}

function getRandomInt() {
	return Math.floor(Math.random() * (9 - 0)) + 0;
}

function addName(name) {
	counter++;
	/* jshint multistr: true */
	var html = '<div style=\"display: none;\">\
					<table>\
						<tr>\
							<td>\
								<img src=\"./resources/img/user168.png\"/>\
							</td>\
							<td class=\"name\">\
								<h4></h4>\
								<p>is going</p>\
							</td>\
						</tr>\
					</table>\
				</div>';
				
	$('#person-holder').append(html);
	var selectedColor = colors[getRandomInt()];
	$('#person-holder h4:last').text(name);
	$('#person-holder div:last').addClass(selectedColor).addClass('element').fadeIn('slow');
	$('#person-holder').animate({scrollTop: $('#person-holder').prop("scrollHeight")}, 500);
	persons.push(new person(name, selectedColor));
}

$(function(){
	init();
	$(window).resize(function(){
		var pageHeight = $(window).height() - 50;
		$('#main').height(pageHeight);
		$('#sidebar').height(pageHeight);
		$('#person-holder').height($('person-holder').height - 136);
	});
	
	$('#btnSignup').click(function(){
		var name = $('#txtSignup').val();
		if (!checkDuplicateName(name) && name !== '' && counter < maxPersons) {
			addName(name);
		}
		else if (name === '') {
			$('#duplicate-name-warning').text('You must enter a name').show('fast').fadeOut(2000).css('display : none');
		}
		else if (counter >= maxPersons) {
			$('#duplicate-name-warning').text('We only have ' + maxPersons +  ' gifts').show('fast').fadeOut(2000).css('display : none');
		}
		else {
			$('#duplicate-name-warning').text('You are already signed up').show('fast').fadeOut(2000).css('display : none');
		}
		$('#txtSignup').val('');
	});
	
	$('#txtSignup').keydown(function(event){
    	var keyCode = (event.keyCode ? event.keyCode : event.which);   
		if (keyCode === 13) {
       		$('#btnSignup').trigger('click');
    	}
	});
	
	$('#btnLetStart').click(function(){
		if (counter >= 5) {
			sessionStorage.setItem('persons', JSON.stringify(persons));
			window.location = './rewards.html';
		}
		else {
			$('#duplicate-name-warning').text('You need at least 5 persons').show('fast').fadeOut(2000).css('display : none');
		}
	});
	
});
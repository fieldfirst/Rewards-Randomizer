var persons;
var gifts;

$(function(){
	persons = jQuery.parseJSON(sessionStorage.getItem('persons'));
	$.getJSON('./config.json.html', function(data){
		gifts = data.gifts;
		
		/* jshint multistr: true */
		var badge = '<div class=\"row\">\
					<div class=\"col-md-offset-2 col-lg-offset-2 col-md-8 col-lg-8\">\
						<div class=\"name_box\">\
							<table>\
								<tr>\
									<td>\
										<img id=\"gift_image\" src=\"./resources/img/pierre-cardin.jpg\"/>\
									</td>\
									<td class=\"name\">\
										<h3 id=\"person_name\">Dj Suharit</h3>\
										<p id=\"gift_name\">name</p>\
										<p id=\"gift_price\">price</p>\
										<p id=\"gift_description\">description</p>\
									</td>\
								<tr>\
							</table>\
						</div>\
					</div>\
				</div>';
		
		var count;
		var mc = $('#main_content');
		for (count = 0; count < persons.length; count++) {
			mc.append(badge);
			mc.find('.row:last #gift_image').prop('src', gifts[persons[count].gift].url);
			mc.find('.row:last #person_name').text(persons[count].name);
			mc.find('.row:last #gift_name').text(gifts[persons[count].gift].name);
			mc.find('.row:last #gift_price').text(gifts[persons[count].gift].price);
			mc.find('.row:last #gift_description').text(gifts[persons[count].gift].description);
		}
	})
	.done(function(){
		$('#main_content').height($(window).height() - 110);
		$(window).resize(function(){
			$('#main_content').height($(window).height() - 110);
		});
		$('.loader').fadeOut(1600);
	});

});
var persons,gifts;$(function(){persons=jQuery.parseJSON(sessionStorage.getItem("persons")),$.getJSON("./config.json.html",function(i){gifts=i.gifts;var t='<div class="row">					<div class="col-md-offset-2 col-lg-offset-2 col-md-8 col-lg-8">						<div class="name_box">							<table>								<tr>									<td>										<img id="gift_image" src="./resources/img/pierre-cardin.jpg"/>									</td>									<td class="name">										<h3 id="person_name">Dj Suharit</h3>										<p id="gift_name">name</p>										<p id="gift_price">price</p>										<p id="gift_description">description</p>									</td>								<tr>							</table>						</div>					</div>				</div>',e,n=$("#main_content");for(e=0;e<persons.length;e++)n.append(t),n.find(".row:last #gift_image").prop("src",gifts[persons[e].gift].url),n.find(".row:last #person_name").text(persons[e].name),n.find(".row:last #gift_name").text(gifts[persons[e].gift].name),n.find(".row:last #gift_price").text(gifts[persons[e].gift].price),n.find(".row:last #gift_description").text(gifts[persons[e].gift].description)}).done(function(){$("#main_content").height($(window).height()-110),$(window).resize(function(){$("#main_content").height($(window).height()-110)}),$(".loader").fadeOut(1600)})});
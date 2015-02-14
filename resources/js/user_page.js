function init() {
	var pageHeight = $(window).height() - 50;
	$('#main').height(pageHeight);
	$('#sidebar').height(pageHeight);
}

$(function(){
	init();
	$(window).resize(function(){
		var pageHeight = $(window).height() - 50;
		$('#main').height(pageHeight);
		$('#sidebar').height(pageHeight);
	});
});
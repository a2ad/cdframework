$(window).load(function(){

	//THUMBS
	var larguraContainer = parseInt($('.container').width());	
	var larguraThumb = $('.album').innerWidth();
	var totalThumbs = parseInt(larguraContainer / larguraThumb);
	var larguraTotalThumbs = larguraThumb * totalThumbs;
	var sobra = larguraContainer - larguraTotalThumbs;
	var margin = parseInt(sobra / totalThumbs);
	var marginLeft = parseInt(margin / 2) + 'px';
	var marginRight = parseInt(margin / 2) + 'px';

	//console.log(larguraContainer +' - '+ larguraThumb +' = '+ totalThumbs +' - '+ larguraTotalThumbs +' - '+ sobra  +' - '+ margin +' - '+ marginLeft);

	$('.album').each(function(){
		$(this).animate({ 'opacity': '1'});
		$(this).css({
			'margin-left': marginLeft,
			'margin-right': marginRight,
			'margin-bottom': '35px'
		});
	});

});

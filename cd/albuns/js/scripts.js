$(function(){


	//THUMBS
	var larguraContainer = parseInt($('.container').width());	
	var larguraThumb = $('.album').innerWidth();
	var totalThumbs = parseInt(larguraContainer / larguraThumb);
	var larguraTotalThumbs = larguraThumb * totalThumbs;
	var sobra = larguraContainer - larguraTotalThumbs;
	var margin = sobra / totalThumbs;
	var marginLeft = margin / 2 + 'px';
	var marginRight = margin / 2 + 'px';

	//console.log(larguraContainer +' - '+ larguraThumb +' = '+ totalThumbs +' - '+ larguraTotalThumbs +' - '+ sobra  +' - '+ margin +' - '+ marginLeft);

	$('.album').each(function(){
		$(this).css({
			'margin-left': marginLeft,
			'margin-right': marginRight,
			'margin-bottom': '35px'
		});
	});

});

$(function(){

	//GERAL
	var janela = $(window);
	var larguraDisponivel = $(janela).innerWidth();
	var alturaDisponivel = $(janela).innerHeight();

	$('.html5lightbox').each(function(){
		$(this).attr({
			'data-width': larguraDisponivel -200,
			'data-height': alturaDisponivel -200,
		});
		
	});

});

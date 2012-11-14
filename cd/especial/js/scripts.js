$(function(){

	//ATIVANDO MENU CONFORME PASSO ATIVO
	$(window).scroll(function () {
		var inview = $(".history > li:in-viewport:first").attr('id');
		var link = $('nav a.link-'+inview);

		if (link.length && !link.is('.active')) {
			$('nav a').removeClass('active');
			link.addClass('active');
			$('.history > li').removeClass('step-active');
			$('.history > li#'+inview).addClass('step-active');
		}
	});

	//SETA BAIXO
	function proximoPasso() {
		var ativo = $('.history > li.step-active');
		var passo = $('.history > li.step-active').next('li').attr('id');
		exibirSupersized(passo);
		$('html, body').animate({
			scrollTop: $(ativo).next('li').offset().top
		}, 1000);
	}

	function passoAnterior() {
		var ativo = $('.history > li.step-active');
		var passo = $('.history > li.step-active').prev('li').attr('id');
		exibirSupersized(passo);
		$('html, body').animate({
			scrollTop: $(ativo).prev('li').offset().top
		}, 1000);
	}
	$(document).keydown(function (e) {
		if(!e) {
			e = window.event;
		}
		switch(e.keyCode) {
			case 38:
			e.preventDefault();
			passoAnterior();
	        break;
	        case 40:
	        e.preventDefault();
	        proximoPasso();
	        break;
	    }
	});

	//BLOQUEANDO SCROLL
	$('body').css('overflow', 'hidden');
	$('#introducao').bind('mousewheel DOMMouseScroll', function() {return false});

	$('.loading').bind('mousewheel DOMMouseScroll', function() {
		return false
	});

	//ROLAR A PAGINA
	$('.start').click(function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("#content1").offset().top
		}, 1000);

		// HABILITAR / DESABILITAR SUPERSIZED
		exibirSupersized('start');
	});

	//MENU
	var itemMenu = $('.main-menu a');
	itemMenu.click(function(event){
		event.preventDefault();
		itemMenu.removeClass('active');
		$(this).addClass('active');
		var passo = $(this).attr('href').split('#')[1];
		$('html, body').animate({
			scrollTop: $('#'+passo).offset().top
		}, 1000);

		// HABILITAR / DESABILITAR SUPERSIZED
		exibirSupersized(passo);
	});


	function exibirSupersized(passo){
		console.log(passo);
		if( passo == 'start' ){
			var supersized = $("#content1").children().attr('class');
			if ( supersized == 'slide-supersized'){
				$('.slide-supersized').css({ 'visibility': 'visible' });
			}else{
				$('.slide-supersized').css({ 'visibility': 'hidden' });			
			}
		}else{
			var supersized = $("#"+passo).children().attr('class');
			if ( supersized == 'slide-supersized'){
				$('.slide-supersized').css({ 'visibility': 'visible' });
			}else{
				$('.slide-supersized').css({ 'visibility': 'hidden' });			
			}
		}
	}

	});

$(window).load(function() {

	function carregaPagina() {
		$('.loading-page').fadeOut('slow', function() {
			$(this).remove();
		});

		
		//GERAL
		var janela = $(window);
		var alturaDisponivel = $(janela).height();
		var larguraDisponivel = $(janela).innerWidth();
		var alturaDisponivel = $(janela).height();

		function alturaPasso (valorAlturaPasso) {
		    $('.history > li').height(valorAlturaPasso + 50);
		}

		alturaPasso(alturaDisponivel);


			// ANIMACOES
			/* ***********************************************************************************/

			(new TimelineLite({onComplete:initScrollAnimations}))
			.from( $('.project span'), 1, {delay: 0, css:{bottom:'-300px'}, ease:Back.easeOut})
			.from( $('.main-menu'), 0.5, {delay: 0, css:{opacity:0}, ease:Back.easeOut, onComplete: function(){
				/*$('body').css('overflow', 'visible');*/
				$('#introducao').unbind('mousewheel DOMMouseScroll');
			}});

			var controller = $.superscrollorama();

			function initScrollAnimations () {
				var controller = $.superscrollorama();

				//A2
				controller.addTween('#a2logo',
					TweenMax.from( $('#a2logo'), 1, {
						delay: 0,
						css:{
							top: '-100%',
							opacity: 0
						}
					}),
					0,
					-100
					);

				controller.addTween('#a2logo_baixo',
					TweenMax.from( $('#a2logo_baixo'), 1, {
						delay: 0.5,
						css:{
							opacity: 0
						}
					}),
					0,
					-150
					);

				controller.addTween('.url',
					TweenMax.from( $('.url'), 1, {
						delay: 0.5,
						css:{
							opacity: 0
						}
					}),
					0,
					-150
					);

				controller.addTween('address',
					TweenMax.from( $('address'), 1, {
						delay: 1,
						css:{
							opacity: 0
						}
					}),
					0,
					-100
					);

				/**/	
			}

			//initScrollAnimations();
	}

	if ($.browser.msie) {
			
	    if(parseInt($.browser.version) == 8){
	    } else if (parseInt($.browser.version) == 7){
	    } else {
	    	setTimeout(function(){
	      		carregaPagina();
			},2000);

	    }
	} else {
		
		setTimeout(function(){
      		carregaPagina();
		},2000);
	}
});

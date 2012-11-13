//VIDEOS
	_V_.options.flash.swf = "./js/video/video-js.swf";
	var myPlayer = _V_("#video-player");

	function chamaVideo(nomeVideo, tituloVideo) {
	 	//calculando distancia
	 	var topo = $(window).scrollTop();

	 	// mostrando player / titulo video
	 	$('.hold-player').css('top', topo );
	 	$('.hold-player').fadeIn();
	 	$('.main-menu').fadeOut();

	 	//aplicando titulo do video
	 	$('.hold-player .title-video').text(tituloVideo);

	 	//aplicando video
	 	myPlayer.src({ type: "video/mp4", src: "conteudo/videos/"+nomeVideo+".mp4" });
	 	// if ($.browser.msie) {
	 	// 	myPlayer.src({ type: "video/mp4", src: "conteudo/videos/"+nomeVideo+".mp4" });
	 	// } else {
	 	// 	myPlayer.src({ type: "video/webm", src: "conteudo/videos/"+nomeVideo+".webm" });
	 	// }

	 	$('#video-player').fadeIn();

	 	var myFunc = function(){
	 		$('#video-player').removeClass('disabled');
	 	};
	 	myPlayer.addEvent("play", myFunc);

	 }

	 function quebraVideo() {
	 	$('.hold-player').fadeOut();
	 	myPlayer.pause();
	 	//restaurando padrão Vídeo
	 	$('#video-player').addClass('disabled').fadeOut('slow', function() {
	 		$('.vjs-poster, .vjs-big-play-button').show();			
	 	});
	 	$('.main-menu').fadeIn();

	 }

	 var itemVideo = $('.thumb-video');
	 itemVideo.click(function(event){
	 	if( $('body').hasClass('on-video') ) {
	 	} else {
	 		var titulo = $(this).attr('data-title');
	 		var caminho = $(this).attr('data-video');
	 		chamaVideo(caminho, titulo);

	 		//centralinzando player
	 		var alturaHold = $('.row-player').height();
	 		$('.row-player').css('margin-top', - (alturaHold / 2));

	 	}
	 	event.preventDefault();
	 });

	 $('.close-video').click(function() {
	 	quebraVideo();
	 });

	 $('.hold-player').bind('mousewheel DOMMouseScroll', function() {
	 	return false
	 });
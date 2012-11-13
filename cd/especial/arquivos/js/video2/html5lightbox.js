/**
    HTML5 Image and Video LightBox
    Description: A jQuery image and video lightbox plugin - adds awesome HTML5 and jQuery LightBox effect to your web site, 
                 supports images, Flash SWF files, YouTube, Vimeo and local videos, 
                 works on Windows, Linux, Mac, iPhone, iPad, Android, Windows Phone and all modern web browsers.
    
    Website: http://html5box.com/
    Version: 1.3
    Author: HTML5Box.com
    
    ------------------- Features -------------------------
    
    1. Support images, Flash, YouTube, Vimeo and local Videos
    2. Support mp4, m4v, flv, ogg, ogv and webm video formats
    3. Works on Windows, Linux, Mac, iPhone, iPad, Android, Windows Phone and all modern web browsers
    4. Switch to HTML5 video player on mobile/tablet
    5. Automatically load jQuery from Google cloud if jQuery is not included in the web page
    6. Easy installation and configuration
    
    ------------- Installation Quide ---------------------
    
    http://html5box.com/html5lightbox/index.php#quickinstallation
    
    --------------- Version History -----------------------
    Version 1.4:
    	1. Fix the bug under IE7 and IE8
    	2. Read configuration from web page and easy branding
    	
    Version 1.3:
    	1. Fix the bug: navigation buttons display below the YouTube player
    	2. Fix the bug under IE8
    	
    Version 1.2:
        1. Change license to GPL2
        2. Move the navigation buttons to left and right side of the pop-up box
        
    ------------------- License ---------------------------
    
    Copyright 2012 HTML5Box.com

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
    
*/


/**
 * Check jQuery, if not loaded, automatically load from google cloud or from local if loading from cloud failed in 5 seconds
 */
(function() {
	
	var scripts = document.getElementsByTagName("script");
	var jsSrc = scripts[scripts.length-1].src;
	var jsFolder = jsSrc.substr(0, jsSrc.lastIndexOf("/") + 1);
	
	if ((typeof jQuery == 'undefined') || (parseFloat(/^\d\.\d+/i.exec(jQuery.fn.jquery)) < 1.6)) {
	
		var timeOut = 0;		
		var src = jsFolder + "jquery.js";
		var uri = ('https:' == document.location.protocol ? 'https' : 'http') + "://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
	    
		var head = document.getElementsByTagName("head")[0];
	    var script = document.createElement('script');
	    script.setAttribute('type', 'text/javascript');
	    script.setAttribute('src', uri);
	    head.appendChild(script);
	    
	    function checkJQuery() {
	    	
	    	if ((typeof jQuery == 'undefined') || (parseFloat(/^\d\.\d+/i.exec(jQuery.fn.jquery)) < 1.6))
	    	{
	     		if (timeOut >= 5000)
	    		{
	    			timeOut = 0;
	    			var scriptSrc = document.createElement('script');
	    			scriptSrc.setAttribute('type', 'text/javascript');
	    			scriptSrc.setAttribute('src', src);
	    		    script.parentNode.replaceChild(scriptSrc, script);
	    		}
	    		timeOut += 100;
	    		setTimeout(checkJQuery, 100);
	    	}
	    	else
	    	{
	    		loadHtml5LightBox(jsFolder);
	    	}
	    }
	    
	    checkJQuery();
	}
	else
	{
		loadHtml5LightBox(jsFolder);
	}
	
})();

/**
 * Call back of check jQuery
 * @param jsFolder
 */
function loadHtml5LightBox(jsFolder) {
	
	/**
	 * jQuery plugin
	 */
	(function($) {
	
		$.fn.html5lightbox = function(options) {
			
			options = jQuery.extend({
				
				// look
				overlaybgcolor: 		"#000000",
				overlayopacity:			0.9,
				bgcolor:				"#ffffff",
				bordersize:				8,
				barheight:				36,
				
				// init
				loadingwidth:			64,
				loadingheight:			64,
				
				// speed
				resizespeed:			400,
				fadespeed:				400,
				
				// skins
				skinfolder:				"skins/default/",
				
				// title
				titlecss:				"{color:#333333; font-size:14px;}",
				
				// error
				errorwidth:				280,
				errorheight:			48,
				errorcss:			    "{text-align:center; color:#ff0000; font-size:14px; font-family:Arial, sans-serif;}",
				
				// free version
				version:				"1.4",
				stamp:					false,
				freemark:				"",
				freelink:				"",
				watermark:				"",
				watermarklink:			""
								
			}, options);
			
			if ( (typeof html5lightbox_options != 'undefined') && html5lightbox_options )
				jQuery.extend(options, html5lightbox_options);
			
			// folders
			options.htmlfolder = window.location.href.substr(0, window.location.href.lastIndexOf("/") + 1);
			options.jsfolder = jsFolder;
							
			if ((options.skinfolder.charAt(0) != "/") && (options.skinfolder.substring(0, 5) != "http:") && (options.skinfolder.substring(0, 6) != "https:"))
				options.skinfolder = jsFolder + options.skinfolder;
			
			options.htmlfolder = encodeURI(options.htmlfolder);
			options.jsfolder = encodeURI(options.jsfolder);
			options.skinfolder = encodeURI(options.skinfolder);

			// types
			options.types = ["IMAGE", "FLASH", "VIDEO", "YOUTUBE", "VIMEO", "PDF", "MP3", "WEB"];
			
			// run time			
			
			// Array(type, href, title, group, width, height)
			options.elemArray = [];					
			options.curElem = -1;					
				
			// environment
			options.flashInstalled = false;
			try 
			{
				if (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) 
					options.flashInstalled = true;
			}
			catch(e) 
			{
				if (navigator.mimeTypes["application/x-shockwave-flash"]) 
					options.flashInstalled = true;
			}
			options.html5VideoSupported = (!!document.createElement('video').canPlayType);
			options.isChrome = (navigator.userAgent.match(/Chrome/i) != null);
			options.isFirefox = (navigator.userAgent.match(/Firefox/i) != null);
			options.isOpera = (navigator.userAgent.match(/Opera/i) != null);
			options.isSafari = (navigator.userAgent.match(/Safari/i) != null);
			options.isIE9 = $.browser.msie && options.html5VideoSupported;
			options.isIE678 = $.browser.msie && !options.isIE9;	
			options.isAndroid = (navigator.userAgent.match(/Android/i) != null);
			options.isIPad = (navigator.userAgent.match(/iPad/i) != null);
			options.isIPhone = ((navigator.userAgent.match(/iPod/i) != null) || (navigator.userAgent.match(/iPhone/i) != null));
			options.isMobile = (options.isAndroid || options.isIPad || options.isIPhone);
						
			options.resizeTimeout = -1;
			
			var inst = this;
			
			/**
			* Init plugin
			*/
			function init() 
			{
				readData();
				createMarkup();
			}
			
			/**
			* Read list from HTML codes
			*/
			function readData()
			{
				inst.each( function() {
					
					if (this.nodeName.toLowerCase() != 'a')
						return;
					
					var $this = $(this);
					
					var fileType = checkType($this.attr('href'));
					if (fileType < 0)
						return;
										
					options.elemArray.push(new Array(fileType, $this.attr('href'), $this.attr('title'), $this.data('group'), $this.data('width'), $this.data('height')));
				});
				
				
			}
			
			/**
			* Create HTML markup of Lightbox
			*/
			function createMarkup()
			{
				// google font
				var fontRef = ('https:' == document.location.protocol ? 'https' : 'http') + "://fonts.googleapis.com/css?family=Armata";
				var fontLink = document.createElement("link");
				fontLink.setAttribute("rel", "stylesheet");
				fontLink.setAttribute("type", "text/css");
				fontLink.setAttribute("href", fontRef);
				document.getElementsByTagName("head")[0].appendChild(fontLink);
				
				// css
				var styleCss = "#html5-text " + options.titlecss;
				styleCss += ".html5-error " + options.errorcss;
				$("head").append("<style type='text/css'>" + styleCss + "</style>");
				
				inst.$lightbox = jQuery("<div id='html5-lightbox' style='display:none;position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:999;'>" +
						"<div id='html5-lightbox-overlay' style='display:block;position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:" + options.overlaybgcolor + ";opacity:" + options.overlayopacity + ";filter:alpha(opacity=" + Math.round(options.overlayopacity * 100) + ");'></div>" +
						"<div id='html5-lightbox-box' style='display:block;position:relative;margin:0px auto;'>" +							
							"<div id='html5-elem-box' style='display:block;position:relative;margin:0px auto;text-align:center;'>" +
								"<div id='html5-close' style='cursor:pointer;'><img src='" + options.skinfolder + "close.png'></div>" +
								"<div id='html5-elem-wrap' style='display:block;position:relative;margin:0px auto;text-align:center;background-color:" + options.bgcolor + ";'>" + 
									"<div id='html5-loading' style='display:none;position:absolute;text-align:center;width:100%;height:100%;background:url(\"" + options.skinfolder + "loading.gif\") no-repeat center center;'></div>" +
									"<div id='html5-error' class='html5-error' style='display:none;position:absolute;padding:" + options.bordersize + "px;text-align:center;width:" + options.errorwidth + "px;height:" + options.errorheight + "px;'>" + "The requested content cannot be loaded.<br />Please try again later." + "</div>" +
									"<div id='html5-image' style='display:none;position:absolute;padding:" + options.bordersize + "px;text-align:center;'></div>" +
								"</div>" + 
								"<div id='html5-next' style='display:none;cursor:pointer;position:absolute;right:" + options.bordersize + "px;top:40%;'><img src='" + options.skinfolder + "next.png'></div>" +
								"<div id='html5-prev' style='display:none;cursor:pointer;position:absolute;left:" + options.bordersize + "px;top:40%;'><img src='" + options.skinfolder + "prev.png'></div>" +							
							"</div>" +
							"<div id='html5-elem-data-box' style='display:none;position:relative;width:100%;margin:0px auto;height:" + options.barheight + "px;background-color:" + options.bgcolor + ";'>" +
								"<div id='html5-text' style='display:block;'></div>" +								
							"</div>" +
							"<div id='html5-watermark' style='display:none;position:absolute;left:" + String(options.bordersize + 2) + "px;top:" + String(options.bordersize + 2) + "px;'></div>" + 
						"</div>" +
					"</div>");
				
				inst.$lightbox.appendTo("body");
				
				inst.$lightboxBox = $("#html5-lightbox-box", inst.$lightbox);
				inst.$elem = $("#html5-elem-box", inst.$lightbox);
				inst.$elemWrap = $("#html5-elem-wrap", inst.$lightbox);
				inst.$loading = $("#html5-loading", inst.$lightbox);
				inst.$error = $("#html5-error", inst.$lightbox);
				inst.$image = $("#html5-image", inst.$lightbox);
				inst.$elemData = $("#html5-elem-data-box", inst.$lightbox);				
				inst.$text = $("#html5-text", inst.$lightbox);
				inst.$next = $("#html5-next", inst.$lightbox);
				inst.$prev = $("#html5-prev", inst.$lightbox);
				inst.$close = $("#html5-close", inst.$lightbox);
				
				inst.$watermark = $("#html5-watermark", inst.$lightbox);
				if (options.stamp)
				{
					inst.$watermark.html("<a href='" + options.freelink + "' style='text-decoration:none;'><div style='display:block;width:120px;height:20px;text-align:center;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;filter:alpha(opacity=60);opacity:0.6;background-color:#333333;color:#ffffff;font:12px Armata,sans-serif,Arial;'><div style='line-height:20px;'>" + options.freemark + "</div></div></a>");
				}
				else if (options.watermark)
				{
					var html = "<img src='" + options.watermark + "' style='border:none;' />";
					if (options.watermarklink)
						html = "<a href='" + options.watermarklink + "' target='_blank'>" + html + "</a>";
					inst.$watermark.html(html);
				}
				
				$("#html5-lightbox-overlay", inst.$lightbox).click(finish);
				inst.$close.click(finish);
				inst.$next.click(function(){
						gotoSlide(-1);
					});
				inst.$prev.click(function(){
						gotoSlide(-2);
					});
				
				$(window).resize(function(){
					
					if (!options.isMobile)
					{
						clearTimeout(options.resizeTimeout);
						options.resizeTimeout = setTimeout(function(){ resizeWindow(); }, 500);
					}
				});
				
				$(window).scroll(function(){
					
						scrollBox();
				});
	
				$(window).bind('orientationchange', function(e){
					
					if (options.isMobile)
						resizeWindow();
				});
			}
			
			/**
			 * Calc next and previous tiem
			 */
			function calcNextPrevElem()
			{
				options.nextElem = -1;
				options.prevElem = -1;
				
				var j, curGroup = options.elemArray[options.curElem][3];
				if ((curGroup != undefined) && (curGroup != null))
				{	
					for (j= options.curElem + 1; j< options.elemArray.length; j++)
					{
						if ( options.elemArray[j][3] == curGroup )
						{
							options.nextElem = j;
							break;
						}
					}	
					if (options.nextElem < 0)
					{
						for (j= 0; j< options.curElem; j++)
						{
							if ( options.elemArray[j][3] == curGroup )
							{
								options.nextElem = j;
								break;
							}
						}
					}
					
					if (options.nextElem >= 0)
					{
						for (j= options.curElem -1; j>= 0; j--)
						{
							if ( options.elemArray[j][3] == curGroup )
							{
								options.prevElem = j;
								break;
							}
						}
						if (options.prevElem < 0)
						{
							for (j = options.elemArray.length -1; j> options.curElem; j--)
							{
								if ( options.elemArray[j][3] == curGroup )
								{
									options.prevElem = j;
									break;
								}
							}
						}
					}
				}
			}
			
			/**
			* Start image displaying
			*/
			function clickHandler()
			{
				if (options.elemArray.length <= 0)
					return true;
				
				var $this = $(this);
				
				// hide elements
				hideObjects();
				
				// get current elem
				for (var i= 0; i< options.elemArray.length; i++)
				{
					if ( options.elemArray[i][1] == $this.attr("href") )
						break;
				}
				if (i == options.elemArray.length)
					return true;
				
				options.curElem = i;
				options.nextElem = -1;
				options.prevElem = -1;
								
				// calc next and previous elem
				calcNextPrevElem();
				
				// hide navigation buttons
				inst.$next.hide();
				inst.$prev.hide();
				
				// show overlay
				reset();
				
				inst.$lightbox.show();
				inst.$lightbox.css("top", $(window).scrollTop());
				
				// load loading box
				var boxW = options.loadingwidth + 2* options.bordersize;
				var boxH = options.loadingheight + 2* options.bordersize;
				var boxT = Math.round($(window).height() /2 - (boxH + options.barheight)/2);
				inst.$lightboxBox.css({"margin-top": boxT, "width": boxW, "height": boxH});
				inst.$elemWrap.css({"width": boxW, "height": boxH});
				loadCurElem();
				
				// disable link
				return false;
			}
			
			/**
			* Load current elem: ["IMAGE", "FLASH", "VIDEO", "YOUTUBE", "VIMEO", "PDF", "MP3", "WEB"];
			*/
			function loadCurElem()
			{
				// unbind show navgiation buttons
				inst.$elem.unbind("mouseenter").unbind("mouseleave").unbind("mousemove");
				inst.$next.hide();
				inst.$prev.hide();
				
				// show loading
				inst.$loading.show();
				
				// load image and load SWF, video or PDF
				switch (options.elemArray[options.curElem][0])
				{
					case 0:
						var imgLoader = new Image();
						$(imgLoader).load(function() {
							showImage(imgLoader.width, imgLoader.height);
						});
						$(imgLoader).error(function() {
							showError();
						});
						imgLoader.src = options.elemArray[options.curElem][1];
						break;
						
					case 1:
						showSWF();
						break;
					
					case 2:
						showVideo();
						break;
					
					case 3:
					case 4:
						showYoutubeVimeo();
						break;
					
					case 5:
						showPDF();
						break;
					
					case 6:
						showMP3();
						break;
						
					case 7:
						showWeb();
						break;
						
				}
			}
			
			/**
			* Show error message of current element
			*/
			function showError()
			{
				inst.$loading.hide();
				
				resizeLightbox(options.errorwidth, options.errorheight, true, function(){
					
					inst.$error.show();
					inst.$elem.fadeIn(options.fadespeed, function(){					
						
						// show image data
						showData();
					});
				});
			}
			
			/**
			 * Calc width of title, leave space for play/pause and close buttons
			 */
			function calcTextWidth(objW)
			{
				var textW = objW - 36;
				if ((options.prevElem > 0) || (options.nextElem > 0))
					textW -= 36;
				return textW;
			}
			
			/**
			* Show image, callback of function loadElem
			*/
			function showImage(imgW, imgH)
			{
				var elemW, elemH;
				if (options.elemArray[options.curElem][4])
				{
					elemW = options.elemArray[options.curElem][4];
				}
				else
				{
					elemW = imgW;
					options.elemArray[options.curElem][4] = imgW;
				}
				
				if (options.elemArray[options.curElem][5])
				{
					elemH = options.elemArray[options.curElem][5];
				}
				else
				{
					elemH = imgH;
					options.elemArray[options.curElem][5] = imgH;
				}
				
				var sizeObj = calcElemSize({w: elemW, h: elemH});
				
				// resize container box
				resizeLightbox(sizeObj.w, sizeObj.h, true, function(){
					
					// show image	
					inst.$text.css({width: calcTextWidth(sizeObj.w)});
					inst.$text.html(options.elemArray[options.curElem][2]);
					
					inst.$image.show().css({width: sizeObj.w, height: sizeObj.h});
					inst.$image.html("<img src='" + options.elemArray[options.curElem][1] + "' width='" + sizeObj.w + "' height='" + sizeObj.h + "' />");
					inst.$elem.fadeIn(options.fadespeed, function(){
						
						// show image data
						showData();
					});
				});
			}
			
			/**
			* Show Flash SWF
			*/
			function showSWF()
			{
				var dataW = (options.elemArray[options.curElem][4]) ? options.elemArray[options.curElem][4] : 480;
				var dataH = (options.elemArray[options.curElem][5]) ? options.elemArray[options.curElem][5] : 270;
				
				var sizeObj = calcElemSize({w: dataW, h: dataH});
				dataW = sizeObj.w;
				dataH = sizeObj.h;
				
				resizeLightbox(dataW, dataH, true, function(){
					
					// show image		
					inst.$text.css({width: calcTextWidth(dataW)});
					inst.$text.html(options.elemArray[options.curElem][2]);
					inst.$image.html("<div id='html5lightbox-swf' style='display:block;width:" + dataW + "px;height:" + dataH + "px;'></div>").show();
					embedFlash($("#html5lightbox-swf"), dataW, dataH, options.elemArray[options.curElem][1], 'window', {width:dataW, height:dataH});

					inst.$elem.show();
					showData();		
				});

			}
			
			/**
			* Show video
			*/
			function showVideo()
			{
				var dataW = (options.elemArray[options.curElem][4]) ? options.elemArray[options.curElem][4] : 480;
				var dataH = (options.elemArray[options.curElem][5]) ? options.elemArray[options.curElem][5] : 270;
				var sizeObj = calcElemSize({w: dataW, h: dataH});
				dataW = sizeObj.w;
				dataH = sizeObj.h;

				$('.main-menu').fadeOut();
				
				resizeLightbox(dataW, dataH, true, function(){
					
					// show image	
					inst.$text.css({width: calcTextWidth(dataW)});
					inst.$text.html(options.elemArray[options.curElem][2]);
					inst.$image.html("<div id='html5lightbox-video' style='display:block;width:" + dataW + "px;height:" + dataH + "px;'></div>").show();
					
					var isHTML5 = options.isMobile;
					if (!options.isMobile)
					{
						if (!options.flashInstalled && options.html5VideoSupported)
						{
							if (options.isIE9 || options.isSafari || options.isChrome || options.Opera)
								isHTML5 = true;
						}
					}
					
					if (isHTML5)
					{
						embedHTML5Video($("#html5lightbox-video"), dataW, dataH, options.elemArray[options.curElem][1]);
					}
					else
					{
						var videoFile = options.elemArray[options.curElem][1];
						if ((videoFile.charAt(0) != "/") && (videoFile.substring(0, 5) != "http:") && (videoFile.substring(0, 6) != "https:"))
							videoFile = options.htmlfolder + videoFile;
						embedFlash($("#html5lightbox-video"), dataW, dataH, options.jsfolder + "html5boxplayer.swf", 'transparent', {width:dataW, height:dataH, videofile: videoFile, autoplay: "0", errorcss: ".html5box-error" + options.errorcss, id: 0});
					}
					
					inst.$elem.show();
					showData();
					setTimeout(function(){
			      		$('#html5-close').fadeIn();
					},1000);
									
				});
			}
			
			/**
			 * Show YouTube and Vimeo
			 */
			function showYoutubeVimeo()
			{
				
				var dataW = (options.elemArray[options.curElem][4]) ? options.elemArray[options.curElem][4] : 480;
				var dataH = (options.elemArray[options.curElem][5]) ? options.elemArray[options.curElem][5] : 270;
				var sizeObj = calcElemSize({w: dataW, h: dataH});
				dataW = sizeObj.w;
				dataH = sizeObj.h;
				
				resizeLightbox(dataW, dataH, true, function(){
					
					// show image	
					inst.$text.css({width: calcTextWidth(dataW)});
					inst.$text.html(options.elemArray[options.curElem][2]);
					inst.$image.html("<div id='html5lightbox-video' style='display:block;width:" + dataW + "px;height:" + dataH + "px;'></div>").show();
					
					var href = options.elemArray[options.curElem][1];
					if (options.elemArray[options.curElem][0] == 3)
					{
						if (href.indexOf('?') < 0)
							href += '?wmode=transparent';
						else
							href += '&wmode=transparent';
					}
					$("#html5lightbox-video").html("<iframe width='" + dataW + "' height='" + dataH + "' src='" + href + "' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>");

					inst.$elem.show();
					showData();		
				});	
			}
			
			/**
			* Show PDF
			*/
			function showPDF()
			{
			}
			
			/**
			* Show MP3
			*/
			function showMP3()
			{
			}
			
			/**
			 * Show Webpage
			 */
			function showWeb()
			{
				var dataW = (options.elemArray[options.curElem][4]) ? options.elemArray[options.curElem][4] : $(window).width();
				var dataH = (options.elemArray[options.curElem][5]) ? options.elemArray[options.curElem][5] : $(window).height();
				var sizeObj = calcElemSize({w: dataW, h: dataH});
				dataW = sizeObj.w;
				dataH = sizeObj.h;
				
				resizeLightbox(dataW, dataH, true, function(){
					
					// show image	
					inst.$text.css({width: calcTextWidth(dataW)});
					inst.$text.html(options.elemArray[options.curElem][2]);
					inst.$image.html("<div id='html5lightbox-web' style='display:block;width:" + dataW + "px;height:" + dataH + "px;'></div>").show();
					$("#html5lightbox-web").html("<iframe width='" + dataW + "' height='" + dataH + "' src='" + options.elemArray[options.curElem][1] + "' frameborder='0'></iframe>");

					inst.$elem.show();
					showData();		
				});

			}
			
			/**
			 * Scroll box
			 */
			function scrollBox()
			{
				inst.$lightbox.css("top", $(window).scrollTop());
			}
			
			/**
			 * Resize the lightbox window
			 */
			function resizeWindow()
			{
				var boxT = Math.round($(window).height() /2 - (inst.$lightboxBox.height() + options.barheight)/2);
				inst.$lightboxBox.animate({"margin-top": boxT}, options.resizespeed);
			}
			
			/**
			 * Calculate image or elem size according to the window size
			 */
			function calcElemSize(sizeObj)
			{	
				// resize according to window size
				var h0 = $(window).height() - options.barheight - 2 * options.bordersize;
				if (sizeObj.h > h0)
				{
					sizeObj.w = Math.round(sizeObj.w * h0 / sizeObj.h);
					sizeObj.h = h0;
				}
				
				var w0 = $(window).width() - 2 * options.bordersize;
				if (sizeObj.w > w0)
				{
					sizeObj.h = Math.round(sizeObj.h * w0 / sizeObj.w);
					sizeObj.w = w0;
				}
				
				return sizeObj;
			}
			
			/**
			 * Resize lightbox to show data
			 */
			function showData()
			{
				inst.$elemData.show();
				inst.$lightboxBox.animate({height: inst.$lightboxBox.height() + options.barheight}, {queue: true, duration: options.resizespeed});
			}
			
			/**
			 * Resize lightbox according to elem width and height
			 */
			function resizeLightbox(elemW, elemH, bAnimate, onFinish)
			{
				var speed = (bAnimate) ? options.resizespeed: 0;
				var boxW = elemW + 2* options.bordersize;
				var boxH = elemH + 2* options.bordersize;
				var boxT = Math.round($(window).height() /2 - (boxH + options.barheight)/2);
				
				if ((boxW == inst.$elemWrap.width()) && (boxH == inst.$elemWrap.height()))
					speed = 0;
				
				// hide loading before resize
				inst.$loading.hide();
				
				// hide watermark
				inst.$watermark.hide();
				
				inst.$lightboxBox.animate({"margin-top": boxT}, speed, function(){
					inst.$lightboxBox.css({"width": boxW, "height": boxH});
					inst.$elemWrap.animate({width: boxW}, speed)
						.animate({height: boxH}, speed, function() {
							
							// show loading
							inst.$loading.show();
							
							// show watermark
							inst.$watermark.show();
							
							// show navigation buttons on mouse move and enter
							inst.$elem.bind("mouseenter mousemove", function(){
								if ((options.prevElem >= 0) || (options.nextElem >= 0))
								{
									inst.$next.fadeIn();
									inst.$prev.fadeIn();
								}
							});
							
							inst.$elem.bind("mouseleave", function(){
								inst.$next.fadeOut();
								inst.$prev.fadeOut();
							});
							
							onFinish();
						});
				});
			}
			
			/**
			 * Reset lightbox
			 */
			function reset()
			{
				if (options.stamp)
					inst.$watermark.hide();
				
				inst.$image.empty();
				inst.$text.empty();
				
				inst.$error.hide();
				inst.$loading.hide();
				inst.$image.hide();
				
				inst.$elemData.hide();
				
			}
			/****************************************************************************
			* Helper functions
			*/
			
			/**
			* Close lightbox
			*/
			function finish()
			{
				reset();
				inst.$lightbox.hide();
				showObjects();
				$('.main-menu').fadeIn();
				$('#html5-close').hide();
			}
			
			/**
			* Pause auto slideshow
			*/
			function pauseSlide()
			{
			}
			
			/**
			* start auto slideshow
			*/
			function playSlide()
			{
			}
			
			/**
			 * goto prev or next slide
			 */
			function gotoSlide(slide)
			{
				if (slide == -1)
				{
					if (options.nextElem < 0)
						return;
					options.curElem = options.nextElem;
				}
				else if (slide == -2)
				{
					if (options.prevElem < 0)
						return;
					options.curElem = options.prevElem;
				}
				
				calcNextPrevElem();
					
				// load elem
				reset();
				loadCurElem();
			}
			
			/**
			* Enable keyboard switch
			*/
			function enableKeyboard()
			{
			}
			
			/**
			* Enable swipe switch on touch devices
			*/
			function enableSwipe()
			{
			}
			
			/**
			* Hide Flash and other objects on the HTML page
			*/
			function hideObjects()
			{
				$('select, embed, object').css({'visibility': 'hidden'});
			}
			
			/**
			 * Show Flash and other objects
			 */
			function showObjects()
			{
				$('select, embed, object').css({'visibility': 'visible'});
			}
			
			/**
			 * Embed video with HTML5 video tag
			 */
			function embedHTML5Video($container, w, h, src)
			{
				
				$container.html("<div style='position:absolute;display:block;width:" + w + "px;height:" + h + "px;'><video width=" + w + " height=" + h + " controls='controls' src='" + src + "'></div>");
				
				if (options.isAndroid)
				{
					var $play = $("<div style='position:absolute;display:block;cursor:pointer;width:" + w + "px;height:" + h + "px;background:url(\"" + options.skinfolder + "playvideo_64.png\") no-repeat center center;'></div>").appendTo($container);;
					
					$play.unbind('click').click(function(){
						
						$("video", $(this).parent())[0].play();
					});
				}
			}
			  
			/**
			 * Embed Flash
			 */
			function embedFlash($container, w, h, src, wmode, flashVars)
			{
				if (options.flashInstalled)
				{
					var htmlOptions = {
							pluginspage: "http://www.adobe.com/go/getflashplayer",
							quality: "high",
							allowFullScreen: "true",
							allowScriptAccess: "always",
							type: "application/x-shockwave-flash"
						};
					
					htmlOptions.width = w;
					htmlOptions.height = h;
					htmlOptions.src = src;
					htmlOptions.flashVars = $.param(flashVars);
					htmlOptions.wmode = wmode;
					
					var htmlString = "";
					for (var key in htmlOptions)
						htmlString += key + "=" + htmlOptions[key] + " ";
					
					$container.html("<embed " + htmlString + "/>");
				}
				else
				{
					$container.html("<div class='html5lightbox-flash-error' style='display:block; position:relative;text-align:center; width:" + w + "px; left:0px; top:" + Math.round(h /2 - 10) + "px;'><div class='html5-error'><div>The required Adobe Flash Player plugin is not installed</div><br /><div style='display:block;position:relative;text-align:center;width:112px;height:33px;margin:0px auto;'><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33'></img></a></div></div>");
				}
			}
			
			/**
			 * Check file type
			 */
			function checkType(href)
			{
				if (!href)
					return -1;
				
				if (href.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i))
					return 0;
				
				if (href.match(/[^\.]\.(swf)\s*$/i))
					return 1;
				
				if ( href.match(/\.(flv|mp4|m4v|ogv|ogg|webm)(.*)?$/i) ) 
					return 2;
				
				if ( (href.match(/\:\/\/.*(youtube\.com)/i)) || (href.match(/\:\/\/.*(youtu\.be)/i)) )
					return 3;
				
				if (href.match(/\:\/\/.*(vimeo\.com)/i)) 
					return 4;
				
				if (href.match(/[^\.]\.(pdf)\s*$/i))
					return 5;
				
				if (href.match(/[^\.]\.(mp3)\s*$/i))
					return 6;
				
				return 7;
			}
			
			/**********************************************************************
			* Do things here
			*/
			init();
			return inst.unbind('click').click(clickHandler);
			
		};
	})(jQuery);
	
	/**
	 * Apply jQuery plugin for class html5lightbox
	 */
	jQuery(document).ready(function(){
		$(".html5lightbox").html5lightbox();
	});
}
/*
 * Timeline Scroll
 * @author: Harcharan Singh <artisangang@gmail.com>
 * @author: Parshant <artisangang@gmail.com>
 * @version 1.3.1
 * @git: https://github.com/artisangang/timeline-scroll
 */

(function($){ 'use strict';

	$.fn.timelineScroll = function (config) {

		var ele = this;

		var currentIndex = 0;

		var animating = false;

		var defaultConfig = {
			button: '#timelineScroll-btn',
			siblings: '.timelineScroll-item',
			margin:20,
			timeout:100,
			delay:800
		};

		 $.extend(defaultConfig, config || {});
		

		$(defaultConfig.button).click(function () {

			var length = $(defaultConfig.siblings).length - 1;

			if (currentIndex >= length) return;

			animating = true;

			currentIndex++;

			$('html, body').animate({
	        	scrollTop: $(defaultConfig.siblings + ':eq('+currentIndex+')').offset().top - defaultConfig.margin
		    }, defaultConfig.delay, function () {
		    	
		    	setTimeout(function () {
		    		animating = false;
		    	}, defaultConfig.timeout);
		    	
		    });


		});


		$(window).scroll(function () {
							
			if (animating == false) {
							
				$(defaultConfig.siblings).each(function(e){
					
					if($(document).scrollTop() > jQuery(defaultConfig.siblings + ':eq('+e+')').offset().top){
						currentIndex = e;							
					} 

				});

			}


		});



	};

})(jQuery);
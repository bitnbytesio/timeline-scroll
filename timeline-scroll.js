/*
 * Timeline Scroll
 * @author: Harcharan Singh <artisangang@gmail.com>
 * @author: Parshant 
 * @version 2
 * @git: https://github.com/artisangang/timeline-scroll
 */

(function($){ 'use strict';

	function scrollPlugin(ele, config) {
		this.ele = ele;
		this.config = config || {};
		this.currentIndex = 0;
		this.animating = false;
		this.defaultConfig = {
			button: '#timelineScroll-btn',
			siblings: '.timelineScroll-item',
			margin:20,
			timeout:100,
			delay:800
		};



		$.extend(this.defaultConfig, this.config || {});

		this.length = $(this.defaultConfig.siblings).length - 1;

		var instance = this;

		$(this.defaultConfig.button).click(function () {	
			instance.currentIndex++;
			instance.move(instance.currentIndex);
		});

		$(window).scroll(function () {
							
			if (instance.animating == false) {
							
				$(instance.defaultConfig.siblings).each(function(e){

					var targetSibling = jQuery(instance.defaultConfig.siblings + ':eq('+e+')');
					
					if($(document).scrollTop() > targetSibling.offset().top){
						instance.currentIndex = e;		

						var event = new CustomEvent('timelineScroll', { 
				    		detail :{ 
				    			type: 'scroll',
				    			currentIndex: instance.currentIndex,
				    			siblingEle: targetSibling
				    			}
				    		});
				    	document.dispatchEvent(event);

					} 

				});

			}


		});
	}

	scrollPlugin.prototype.moveTo = function (index) {
		this.move(index);
		this.currentIndex = index;
	};

	scrollPlugin.prototype.moveNext = function () {			
		this.currentIndex++;
		this.move(this.currentIndex);
	};

	scrollPlugin.prototype.moveBack = function () {		
		this.currentIndex--;
		this.move(this.currentIndex);
	};

	scrollPlugin.prototype.move = function (index) {

		this.length = $(this.defaultConfig.siblings).length - 1;

		if (index > this.length || index < 0) return;

		this.animating = true;

		var targetSibling = $(this.defaultConfig.siblings + ':eq('+index+')');

		var instance = this;

		$('html, body').animate({
	        	scrollTop: targetSibling.offset().top - instance.defaultConfig.margin
		    }, instance.defaultConfig.delay, function () {

		    	var event = new CustomEvent('timelineScroll', { 
		    		detail :{ 
		    			type: 'move',
		    			currentIndex: index,
		    			siblingEle: targetSibling
		    			}
		    		});
		    	document.dispatchEvent(event);
		    	
		    	setTimeout(function () {
		    		instance.animating = false;
		    	}, instance.defaultConfig.timeout);
		    	
		    });

	};

	
	$.fn.timelineScroll = function (config) {

		return new scrollPlugin(this, config);


	};

})(jQuery);

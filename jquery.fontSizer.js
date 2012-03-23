/*
 * Font Sizer - A jQuery Plugin
 *
 * Examples and documentation at: <http://www.codecompendium.com/tutorials/plugins/>
 *
 * Copyright 2011 Aaron Tennyson <http://www.aarontennyson.com/>
 *
 * Version: 1.0.0 (08/10/2011)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.opensource.org/licenses/GPL-3.0
 */
(function($){
	
	$.fn.fontSizer = function(options) {

		// allows user to override plugin defaults
		options = $.fn.fontSizer.options = $.extend({}, $.fn.fontSizer.defaults, options);
		
		// resize target
		if (options.autoClass) {
			options.container = '.' + options.textContainerClass;
		}
		options.$target = options.$target || $(options.elements, options.container);
		
		// adds font size controls to document
		if (options.controls) {
			$('#' + options.controlWrapID)
				.append('<ul id="' + options.controlID + '"></ul>').children().eq(0)
					// minus
					.append('<li></li>').children().eq(0)
					.append('<a id="' + options.controlMinusID + '" href="#" title="Smaller Text"></a>').children().eq(0)
					.append('<img src="' + options.imageDir + 'minus.png" height="48" width="48" border="0" alt="Decrease Text Size" />')
				.closest('ul')
					// plus
					.append('<li></li>').children().eq(1)
					.append('<a id="' + options.controlPlusID + '" href="#" title="Larger Text"></a>').children().eq(0)
					.append('<img src="' + options.imageDir + 'plus.png" height="48" width="48" border="0" alt="Increase Text Size" />');
		}				
		
		//console.log(options.baseSize);	

		$('#' + options.controlPlusID).click(function(e){
			$.fn.fontSizer.resize(true);
			e.preventDefault();
		});
		$('#' + options.controlMinusID).click(function(e){
			$.fn.fontSizer.resize(false);
			e.preventDefault();
		});

		return this;
	};

	function resizable(isIncrement) {
		var options = $.fn.fontSizer.options;
		return isIncrement && options.baseSize <= options.maxSize || !isIncrement && options.baseSize >= options.minSize;
	}

	$.fn.fontSizer.resize = function(isIncrement) {
		var options = $.fn.fontSizer.options;
		if (!resizable(isIncrement)) {
			return;
		}
		var inc = options.increment * (isIncrement ? 1 : -1);
		// button
		$('#' + options.controlPlusID).add('#' + options.controlMinusID).children().css('opacity', 1.0);
		// resize
		options.$target.each(function(i, target){
			$(target).css('font-size', parseInt($(target).css('font-size')) + inc + 'px');
		});
		options.baseSize += inc;
		if (!resizable(isIncrement)) {
			$('#' + options[ isIncrement ? 'controlPlusID' : 'controlMinusID']).children().css('opacity', 0.5);
		}
	}

	// plugin default values
	$.fn.fontSizer.defaults = {
		maxSize: 18,
		minSize: 10,
		increment: 2,
		baseSize: parseInt($('body').css('font-size')) || 12,
		controlWrapID: 'control-wrap',
		controls: true,
		imageDir: 'images/',
		autoClass: true, // deprecated
		textContainerClass: 'fs-text', // deprecated
		$target: null,
		container: '.fs-text',
		elements: 'h1, h2, h3, h4, p, a, ul',
		controlID: 'controls',
		controlPlusID: 'fs-plus',
		controlMinusID: 'fs-minus'
	};
})(jQuery);
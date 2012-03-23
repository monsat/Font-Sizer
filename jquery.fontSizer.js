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
		options.baseSize = options.baseSize || parseInt($('body').css('font-size')) || options.defaultSize;
		
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
			$.fn.fontSizer.resize(options.increment);
			e.preventDefault();
		});
		$('#' + options.controlMinusID).click(function(e){
			$.fn.fontSizer.resize(-1 * options.increment);
			e.preventDefault();
		});

		return this;
	};

	function isMin(inc) {
		var options = $.fn.fontSizer.options;
		var size = options.baseSize + inc;
		return size < options.minSize;
	}

	function isMax(inc) {
		var options = $.fn.fontSizer.options;
		var size = options.baseSize + inc;
		return size > options.maxSize;
	}

	$.fn.fontSizer.resize = function(inc) {
		var options = $.fn.fontSizer.options;
		if (inc > 0 && isMax(inc) || inc < 0 && isMin(inc)) {
			return false;
		}
		// button
		$('#' + options.controlPlusID).add('#' + options.controlMinusID).children().css(options.buttonStyles.enable);
		// resize
		options.$target.each(function(i, target){
			$(target).css('font-size', parseInt($(target).css('font-size')) + inc + 'px');
		});
		var beforeSize = options.baseSize;
		options.baseSize += inc;
		$.fn.fontSizer.afterResize(inc);
		// callback
		options.callback({inc: inc, before: beforeSize, after: options.baseSize});

		return true;
	}

	$.fn.fontSizer.afterResize = function(inc) {
		var options = $.fn.fontSizer.options;
		if (isMin(inc)) {
			$('#' + options.controlMinusID).children().css(options.buttonStyles.disable);
		}
		if (isMax(inc)) {
			$('#' + options.controlPlusID).children().css(options.buttonStyles.disable);
		}
	}

	// plugin default values
	$.fn.fontSizer.defaults = {
		maxSize: 18,
		minSize: 10,
		increment: 2,
		baseSize: 0, // parseInt($('body').css('font-size'))
		defaultSize: 16,
		controlWrapID: 'control-wrap',
		controls: true,
		imageDir: 'images/',
		buttonStyles: {
			enable: {opacity: '1.0'},
			disable: {opacity: '0.5'}
		},
		callback: function(size) {
			// console.log(size.inc, size.before, size.after);
		},
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

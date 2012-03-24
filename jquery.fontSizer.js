/*
 * Font Sizer - A jQuery Plugin
 *
 * Version 1.x
 * Examples and documentation at: <http://www.codecompendium.com/tutorials/plugins/>
 *
 * Version 2.x
 * Examples and documentation at: <https://github.com/monsat/Font-Sizer>
 *
 * Copyright 2011 Aaron Tennyson <http://www.aarontennyson.com/>
 * Copyright 2012 mon_sat <http://www.direct-search.jp/>
 *
 * Version: 1.0.0 (08/10/2011) by Aaron Tennyson
 * Version: 2.0.0 (03/24/2012) by mon_sat
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.opensource.org/licenses/GPL-3.0
 */
(function($){

	var FontSizer = function(element, options) {
		this.$element = $(element);
		var options = this.options = $.extend({}, $.fn.fontSizer.defaults, options);
		// base font size
		options.baseSize = options.baseSize || parseInt($('body').css('font-size')) || options.defaultSize;
		options.defaultSize = options.baseSize;
		// resize target
		options.$target = options.$target || $(options.elements, options.container);
		// adds font size controls to document
		options.controls && this.createResizeButtons();
		// bind
		this.bindControls();
	}

	// methods
	FontSizer.prototype = {
		constructor: FontSizer
		, resize: function(inc) {
			if (!inc || inc > 0 && this.isMax(inc) || inc < 0 && this.isMin(inc)) {
				return false;
			}
			// button
			$('#' + this.options.controlPlusID).add('#' + this.options.controlMinusID).children().css(this.options.buttonStyles.enable);
			// resize
			this.options.$target.each(function(i, target){
				$(target).css('font-size', parseInt($(target).css('font-size')) + inc + 'px');
			});
			var beforeSize = this.options.baseSize;
			this.options.baseSize += inc;
			this.afterResize(inc);
			// callback
			this.options.callback({inc: inc, before: beforeSize, after: this.options.baseSize});
			// result
			return true;
		}
		, afterResize: function(inc) {
			if (this.isMin(inc)) {
				$('#' + this.options.controlMinusID).children().css(this.options.buttonStyles.disable);
			}
			if (this.isMax(inc)) {
				$('#' + this.options.controlPlusID).children().css(this.options.buttonStyles.disable);
			}
		}
		, fontSize: function(size) {
			if (size < this.options.minSize || size == 'min') {
				size = this.options.minSize;
			} else if (size > this.options.maxSize || size == 'max') {
				size = this.options.maxSize;
			} else if (typeof size == 'string') {
				size = this.options.defaultSize;
			}
			return this.resize(size - this.options.baseSize);
		}
		, isMin: function(inc) {
			var size = this.options.baseSize + inc;
			return size < this.options.minSize;
		}
		, isMax: function(inc) {
			var size = this.options.baseSize + inc;
			return size > this.options.maxSize;
		}
		, createResizeButtons: function() {
			$('#' + this.options.controlWrapID)
				.append('<ul id="' + this.options.controlID + '"></ul>').children().eq(0)
					// minus
					.append('<li></li>').children().eq(0)
					.append('<a id="' + this.options.controlMinusID + '" href="#" title="Smaller Text"></a>').children().eq(0)
					.append('<img src="' + this.options.imageDir + 'minus.png" height="48" width="48" border="0" alt="Decrease Text Size" />')
				.closest('ul')
					// plus
					.append('<li></li>').children().eq(1)
					.append('<a id="' + this.options.controlPlusID + '" href="#" title="Larger Text"></a>').children().eq(0)
					.append('<img src="' + this.options.imageDir + 'plus.png" height="48" width="48" border="0" alt="Increase Text Size" />');
		}
		, bindControls: function() {
			var _this = this;
			$('#' + _this.options.controlPlusID).click(function(e){
				_this.resize(_this.options.increment);
				e.preventDefault();
			});
			$('#' + _this.options.controlMinusID).click(function(e){
				_this.resize(-1 * _this.options.increment);
				e.preventDefault();
			});
		}
	}

	// internal

	// definition
	$.fn.fontSizer = function(option) {
		return this.each(function(){
			var $this = $(this);
			var data = $this.data('fontSizer');
			var options = typeof option == 'object' && option;
			if (!data) {
				$this.data('fontSizer', (data = new FontSizer(this, options)));
			}
			if (typeof option != 'object') {
				data.fontSize(option);
			}
		});
	};
	// construct
	$.fn.fontSizer.Contsructor = FontSizer;

	// plugin default values
	$.fn.fontSizer.defaults = {
		maxSize: 18,
		minSize: 10,
		increment: 2,
		baseSize: 0, // parseInt($('body').css('font-size'))
		defaultSize: 16,
		buttonStyles: {
			enable: {opacity: '1.0'},
			disable: {opacity: '0.5'}
		},
		callback: function(size) {
			// console.log(size.inc, size.before, size.after);
		},
		container: '.fs-text',
		elements: 'h1, h2, h3, h4, p, a, ul',
		// deprecated
		controls: true,
		imageDir: 'images/',
		controlWrapID: 'control-wrap',
		autoClass: true,
		textContainerClass: 'fs-text',
		$target: null,
		controlID: 'controls',
		controlPlusID: 'fs-plus',
		controlMinusID: 'fs-minus'
	};

})(jQuery);

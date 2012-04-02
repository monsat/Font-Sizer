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
 * Requires: jQuery v1.7+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.opensource.org/licenses/GPL-3.0
 */
(function($){

	var FontSizer = function($element, options) {
		var options = this.options = $.extend({}, $.fn.fontSizer.defaults, options);
		// base font size
		options.baseSize = options.baseSize || parseInt($('body').css('font-size')) || options.defaultSize;
		options.defaultSize = options.baseSize;
		// resize target
		options.$target = options.$target || $(options.elements, $element);
		// adds font size controls to document
		if (options.controls) {
			$wrapper = $( '#' + options.controlWrapID );
			$wrapper.length && createResizeButtons($wrapper, options);
		}
	}

	// methods
	FontSizer.prototype = {
		constructor: FontSizer
		, resize: function(inc, size) {
			if (!inc || inc > 0 && this.isMax(inc) || inc < 0 && this.isMin(inc)) {
				return false;
			}
			// button
			$( '[' + this.options.triggers.inc + ']' ).add( '[' + this.options.triggers.size + ']' ).children().andSelf()
				.css(this.options.buttonStyles.enable);
			// resize
			this.options.$target.each(function(i, target){
				$(target).css('font-size', parseInt($(target).css('font-size')) + inc + 'px');
			});
			var beforeSize = this.options.baseSize;
			this.options.baseSize = size;
			this.afterResize(inc, size);
			// callback
			this.options.callback({inc: inc, before: beforeSize, after: size});
			// result
			return true;
		}
		, afterResize: function(inc, size) {
			var _this = this;
			var _options = _this.options;
			var _triggers = _options.triggers;
			$( '[' + _options.triggers.inc + ']' ).each(function(){
				var _inc = parseInt($(this).attr( _triggers.inc ));
				if (_this.isMin(_inc) && _inc < 0 || _this.isMax(_inc) && _inc > 0) {
					$(this).children().andSelf().css(_options.buttonStyles.disable);
				}
			});
			$( '[' + _options.triggers.size + ']' ).each(function(){
				var _size = $(this).attr( _triggers.size );
				_size = isNaN(_size) ? _size : parseInt(size);
				if (size <= _size && (_size == 'min' || _size == _options.minSize)) {
					$(this).children().andSelf().css(_options.buttonStyles.disable);
				}
				if (size <= _size && (_size == 'default' || _size == _options.defaultSize)) {
					$(this).children().andSelf().css(_options.buttonStyles.disable);
				}
				if (size <= _size && (_size == 'max' || _size == _options.maxSize)) {
					$(this).children().andSelf().css(_options.buttonStyles.disable);
				}
			});
		}
		, fontSize: function(size) {
			if (size < this.options.minSize || size == 'min') {
				size = this.options.minSize;
			} else if (size > this.options.maxSize || size == 'max') {
				size = this.options.maxSize;
			} else {
				size = isNaN(size) ? this.options.defaultSize : parseInt(size);
			}
			return this.resize(size - this.options.baseSize, size);
		}
		, isMin: function(inc) {
			var size = this.options.baseSize + inc;
			return size < this.options.minSize;
		}
		, isDefault: function() {
			return this.options.baseSize == this.options.defaultSize;
		}
		, isMax: function(inc) {
			var size = this.options.baseSize + inc;
			return size > this.options.maxSize;
		}
	}

	// internal
	var createResizeButtons = function($target, _options) {
		var _options = _options || $.fn.fontSizer.defaults;
		$target = $target || $('#' + _options.controlWrapID);
		if ($target.html().length) {
			return false;
		}
		$target.append('<ul id="' + _options.controlID + '"></ul>').children().eq(0)
			// minus
			.append('<li></li>').children().eq(0)
			.append('<a id="' + _options.controlMinusID + '" href="#" title="Smaller Text"></a>').children().eq(0)
			.append('<img src="' + _options.imageDir + 'minus.png" ' + _options.triggers.inc + '="-' + _options.increment  + '" data-target=".' + _options.textContainerClass + '" height="48" width="48" border="0" alt="Decrease Text Size" />')
		.closest('ul')
			// plus
			.append('<li></li>').children().eq(1)
			.append('<a id="' + _options.controlPlusID + '" href="#" title="Larger Text"></a>').children().eq(0)
			.append('<img src="' + _options.imageDir + 'plus.png" ' + _options.triggers.inc + '="+' + _options.increment  + '" data-target=".' + _options.textContainerClass + '" height="48" width="48" border="0" alt="Increase Text Size" />');
	}

	// definition
	$.fn.fontSizer = function(option) {
		var $target = $(this);
		// for old version
		if (!$target.length) {
			$target = $('.' + (option && option.textContainerClass || $.fn.fontSizer.defaults.textContainerClass));
		}
		$target.each(function(){
			var data = $target.data('fontSizer');
			var options = typeof option == 'object' && option;
			if (!data) {
				$target.data('fontSizer', (data = new FontSizer($target, options)));
			}
			if (typeof option == 'number' || typeof option == 'string') {
				if (typeof option == 'string' && (option.substring(0, 1) == '+' || option.substring(0, 1) == '-')) {
					option = data.options.baseSize + parseInt(option);
				} else if (isNaN(option)) {
					var _keys = {
						min: data.options.minSize,
						max: data.options.maxSize
					};
					option = _keys[option] || data.options.defaultSize;
				}
				data.fontSize(option || data.options.defaultSize);
			}
		});
		return $(this);
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
		triggers: {
			inc: 'data-fontsizer-inc',
			size: 'data-fontsizer-size'
		},
		$target: null,
		elements: 'h1, h2, h3, h4, p, ul',
		// deprecated
		controls: true,
		imageDir: 'images/',
		controlWrapID: 'control-wrap',
		textContainerClass: 'fs-text',
		$target: null,
		controlID: 'controls',
		controlPlusID: 'fs-plus',
		controlMinusID: 'fs-minus'
	};

	$(function(){
		var _triggers = $.fn.fontSizer.defaults.triggers;
		// automatic font resize
		$('body').on('click.fontSizer.data-api', '[' + _triggers.inc + ']' + ', ' + '[' + _triggers.size + ']', function(e){
			var $this = $(this);
			var option = $this.attr(_triggers.inc) || $this.attr(_triggers.size);
			var $target = $($this.attr('data-target'));
			$target.fontSizer(option);
			e.preventDefault();
		});
	});

})(jQuery);

module("fontSizer", {
	startup: function(){}
});
test("construct", function(){
	// construct
	$body = $('body');
	$target = $('.fontSizerTarget');
	$elements = $target.find('p');
	$target.fontSizer({
		callback: function(size) {
			console.dir(size);
		},
		baseSize: 16,
		increment: 2,
		minSize: 10,
		maxSize: 20,
		imageDir: '../img/',
		container: '.fontSizerTarget',
	});
	var options = $body.data('fontSizer').options;
	// tests
	QUnit.equal(options.baseSize, 16, 'baseSize must be 16');
	QUnit.equal(options.defaultSize, 16, 'defaultSize must be 16');

	QUnit.equal($elements.css('font-size'), '16px', 'font-size must be 16px');

	QUnit.strictEqual($('#control-wrap').html().length, 362, 'automatic setting of controls failed');

	$target.fontSizer(12);
	QUnit.equal(options.baseSize, 12, 'baseSize must be 12');
	QUnit.equal($elements.css('font-size'), '12px', 'font-size must be 12px');

	$target.fontSizer('14');
	QUnit.equal(options.baseSize, 14, 'baseSize must be 14');
	QUnit.equal($elements.css('font-size'), '14px', 'font-size must be 14px');

	$target.fontSizer('14');
	$target.fontSizer('+3');
	QUnit.equal(options.baseSize, 17, 'baseSize must be 17');
	QUnit.equal($elements.css('font-size'), '17px', 'font-size must be 17px');

	$target.fontSizer('14');
	$target.fontSizer('-3');
	QUnit.equal(options.baseSize, 11, 'baseSize must be 11');
	QUnit.equal($elements.css('font-size'), '11px', 'font-size must be 11px');

	$target.fontSizer('max');
	QUnit.equal(options.baseSize, 20, 'baseSize must be 20 (maxSize)');
	QUnit.equal($elements.css('font-size'), '20px', 'font-size must be 20px (maxSize)');

	$target.fontSizer('min');
	QUnit.equal(options.baseSize, 10, 'baseSize must be 10 (minSize)');
	QUnit.equal($elements.css('font-size'), '10px', 'font-size must be 10px (minSize)');

	$target.fontSizer('default');
	QUnit.equal(options.baseSize, 16, 'baseSize must be 16 (defaultSize)');
	QUnit.equal($elements.css('font-size'), '16px', 'font-size must be 16px (defaultSize)');
});

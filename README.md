# Font Sizer - A jQuery Plugin

## Version 1.x

- Examples and documentation at: <http://www.codecompendium.com/tutorials/plugins/>
- Copyright 2011 Aaron Tennyson <http://www.aarontennyson.com/>

## Version 2.x

- Examples and documentation at: <https://github.com/monsat/Font-Sizer>
- Copyright 2012 mon_sat <http://www.direct-search.jp/>

## Version

- 1.0.0 (08/10/2011) by Aaron Tennyson
- 2.0.0 (03/24/2012) by mon_sat

## Requires

- jQuery v1.3+ (Version 1.x)
- jQuery v1.7+ (Version 2.x)

## Dual licensed under the MIT and GPL licenses:

- http://www.opensource.org/licenses/mit-license.php
- http://www.opensource.org/licenses/GPL-3.0

## USAGE ( version2.x )

### basic

```html
<div id='control-wrap'><!-- create buttons here --></div>
<div class="main">
  <h1>Header</h1>
  <p>contents</p>
</div>
```
```js
$(function(){
  $('.main').fontSizer();
});
```

### links to change fontSize

```html
<div>
  <a href='#' id='fontSizerLargest'>Largest</a>
  <a href='#' id='fontSizerLarger'>Larger</a>
  <a href='#' id='fontSizerReset'>Reset Size</a>
  <a href='#' id='fontSizerSmaller'>Smaller</a>
  <a href='#' id='fontSizerSmallest'>Smallest</a>
</div>
<div class="main">
  <h1>Header</h1>
  <p>contents</p>
</div>
```
```js
$(function(){
  var $target = $('.main');
  $('#fontSizerLargest').click(function(){
    $target.fontSizer(18);    // 18px , or 'max'
  });
  $('#fontSizerLarger').click(function(){
    $target.fontSizer('+2');  // +2px
  });
  $('#fontSizerReset').click(function(){
    $target.fontSizer(14);    // 14px , or 'default'
  });
  $('#fontSizerSmaller').click(function(){
    $target.fontSizer('-2');  // -2px
  });
  $('#fontSizerSmallest').click(function(){
    $target.fontSizer(10);    // 10px , or 'min'
  });
});
```

### activate by html attributes

You can activate fontSizer on your page easily without having to write javascript.
Just set data-fontsizer-inc="+3" or data-fontsizer-size="max" on link element with a data-target=".target" (target element).

```html
<a href="#" data-fontsizer-inc="+3" data-target=".main">3px Larger</a>
<a href="#" data-fontsizer-inc="-5" data-target=".main">5px Smaller</a>
<a href="#" data-fontsizer-size="17" data-target=".main">Set to 17px</a>
<a href="#" data-fontsizer-size="min" data-target=".main">Smallest</a>
<a href="#" data-fontsizer-size="max" data-target=".main">Largest</a>
<a href="#" data-fontsizer-size="default" data-target=".main">Set to default fontSize</a>
<div class="main">
  <h1>Header</h1>
  <p>contents</p>
</div>
```

### options

<table>
  <tr>
    <th>key</th>
    <th>default value</th>
    <th>note</th>
  </tr>
  <tr>
    <td>maxSize</td>
    <td>18</td>
    <td>max fontSize.</td>
  </tr>
  <tr>
    <td>minSize</td>
    <td>12</td>
    <td>minimum fontSize.</td>
  </tr>
  <tr>
    <td>increment</td>
    <td>2</td>
    <td>fontSize to increment / decrement</td>
  </tr>
  <tr>
    <td>baseSize</td>
    <td>14</td>
    <td>default fontSize.</td>
  </tr>
  <tr>
    <td>controlWrapID</td>
    <td>'control-wrap'</td>
    <td>create fontSizer buttons in the element ID <br> if [control] option is true.</td>
  </tr>
  <tr>
    <td>controls</td>
    <td>true</td>
    <td>true if create fontSizer buttons.</td>
  </tr>
  <tr>
    <td>textContainerClass</td>
    <td>'fs-text'</td>
    <td>wrapper element to change fontSize.</td>
  </tr>
  <tr>
    <td>elements</td>
    <td>'h1, h2, h3, h4, p, ul'</td>
    <td>change this elements fontSize</td>
  </tr>
  <tr>
    <td>buttonStyles※</td>
    <td>
      {
        enable: {opacity: '1.0'},
        disable: {opacity: '0.5'}
      }
    </td>
    <td>button styles</td>
  </tr>
  <tr>
    <td>callback※</td>
    <td>function(size){}</td>
    <td>callback function</td>
  </tr>
  <tr>
    <td>imageDir※</td>
    <td>'images/'</td>
    <td>image directory name</td>
  </tr>
</table>

※ This version only.

```js
$(function(){
  $('.main').fontSizer({
    imageDir: '/img/',
    callback: function(size){
      console.log(size.inc, size.before, size.after);
    }
  });
});
```

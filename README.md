# Coverflow.js

A jQuery plugin that displays images in a coverflow (similar to iTunes). Currently works only in webkit-based browsers.

[View the demo page](http://zdyn.github.io/coverflow.js)

## Prerequisites

jQuery (tested in 2+, but probably works in most versions).

## Supported browsers

* Chrome 27+
* Safari 6+

Until some of the webkit CSS attributes become standardized, this is it.

## Usage

Initialize the coverflow on a container element with img children, e.g.

```html
<div id="container">
  <img src="some-img.png" />
  <img src="some-img.png" />
  <img src="some-img.png" />
</div>
<script>
  $("#container").coverflow();
</script>
```

The following methods are provided:

* prev
* next
* first
* last
* toIndex(index)

Example usage:

```javascript
var coverflow = $("#container").coverflow();
coverflow.next();
```

## Options

Override the default options by passing in an object of key-value pairs when initializing the coverflow. The defaults are shown below:

```javascript
var coverflow = $("#container").coverflow({
  coverWidth:           300,    // Width of each cover
  coverHeight:          300,    // Height of each cover
  backgroundCoverScale: .8,     // Ratio of background to centered cover size
  currentIndex:         0,      // Start the coverflow at the given index
  fromCenter:           .2,     // Distance between centered and first background cover on each side
                                // as a fraction of the coverWidth
  betweenCovers:        .2,     // Distance between background covers as a fraction of coverWidth
  backgroundColor:      "#000", // Background color
  rotateDegree:         60,     // Degree each cover is rotated around the y axis
  fadeEdges:            false,  // True if left and right edges of coverflow should "fade"
  allowClick:           true,   // True if clicking should navigate
  allowSwipe:           true,   // True if holding mouse button and swiping should navigate
  changeFn:             null,   // Callback function called whenever centered cover changes
  readyFn:              null    // Callback function called when coverflow is done initializing
});
```

## Known issues

* Under certain configurations, click navigation for the first background covers on each side are broken

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)

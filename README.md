Description
===========

A jQuery plugin that allows you to display images in a coverflow. Currently only works in webkit browsers.
Usage
=====

Initialize the coverflow:

```$('#div').coverflow();
$('#div').coverflow({ options });```

If you want to navigate the coverflow in your own JavaScript code, assign the call to a variable:

var coverflow = $('#div').coverflow();

The following functions are provided:

prev:  go to previous cover, does nothing if at first
next:  go to next cover, does nothing if at last
first: go to first cover
last:  go to last cover

For example 

Options
=======

option: [default value] description

coverWidth:     400  width of each cover in pixels
coverHeight:    400  height of each cover in pixels
coverScale:     .65  ratio of non-centered to centered cover size
currentIndex:     0  index of currently centered image
betweenCovers:   .1  distance between non-centered covers, fraction of cover size
fromCenter:     .35  distance between centered cover and first non-centered cover on each side, fraction of cover size
rotateDegree:    75  degree by which each cover is rotated around the y-axis
fadeEdges:     true  true if left and right edges of coverflow should "fade", requires background to be black (#000)
allowClick:    true  true if you want to allow clicking on non-centered covers to trigger coverflow
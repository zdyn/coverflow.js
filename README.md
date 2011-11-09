# Coverflow

A jQuery plugin that allows you to display images in a coverflow. Currently works only in webkit browsers. An demo of the plugin in action is available at http://zdyn.github.com/coverflow/.

## Prerequisites

jQuery 1.7

## Usage

Initialize the coverflow. This must be done inside `$(window).load`:

    $(window).load(function(){
      $('#div').coverflow();
    });

The following functions are provided if you want to navigate the coverflow in your own JavaScript code:

    prev:  go to the previous cover, does nothing if at first
    next:  go to the next cover, does nothing if at last
    first: go to the first cover
    last:  go to the last cover

Use them by first assigning the coverflow call to your own variable, e.g.:

    var coverflow = $('#div').coverflow();
	  coverflow.next();

## Options

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

Override the default options by passing in the parameters you wish to change in an object. For example:

    $('#div').coverflow({
      coverWidth: 600,
      coverHeight: 600
    });

## Known issues

1. Using non-square dimensions for coverWidth and coverHeight results in broken click navigation
2. At larger sizes, width for non-centered covers becomes distorted
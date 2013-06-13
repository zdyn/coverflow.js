;(function($) {
	var defaults = {
		coverWidth: 300,
		coverHeight: 300,
		backgroundCoverScale: .8,
		currentIndex: 0,
		fromCenter: .2,
		betweenCovers: .2,
		backgroundColor: "#000",
		rotateDegree: 60,
		fadeEdges: false,
		allowClick: true,
		allowSwipe: true,
		changeFn: null,
		readyFn: null
	};
	$.fn.coverflow = function(options) {
		if (this.length > 1) {
			var elements = [];
			for (var i = 0; i < this.length; i++) {
				elements.push(this.eq(i).coverflow(options));
			}
			return elements;
		}

		var _this = this;
		$.extend(this, {
			init: function(){
				this.addClass("coverflow");

				var imgs = this.children("img");
				imgs.each(function() { this.onselectstart = this.ondragstart = function() { return false; }});
				this.numCovers = imgs.length;
				imgs.wrap("<div class='cover'>");
				this.covers = this.children(".cover");

				if (this.fadeEdges) {
					this.append($("<div class='cover-gradient'>").css("backgroundColor", this.backgroundColor));
				}

				this.covers.css({
					width: _this.coverWidth,
					height: _this.coverHeight * 2,
					marginTop: _this.coverHeight / -2,
					backgroundColor: this.backgroundColor
				});
				this.backgroundCoverMarginTop = -_this.coverHeight * ((2 - this.backgroundCoverScale) / 2);
				this.draw();

				this.attachClickHandlers();

				if (this.readyFn) { this.readyFn(); }
			},
			attachClickHandlers: function() {
				if (this.allowClick) {
					this.on("click", "img", function() {
						_this.toIndex($(this).parent().index());
					});
				}
				if (this.allowSwipe) {
					this.on({
						mousedown: function(e) {
							var startX = e.pageX;
							$(this).on("mousemove", function(e) {
								var change = ~~((startX - e.pageX) / (_this.width() * 0.75) * _this.numCovers);
								if (change) {
									_this.toIndex(_this.currentIndex + change);
									startX = e.pageX;
								}
							});
						},
						mouseup: function() { $(this).off("mousemove"); },
						mouseleave: function() { $(this).off("mousemove"); }
					})
				}
			},
			next: function() {
				this.toIndex(this.currentIndex + 1);
			},
			prev: function() {
				this.toIndex(this.currentIndex - 1);
			},
			first: function() {
				this.toIndex(0);
			},
			last: function() {
				this.toIndex(this.numCovers - 1);
			},
			toIndex: function(index) {
				if (index === this.currentIndex || index >= this.numCovers || index < 0) { return; }

				if (this.changeFn) { this.changeFn(this.currentIndex); }

				this.currentIndex = index;
				this.draw();
			},
			draw: function() {
				this.covers.eq(this.currentIndex).css({
					marginLeft: this.coverWidth / -2,
					marginTop: this.coverHeight / -2,
					webkitTransform: "rotateY(0)",
					zIndex: this.numCovers - this.currentIndex
				});
				this.covers.slice(0, this.currentIndex).each(function(index) {
					$(this).css({
						marginLeft: _this.coverWidth * (-_this.fromCenter - (_this.currentIndex - index - 1)
								* _this.betweenCovers - 1),
						marginTop: _this.backgroundCoverMarginTop,
						webkitTransform: "rotateY(" + _this.rotateDegree + "deg) scale(" + _this.backgroundCoverScale + ")",
						zIndex: 0
					});
				});
				this.covers.slice(this.currentIndex + 1).each(function(index) {
					$(this).css({
						marginLeft: _this.coverWidth * (_this.fromCenter + _this.betweenCovers * index),
						marginTop: _this.backgroundCoverMarginTop,
						webkitTransform: "rotateY(-" + _this.rotateDegree + "deg) scale(" + _this.backgroundCoverScale + ")",
						zIndex: _this.numCovers - _this.currentIndex - index - 1
					});
				});
			},
			resizeImage: function(img) {
				if (img.width() / img.height() > this.coverWidth / this.coverHeight) {
					img.css({
						width: "100%",
						height: ""
					});
				} else {
					img.css({
						width: "",
						height: "100%"
					});
				}
			}
		}, defaults, options);
		this.init();

		var api = {};
		var fns = ["next", "prev", "first", "last", "toIndex"];
		for (var i = 0; i < fns.length; i++) {
			api[fns[i]] = (function(fn) {
				return function() { _this[fn].apply(_this, Array.prototype.slice.call(arguments)); }
			})(fns[i]);
		}
		return api;
	}
})(jQuery);

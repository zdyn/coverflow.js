;(function($) {
	var defaults = {
		coverWidth: 400,
		coverHeight: 400,
		coverScale: .65,
		currentIndex: 0,
		betweenCovers: .1,
		backgroundColor: "#000",
		fromCenter: .35,
		rotateDegree: 75,
		fadeEdges: false,
		allowClick: true,
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
				this.numCovers = imgs.length;
				imgs.wrap("<div class='cover'>");
				this.covers = this.children(".cover");

				if (this.fadeEdges) {
					this.append($("<div class='cover-gradient-left cover-gradient'>"),
								$("<div class='cover-gradient-right cover-gradient'>"));
				}

				this.covers.css({
					width: _this.coverWidth,
					height: _this.coverHeight * 2,
					"margin-top": _this.coverHeight / -2
				});
				this.backgroundCoverMarginTop = -_this.coverHeight * ((2 - this.coverScale) / 2);
				this.draw();

				this.attachClickHandlers();

				this.find("img").each(function() {
					this.onselectstart = this.ondragstart = function() { return false; };
				});

				return this;
			},
			attachClickHandlers: function() {
				if (this.allowClick) {
					this.on("click", "img", function() {
						_this.toCover($(this).parent().index());
					});
				}
			},
			next: function() {
				this.toCover(this.currentIndex + 1);
			},
			prev: function() {
				this.toCover(this.currentIndex - 1);
			},
			first: function() {
				this.toCover(0);
			},
			last: function() {
				this.toCover(this.numCovers - 1);
			},
			toCover: function(index) {
				if (index === this.currentIndex || index >= this.numCovers || index < 0) { return; }

				this.currentIndex = index;
				this.draw();
			},
			draw: function() {
				this.covers.eq(this.currentIndex).css({
					"margin-left": this.coverWidth / -2,
					"margin-top": this.coverHeight / -2,
					"webkit-transform": "rotateY(0)",
					"z-index": this.numCovers - this.currentIndex
				});
				this.covers.slice(0, this.currentIndex).each(function(index) {
					$(this).css({
						"margin-left": _this.coverWidth * (-_this.fromCenter - (_this.currentIndex - index - 1)
								* _this.betweenCovers - 1),
						"margin-top": _this.backgroundCoverMarginTop,
						"webkit-transform": "rotateY(" + _this.rotateDegree + "deg) scale(" + _this.coverScale + ")",
						"z-index": 0
					});
				});
				this.covers.slice(this.currentIndex + 1).each(function(index) {
					$(this).css({
						"margin-left": _this.coverWidth * (_this.fromCenter + _this.betweenCovers * index),
						"margin-top": _this.backgroundCoverMarginTop,
						"webkit-transform": "rotateY(-" + _this.rotateDegree + "deg) scale(" + _this.coverScale + ")",
						"z-index": _this.numCovers - _this.currentIndex - index - 1
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
		});

		$.extend(this, defaults, options);
		this.init();
	}
})(jQuery);

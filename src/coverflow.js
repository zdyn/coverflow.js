;(function($){

	var defaults = {
		coverWidth: 400,
		coverHeight: 400,
		coverScale: .65,
		currentIndex: 0,
		betweenCovers: .1,
		fromCenter: .35,
		rotateDegree: 75,
		fadeEdges: true,
		allowClick: true
	};

	$.fn.coverflow = function(options){

		if(this.length > 1){
			this.each(function(){
				$(this).coverflow(options);
			});
		}

		$.extend(this, {

			next: function(){
				this.toCover(this.currentIndex + 1);
			},

			prev: function(){
				this.toCover(this.currentIndex - 1);
			},

			first: function(){
				this.toCover(0);
			},

			last: function(){
				this.toCover(this.data.len - 1);
			},

			toCover: function(index){
				if(index === this.currentIndex || index >= this.data.len || index < 0)
					return;

				this.currentIndex = index;
				this.draw();
			},

			draw: function(){
				var covers = this.find(".zd_cover"),
						coverflow = this;

				covers.filter(".active").removeClass("active").css({
					"margin-top": this.coverHeight / -2 + this.data.skewE,
					"width": this.data.skewW,
					"height": this.data.skewH
				});
				covers.eq(this.currentIndex).addClass("active").css({
					"margin-top": this.coverHeight / -2,
					"margin-left": this.coverWidth / -2,
					"width": this.coverWidth,
					"height": this.coverHeight,
					"webkit-transform": "rotateY(0)",
					"z-index": this.data.len - this.currentIndex
				});

				covers.slice(0, this.currentIndex).each(function(i){
					$(this).css({
						"margin-left": coverflow.coverWidth * (-1 * coverflow.fromCenter - (coverflow.currentIndex - i - 1) * coverflow.betweenCovers) - coverflow.data.skewW,
						"webkit-transform": "rotateY(" + coverflow.rotateDegree + "deg)",
						"z-index": 0
					});
				});
				covers.slice(this.currentIndex + 1).each(function(i){
					$(this).css({
						"margin-left": coverflow.coverWidth * (coverflow.fromCenter + coverflow.betweenCovers * i),
						"webkit-transform": "rotateY(-" + coverflow.rotateDegree + "deg)",
						"z-index": coverflow.data.len - coverflow.currentIndex - i - 1
					});
				});
			},

			init: function(){
				var imgs = this.children("img"),
						coverflow = this;

				while(imgs.length){
					var cover = $("<div>").append(imgs.eq(0).remove()).addClass("zd_cover");
					this.append(cover);
					imgs = imgs.slice(1);
				}

				var covers = this.find(".zd_cover");

				this.data = {
					len: covers.length,
					skewE: (this.coverHeight - this.coverHeight * this.coverScale) / 2,
					skewW: this.coverWidth * this.coverScale,
					skewH: this.coverHeight * this.coverScale,
				};
				this.css("-webkit-perspective", 500);

				if(this.fadeEdges){
					var grad_l = $("<div>").addClass("zd_grad_l zd_grad").css({
						"right": this.width() / 2 + (this.coverWidth / 2),
						"z-index": this.data.len + 1
					});
					var grad_r = $("<div>").addClass("zd_grad_r zd_grad").css({
						"left": this.width() / 2 + (this.coverWidth / 2),
						"z-index": this.data.len + 1
					});
					this.append(grad_l, grad_r);
				}

				covers.splice(this.currentIndex, 1);
				covers.each(function(index){
					$(this).css({
						"margin-top": coverflow.coverHeight / -2 + coverflow.data.skewE,
						"width": coverflow.data.skewW,
						"height": coverflow.data.skewH
					});
				});
				this.draw();

				if(this.allowClick)
					this.find("img").click(function(){
						coverflow.toCover($(this).parent().index(".zd_cover"));
					});

				this.find("img").each(function(){
					coverflow.resizeImage($(this));
					this.onselectstart = this.ondragstart = function(){ return false; };
				});

				return coverflow;
			},

			resizeImage: function(img){
				if(img.width() / img.height() > this.coverWidth / this.coverHeight)
					img.css({
						"width": "100%",
						"height": ""
					});
				else
					img.css({
						"width": "",
						"height": "100%"
					});
			}

		});

		$.extend(this, defaults, options);

		return this.init();

	}

})(jQuery);

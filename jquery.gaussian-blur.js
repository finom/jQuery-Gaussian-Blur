(function(){

	var ua = navigator.userAgent;
	var isLtIE8 = ~ua.indexOf('MSIE 6')	|| ~ua.indexOf('MSIE 7') || ~ua.indexOf('MSIE 8'); //is it old IE

	//mitcro lib that creates SVG elements and adds attributes for it
	var SVG = {
		
		//namespaces
		svgns: 'http://www.w3.org/2000/svg',
		xlink: 'http://www.w3.org/1999/xlink',
		
		//creating of SVG element
		createElement: function(name, attrs){
			var element = document.createElementNS(SVG.svgns, name);
			
			if(attrs) {
				SVG.setAttr(element, attrs);
			}
			return element;
		},
		
		//setting attributes
		setAttr: function(element, attrs) {
			for(var i in attrs) {
				if(i === 'href') { //path of an image should be stored at xlink:href attribute
					element.setAttributeNS(SVG.xlink, i, attrs[i]);
				} else { //common attribute
					element.setAttribute(i, attrs[i]);
				}
			}
			return element;
		}
	}

	jQuery.fn.gaussianBlur = function(args){
		
		var args = $.extend({
			deviation: 1, //intensity of blur 
			imageClass: 'blurImage'	//the class of original image
		}, args);
		
		$(this).each(function(){
			var $this = $(this);
			
			var $img = $this.children('img.'+args.imageClass); //image that should be blurred
			if(!$img.length) return;
			
			var blurredId = Math.random(); //unique id for blurred image
			var imgSrc = $img.attr('src'); //original image's path
			var imgWidth = $img.width(); //width
			var imgHeight = $img.height(); //height (your CO :))
			var svg, filterId, filter, gaussianBlur, image; //description below
			
			$this.children('[id^="blurred"]').remove(); //removing the blurred image during second using of plagin
														//problem is that we can't add any class to SVG element
			$this.width(imgWidth).height(imgHeight);
			
			if(!isLtIE8) { //if it modern browser
				
				svg = SVG.createElement('svg', { //our SVG element 
					xmlns: SVG.svgns,
					version: '1.1',
					width: imgWidth,
					height: imgHeight,
					id: 'blurred'+blurredId
				});
				
				filterId = 'blur'+blurredId; //id of the filter that is called by image element
				filter = SVG.createElement('filter', { //filter
					id:filterId
				});
				
				gaussianBlur = SVG.createElement('feGaussianBlur', { //gaussian blur element
					'in':'SourceGraphic', //"in" is keyword. Opera generates an error if we don't put quotes
					stdDeviation: args.deviation //intencity of blur
				}); 
				
				image = SVG.createElement('image', { //The image that uses the filter of blur
					x: 0,
					y: 0,
					width: imgWidth,
					height: imgHeight,
					href: imgSrc,
					style: 'filter:url(#'+filterId+')' //filter link
				});
				
				filter.appendChild(gaussianBlur); //adding the element of blur into the element of filter
				svg.appendChild(filter); //adding the filter into the SVG
				svg.appendChild(image); //adding an element of an image into the SVG
				this.appendChild(svg); //adding an SVG element into span which contains the original image
				
			} else { //if it's IE6,7,8
				$img.clone().css({ //cloning of the original image and adding some attributes
					//filter property; here the intensity of blur multipied by two is around equal to the intensity in common browsers.   
					filter: 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + args.deviation*2 + ')',
					//aligning of the blurred image by vertical and horizontal
					top: -args.deviation*2, 
					left: -args.deviation*2,
					//somehow the heights and the widths of the image are unequal; fixing
					width: imgWidth,
					height: imgHeight
				}).removeClass(args.imageClass).attr('id', 'blurred'+blurredId).appendTo(this);
			}
		});
		
	}

})();
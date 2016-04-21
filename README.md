[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

This is the plugin which adds Gaussian Blur effect for images. This plugin uses the SVG and filter property for Internet Explorer 8-. Plugin doesn't work in Safari because it doesn't support feGaussianBlur element. You can use canvas element to support it but here is no canvas. 

Here is one remark: each image should be in some container (e.g. span)

Using
$('.blurImageContainer').gaussianBlur({
	deviation: 3, //level of blur
});

You should to add that styles:
.blurImageContainer {display: inline-block; position: relative; overflow:hidden;}
.blurImageContainer > .blurImage {position: absolute; top:0; left:0; z-index:1;}
.blurImageContainer > [id^="blurred"] {position: absolute; top:0; left:0; z-index:0;}

Live Example
http://finom.ho.ua/blur/

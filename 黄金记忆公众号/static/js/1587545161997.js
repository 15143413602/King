
$(document).ready(function(){ 
	if(!Modernizr.csstransitions){
		$("#content").delay(500).animate({right:"-10px", opacity: "0.8"},3000,"easeInOutQuad");
	} 
	$('.fsb-slider').fsbslider({"animation_time":15,"animation_type":"randomslide","pattern":false}); 
});																							

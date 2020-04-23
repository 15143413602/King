
jQuery(document).ready(function(){});
 	$(function(){
		window.waitForLoading?window.setTimeout(function(){main()},250):main();
		setTimeout(function(){

		$(".phoneBottomBar").find(".button").eq(2).trigger("click");
		//$(".phoneBottomBar").find(".button").eq(3).trigger("click");
		},600);
	});

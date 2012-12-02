// FAQ 
$('.question_wrapper').click(function(){
	$(this).next().toggle();
	$('.item_arrow',this).toggleClass('item_arrow_active');
	setTimeout(function () {
		myScroll.refresh();
	}, 0);
});
// END FAQ


// OTHER SCROLLERS
var myScroll;
function loaded() { myScroll = new iScroll('wrapper'); }
document.addEventListener('DOMContentLoaded', loaded, false);
// END OTHER SCROLLERS


$('.tab').bind('touchstart',function(){
	$('.tab_active').removeClass('tab_active');
	$('#camera_tab').removeClass('pic_tab_active');
	$(this).addClass('tab_active');
});


$(document).ready(function(){

	

	

	
});
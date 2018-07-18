$(document).ready(function() {
	$(window).scroll(function () {
		if($(window).scrollTop()=="0") {
		  $("#TOP").fadeOut("slow")
		}else {
		  $("#TOP").fadeIn("slow")
		}
	});
}); 
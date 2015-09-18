$(document).ready(function () {

	// var ww = $( window ).width();
	// var wh = $( window ).height();

	var w = $( window ).width();
	var ww = 920;
	var hh = 690;
	var nww;
	var nhh;
	var videoPadding = 35;

	if (w<768) {
		nww = (w)-20;
		nhh = (hh*nww)/ww;
	}else{
		nww = ww;
		nhh = hh;
	}

	var embed='<iframe width="'+(nww)+'" height="'+(nhh-videoPadding)+'" src="//www.youtube.com/embed/qcIfWCFiDqk?rel=0&autoplay=1" frameborder="0" allowfullscreen>';

	$('.btn_video_home').on('click', function(){
		$('.video_home_content').append(embed);
	})

	$('#videomodal .close').on('click', function(){
		$('.video_home_content').html(" ");
	})


	
});








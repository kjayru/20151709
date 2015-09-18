(function(){
	angular.module('app')
		.controller('PageController',

			['$scope','$http','$timeout',
			function($scope,$http,$timeout){

				console.log("page PageController ready");


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


				$('.btn_canje').on('click', function(){
					console.log("go");
					TweenMax.to($('.btn_canje'),0.3,{
						left:"-=100px",
						autoAlpha:0
					});
					TweenMax.to($('.wrap_subnav_option'),0.3,{
						left:"0px",
						autoAlpha:1
					});

				})
				$('.back_subnav').on('click', function(){
					console.log("back");
					console.log("go");
					TweenMax.to($('.btn_canje'),0.3,{
						left:"60px",
						autoAlpha:1
					});
					TweenMax.to($('.wrap_subnav_option'),0.3,{
						left:"150px",
						autoAlpha:0
					});

				})


		}]);


})();

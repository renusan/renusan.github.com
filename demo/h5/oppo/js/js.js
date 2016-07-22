
var arrBgc = ['#F0CDC7','#F5F5F5','#FFF6EF'];
// var i=0;

// function jummper(){
//    $(".banner .img-cont").eq(i).find(".slider").css("width","0px");
//    $(".banner .img-cont").eq(i).find("img").stop().animate({opacity:"1"},1500,function(){
// 		$(".banner .img-cont").eq(i).find(".slider").stop().animate({width:"1180px"},7000,function(){
// 			$(".banner .img-cont").eq(i+1).css({
// 				"background-color": arrBgc[i+1]
// 			});
// 			$(".banner .img-cont").eq(i+1).find("li").removeClass('active');
// 			$(".banner .img-cont").eq(i+1).find("li").eq(i+1).addClass('active');
// 			$(".banner .img-cont").eq(i).find("img").stop().animate({opacity:"0"},500,function(){
// 				i++;
// 				if(i>2)
// 				i=0;
// 				$(".banner .img-cont").eq(i).fadeIn(100).siblings().fadeOut(100);
// 			});
// 		});
//    });
// }
$(function(){
	/////////////
	// banner //
	/////////////
	(function(){
		var oBanner = $('.main .banner');
		var aImgCont = oBanner.find('.img-cont');
		var oSlider = $('.slider-cont .slider');
		var num = 0;
		aImgCont.each(function(){
			var oNav = $(this).find('.nav');
			var aBtn = oNav.find('li');
			$(this).find('img').css('opacity','0');
			aImgCont.eq(0).find('img').stop().animate({
					'opacity': '1'
				},1000);
			aBtn.click(function(){
				aBtn.removeClass('active');
				aImgCont.addClass('hide');
				num = $(this).index();
				aImgCont.eq(num).removeClass('hide');
				aImgCont.eq(num).find('li').removeClass('active');
				aImgCont.eq(num).find('li').eq(num).addClass('active');
				aImgCont.eq(num).css({
					'background-color': arrBgc[num]
				})
				aImgCont.find('img').stop().animate({
					'opacity': '0'
				},1000)
				aImgCont.eq(num).find('img').stop().animate({
					'opacity': '1'
				},1000)
				oSlider.stop().animate({
					'left': num * 390 + 76 + 'px'
				},300)
			})
			aBtn.hover(
				function(){
					$(this).addClass('active');

				},
				function(){
					$(this).removeClass('active');
					aBtn.eq(num).addClass('active');
				}
				)
		})
	})();
	///////////
	// news //
	///////////
	(function(){
		var aBtn = $('.oppo-world .right .title li');
		var aCont = $('.oppo-world .right ul');
		aBtn.click(function(){
			aBtn.removeClass('active');
			aCont.eq(1).addClass('hide');
			aCont.eq(2).addClass('hide');
			$(this).addClass('active');
			aCont.eq( $(this).index() + 1 ).removeClass('hide');
		})
	})();
	/////////
	// 轮播 //
	/////////
	
	// (function(){
	// 		jummper();
	// 	   setInterval("jummper()",9100);
	// })();
})
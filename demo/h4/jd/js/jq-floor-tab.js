/**
 * floor tab
 * @authors Your Name (you@example.org)
 * @date    2016-04-13 02:21:07
 * @version $Id$
 */
//start	floor-nav 函数
function floorNav(floors){
	// 取消楼层导航tab最后一个li的背景图
	fnBgImgNone(floors + ' .floor-nav-tab>ul>li>a:last');
	// 楼层导航tab的hover事件
	(function(a){
		var aTabLi = $(a + ' .floor-nav-tab>ul>li');
		var aTabBtn = $(a + ' .floor-nav-tab>ul>li>a');
		var aTabCont = $(a + ' .floor-content .floor-cont-tab');

		aTabLi.mouseover(
			function(){
				aTabBtn.removeClass('active bgi-none');
				aTabCont.addClass('hide');
				$(this).find('a').addClass('active');
				aTabCont.eq($(this).index()).removeClass('hide');
				aTabBtn.eq( $(this).index()-1 ).addClass('bgi-none');
			})
	})(floors);
	// 设置第一个和最后一个li的边框
	(function(b){
		$(b + ' .floor-nav-tab>ul>li>a:last').css('border-right','1px solid  #EDEDED');
		$(b + ' .floor-nav-tab>ul>li>a:first').css('border-left','1px solid  #EDEDED');
	})(floors);
};
//end	floor-nav 函数

//start		定义楼层里面的轮播图函数	 
function floorTabImg(floors){
	var aImgCont = $(floors + ' .slider');
	var num = 0;
	aImgCont.each(function(){
		var oUl = $(this).find('.slider-main');
		var aBtnNav = $(this).find('.slider-nav li');
		var aBtnPage = $(this).find('.slider-page li');

		aBtnNav.click(function(){
			num = $(this).index() * aImgCont.width();
			aBtnNav.removeClass('active');
			$(this).addClass('active');
			oUl.stop().animate({
				'left': -num + 'px'
			},300);
			num = $(this).index();
		});
		aBtnPage.eq(0).click(function(){
			if(num > 0){
				num--;
			}else{
				num = aBtnNav.length - 1;
			}
			aBtnNav.removeClass('active');
			aBtnNav.eq(num).addClass('active');
			oUl.stop().animate({
				'left': - num*aImgCont.width() + 'px'
			},300);
		})
		aBtnPage.eq(1).click(function(){
			if(num < aBtnNav.length - 1){
				num++;
			}else{
				num = 0;
			}
			aBtnNav.removeClass('active');
			aBtnNav.eq(num).addClass('active');
			oUl.stop().animate({
				'left': - num*aImgCont.width() + 'px'
			},300);
		})
	})
};
//end		定义楼层里面的轮播图函数	

// 设置各楼side>ul.themes>li>i.icon 的背景图
function setFloorsSideBg(floors){
	$(floors + ' .floor-cont-tab .side ul.themes li').each(function(){
		$(this).find('i.icon').css({
			'background-position': '0px ' + -$(this).find('i.icon').height() * $(this).index() +'px',
		})
	})
};

$(function(){
	// 调用选项卡函数，1楼是用原生js写的，所以这里从2楼开始
	// 获取楼层数组，将各楼层class传参给函数floorNav并调用
	(function(){
		var aFloors = $('.floors');
		var i = 1;
		$.each(aFloors,function(){
			i++;
			floorNav('.floor-' + i);
			floorTabImg('.floor-' + i);
			setFloorsSideBg('.floor-' + i);
		})
	})();

	// floorTabImg('.floor-2');
	// floorTabImg('.floor-6');
	// setFloorsSideBg('.floor-2');
	// setFloorsSideBg('.floor-6'); 
});

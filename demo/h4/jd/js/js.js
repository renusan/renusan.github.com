/*	@date    2016-04-07 18:25:50	*/

// top选城市的函数
function toCity(){
	var oCity = document.getElementById('to-city');
	var oCityList = oCity.getElementsByTagName('div')[2];
	var oAdr = oCity.getElementsByTagName('span')[0];
	var aCity = oCity.getElementsByTagName('a');
	// 显示隐藏子菜单
	oCity.onmouseover = function() {
		this.className = 'rel active';
		oCityList.className = 'sub-menu abs';
	}
	oCity.onmouseout = function() {
		this.className = 'rel';
		oCityList.className = 'sub-menu abs hide';
	}
	// 选城市
	for(var i = 0; i < aCity.length; i++){
		aCity[i].onclick = function() {
			oAdr.innerHTML = this.innerHTML;
			for(var k = 0; k < aCity.length; k++){
				aCity[k].className = '';
			}
			this.className = 'active';
		}
	}
};
// top右边的子菜单
function showSubmenu() {
	var aLiHv = document.getElementsByClassName('hv-submenu');
	var aDivSub = document.getElementsByClassName('submenu');

	for(var i = 0; i < aLiHv.length; i++){
		aLiHv[i].index = i;
		aLiHv[i].onmouseover = function() {
			for(var k = 0; k < aDivSub.length; k++){
				aDivSub[k].className = 'submenu hide';
			}
			this.className = 'hv-submenu active';
			aDivSub[this.index].className = 'submenu';
		}
		aLiHv[i].onmouseout = function() {
			for(var k = 0; k < aDivSub.length; k++){
				aDivSub[k].className = 'submenu hide';
			}
			this.className = 'hv-submenu';
		}
	}
};
// 购物车
function showCartBox() {
	var oCart = document.getElementById('cart');

	oCart.onmouseover = function() {
		oCart.className = 'cart fl clearfix rel active';
	}
	oCart.onmouseout = function() {
		oCart.className = 'cart fl clearfix rel';
	}
};
// side-menu & side-menu>sub-menu
function showSideMenu() {
	var oSideMenu = document.getElementById('side_menu');
	var aLi = oSideMenu.getElementsByTagName('li');
	var aDiv = oSideMenu.getElementsByTagName('div');

	for(var i = 0; i < aLi.length; i++){
		aLi[i].onmouseover = function() {
			this.className = 'active';
		}
		aLi[i].onmouseout = function() {
			this.className = '';
		}
	}
};
// main-banner 切换图片
function tabBannerImg() {
	var oImgCont = document.getElementById('main_banner_cont');
	var oImg = oImgCont.getElementsByTagName('img')[0];
	var aBtnPrevNext = oImgCont.getElementsByTagName('div');
	var aLiBtn = oImgCont.getElementsByTagName('li');
	var arrImg = ['img/main_banner_img_1.png','img/main_banner_img_2.png','img/main_banner_img_3.png','img/main_banner_img_4.png','img/main_banner_img_5.png','img/main_banner_img_6.png'];
	var num = 0;
	// 清除LI的类名
	function clearClassName() {
		for(var i = 0; i < aLiBtn.length; i++){
			aLiBtn[i].className = '';
		}
	}
	// 切换图片
	function fnTabImg() {
		oImg.src = arrImg[num];
		clearClassName();
		aLiBtn[num].className = 'active';
	}
	// 上一页/下一页
	aBtnPrevNext[0].onclick = function() {
		if(num > 0){
			num--;
		}else{
			num = arrImg.length - 1;
		}
		fnTabImg();
	}
	aBtnPrevNext[1].onclick = function() {
		if(num < arrImg.length - 1){
			num++;
		}else{
			num = 0;
		}
		fnTabImg();
	}
	// 按钮1-6
	for(var i = 0; i <aLiBtn.length; i++){
		aLiBtn[i].index = i;
		aLiBtn[i].onclick = function() {
			clearClassName();
			this.className = 'active';
			num = this.index;
			oImg.src = arrImg[num];
		}
	}
};
// 生活服务的选项卡
function tabLifeService() {
	var oLifeCont = document.getElementById('lift_service');
	var aUl = oLifeCont.getElementsByTagName('ul');
	var aLiBtn = aUl[0].getElementsByTagName('li');
	var aLiBox = aUl[1].getElementsByTagName('li');

	for(var i = 0; i < aLiBtn.length; i++){
		aLiBtn[i].index = i;
		aLiBtn[i].onclick = function() {
			for(var k = 0; k < aLiBtn.length; k++){
				aLiBtn[k].className = '';
				aLiBox[k].className = 'hide';
			}
			this.className = 'active';
			aLiBox[this.index].className = 'active';
		}
	}
};
// 设置 大牌盛宴 背景图
function setBrandBg() {
	var oUl = document.getElementById('brand_list');
	var aLink = oUl.getElementsByTagName('a');
	var num = 0;
	// 第一行
	for(var i = 0; i < aLink.length/3; i++){
		aLink[i].style.backgroundPosition = -num + 'px' + ' 0' ;
		num += 81;
	}
	num = 0;
	// 第二行
	for(var i = aLink.length/3; i <aLink.length/3*2; i++){
		aLink[i].style.backgroundPosition = -num + 'px' + ' -72px' ;
		num += 81;
	}
	num = 0;
	// 第三行
	for(var i = aLink.length/3*2; i <aLink.length; i++){
		aLink[i].style.backgroundPosition = -num + 'px' + ' -144px' ;
		num += 81;
	}
};
// 设置 服装 左侧栏list背景图
function setClothesListBg() {
	var oUl = document.getElementById('clothes-list');
	var aLi = oUl.getElementsByTagName('li');
	var num = 0;
	for(var i = 0; i < aLi.length; i++){
		aLi[i].style.backgroundPosition = '0 ' + num + 'px';
		num -= 26;
	}
};
// 1楼的选项卡 tab_box
function tabFloor1st() {
	var oTabTitleCont = document.getElementById('clothes_tab_title_cont');
	var aBtnTitle = oTabTitleCont.getElementsByTagName('li');
	var aBtnI = oTabTitleCont.getElementsByTagName('i');
	var oTabBoxCont= document.getElementById('clothes_tab_box_cont');
	var aBox = oTabBoxCont.getElementsByClassName('tab_box');

	for(var i = 0; i < aBtnTitle.length; i++){
		aBtnTitle[i].index = i;
		aBtnTitle[i].onmouseover = function() {
			for(var k = 0; k < aBtnTitle.length; k++){
				aBtnTitle[k].className = '';
				aBtnI[k].style.opacity = '1';
				aBox[k].className = 'tab_box clearfix hide';
			}
			this.className = 'active';
			if(this.index > 0){
				aBtnI[this.index - 1].style.opacity = '0';
			}
			aBox[this.index].className = 'tab_box clearfix';
		}
	}
};
// 1楼选项卡盒子里的小轮播图
function tabFloor1stImg() {
	var oTabBoxCont= document.getElementById('clothes_tab_box_cont');
	var aImgCont = oTabBoxCont.getElementsByClassName('box_img_cont');

	// 定义一个有参数的轮播图函数
	function tabImgMulitPage(a){
		var aLi = aImgCont[a].getElementsByTagName('li');
		var oImg = aImgCont[a].getElementsByTagName('img')[0];
		var aBtnPrevNext = aImgCont[a].getElementsByTagName('div');
		var arrImgSrc = ['img/box_item_1_img_1.jpg','img/box_item_1_img_2.png','img/box_item_1_img_3.png','img/box_item_1_img_4.png'];
		var num = 0;
		// 定义切换图片的函数
		function tabImg() {
			oImg.src = arrImgSrc[num];
			for(var i = 0; i < arrImgSrc.length; i++){
				aLi[i].className = '';
			}
			aLi[num].className = 'active';
		}
		// 下面的小圆点按钮
		for(var i = 0; i < aLi.length; i++){
			aLi[i].index = i;
			aLi[i].onclick = function() {
				for(var k = 0; k < aLi.length; k++){
					aLi[k].className = '';
				}
				this.className = 'active';
				num = this.index;
				tabImg();
			}
		}
		// 上一页按钮
		aBtnPrevNext[0].onclick = function() {
			if(num > 0){
				num--;
			}else{
				num = arrImgSrc.length - 1;
			}
			tabImg();
		}
		// 下一页按钮
		aBtnPrevNext[1].onclick = function() {
			if(num < arrImgSrc.length - 1){
				num++;
			}else{
				num = 0;
			}
			tabImg();
		}
		// 小轮播图函数结束
	}
	// 根据选项卡数量用for循环调用轮播图函数
	for(var i = 0; i < aImgCont.length; i++){
		tabImgMulitPage(i);
	}
};
window.onload = function() {
	toCity();
	showSubmenu();
	showCartBox();
	showSideMenu();
	tabBannerImg();
	tabLifeService();
	setBrandBg();
	setClothesListBg();
	// 1楼 切换
	tabFloor1st();
	tabFloor1stImg();
};
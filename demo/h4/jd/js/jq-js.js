/**
 * JQ-js
 * @authors Your Name (you@example.org)
 * @date    2016-04-12 18:36:47
 * @version $Id$
 */
$(function(){
	// 设置floors-bot里的li的背景图
	(function(){
		$('.floors-bot>ul>li').each(function(){
			var num = $(this).index() * $(this).width() + 11;
			$(this).css({
				'background-position': -num + 'px 0px'
			})
		})
	})();
	// 取消floors-bot最后一个li的右边框
	(function(){
		$('.floors-bot').each(function(){
			$(this).find('ul li:last').css({
				'border-right':'none'
			})
		})
	})();
});

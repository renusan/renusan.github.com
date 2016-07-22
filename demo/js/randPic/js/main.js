require.config({
  baseUrl : 'js/modules/',
  paths : {
    zq : 'zQuery',
    jquery : 'jquery-1.7.2',
    tab : 'tabview'
  }
});

require(['jquery','tab'],function($,tab){
  init();

  function init() {
    var iW = $(window).outerWidth();
    var iH = $(window).outerHeight();

    (iW>1200) || (iW=1200);
    $('#banner').height(iH);
    $('#banner .con li').width(iW);
    $('#banner .con').width(iW * $('#banner .con li').size());
  };

  $(window).bind('scroll',function(){
    fnSetNav();
  });
  fnSetNav();
  function fnSetNav() {
    var iT = $(window).scrollTop();
    if (iT>=100) {
      $('#header>.nav').addClass('ac');
      $('#back-top').fadeIn();
    } else {
      $('#header>.nav').removeClass('ac');
      $('#back-top').fadeOut();
    }
  }
  $(window).bind('resize',function(){
    init();
  });

  new tab.TabView({
    wrap : $('#banner')[0],
    nav : $('#banner .nav')[0].getElementsByTagName('li'),
    con : $('#banner .con')[0].getElementsByTagName('li'),
    prevBtn : $('#prev')[0],
    nextBtn : $('#next')[0],
  });

  $('#back-top').click(function(ev){
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function(){
      if ($(window).scrollTop()===0) {
        clearInterval(timer);
        $('#back-top').fadeOut();
      }
      $(window).scrollTop($(window).scrollTop()-100)
    },1000/60);
  });

  $('#back-top').hover(function(){
    $(this).stop().animate({
      opacity : .9,
      filter : 'alpha(opacity=90)'
    })
  },function(){
    $(this).stop().animate({
      opacity : .4,
      filter : 'alpha(opacity=40)'
    })
  });

});
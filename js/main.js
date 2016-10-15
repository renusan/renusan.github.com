require.config({
  baseUrl : './js/modules/',
  shim: {
    easing: ['jquery']
  },
  paths : {
    jquery : 'jquery-1.7.2',
    easing : 'jquery.easing.min',
    zq : 'zQuery',
    tab : 'tabview',
    data : 'data'
  }
});

require(['jquery','tab','data'],function($,tab,data){
  init();

  function init() {
    var iW = $(window).outerWidth();
    var iH = $(window).outerHeight();

    (iW>1200) || (iW=1200);
    $('#banner').height(iH);
    $('#banner .con li').width(iW);
    $('#banner .con').width(iW * $('#banner .con li').size());
  };

  function bindScroll(bs) {
    if(bs){
      $(window).bind('scroll',function(){
        fnSetNav();
      });
    }else{
      $(window).unbind('scroll');
    }
  }
  bindScroll(true);
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
  $(window).bind('resize',init);

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
      $(window).scrollTop($(window).scrollTop()-100);
    },1000/60);
  });

  $('#back-top').hover(function(){
    $(this).stop().animate({
      opacity : .9,
      filter : 'alpha(opacity=90)'
    },700,'easeOutQuint');
  },function(){
    $(this).stop().animate({
      opacity : .4,
      filter : 'alpha(opacity=40)'
    },700,'easeOutQuint');
  });

  // 首页demo模块
  function RandPic(cfg){
    this.caption = cfg.caption;
    this.src = cfg.src;
    this.href = cfg.href;
    this.ele = [];
    this.init();
  };

  RandPic.prototype = {
    init : function(){
      this.create();
    },
    create : function(){
      var oNew = $(
        '<div class="pic-wrap">' + 
          '<div class="pic">' + 
            '<a href="' + this.href + '" target="_blank"><img src="' + this.src + '" alt=""></a>' + 
          '</div>' + 
          '<div class="caption">' + this.caption + '</div>' + 
        '</div>'
      );
      oNew.appendTo('#demo-con');
      this.maxL = $('#demo-con').width()-oNew.width();
      this.maxT = $('#demo-con').height()-oNew.height();
      oNew.css({
        left : this.maxL/2,
        top : this.maxT/2
      });

      var oLi = $('<li><i class="icon-circle"></i></li>'),
          oUl = $('#demo-section .nav ul');
      oLi.appendTo(oUl);
    }
  }

  function rand(n,m){
    return parseInt(Math.random()*(m-n)+n);
  }

  (function(data){
    $(data).each(function(i,e){
      console.log(i)
      if (i>=9) {return};
      new RandPic(this);
    });
    $('#demo-con').html(function(i,o){
      return o+o;
    });

    var aNav = $('#demo-section .nav li'),
        aPic = $('#demo-con .pic-wrap'),
        oNav = $('#demo-section .nav'),
        iNow = 0,
        timer = null;

    fnRandPos();
    function fnRandPos(){
      aPic.each(function(){
        if ($(this).index()<aPic.size()/2) {
          $(this).css({
            width : rand(170,180),
            height : rand(200,210),
            left : rand(0,220),
            top : rand(0,300),
          });
        } else {
          $(this).css({
            width : rand(160,180),
            height : rand(190,210),
            left : rand(690,900),
            top : rand(0,300),
          });
        }

        $(this).css({
          zIndex : rand(1,aPic.size()),
          transform : 'rotate(' + rand(-20,20) + 'deg)'
        });
      });
    }

    aNav.click(function(){
      iNow = $(this).index();
      fnRandPos();
      fnFocus();
    });

    oNav.css({
      width : aNav.size()*24,
      marginLeft : -aNav.size()*24/2
    });

    fnFocus();
    function fnFocus() {
      var n = Math.random().toFixed(2)>.5 ? iNow : iNow+aNav.size();
      aNav.removeClass('ac').html('<i class="icon-circle"></i>');
      aNav.eq(iNow).addClass('ac').html('<i class="icon-reply"></i>');
      aPic.find('img').removeClass('ac');
      aPic.eq(n).css({
        width : 230,
        height : 260,
        left : 425,
        top : 120,
        zIndex : aPic.size()+1,
        transform : 'rotate(0deg)'
      }).find('img').addClass('ac');
    }

    autoTab(true);
    function autoTab(b) {
      if (b) {
        clearInterval(timer);
        timer = setInterval(function(){
          iNow ++;
          iNow %= aNav.size();
          fnRandPos();
          fnFocus();
        },2400);
      } else {
        clearInterval(timer);
      }
    };

    $('#demo-section').hover(function(){
      autoTab(false);
    },function(){
      autoTab(true);
    });

    $('#demo-section').bind('mousedown',function(ev){
      ev.preventDefault && ev.preventDefault();
    });
  })(data.opusData);

  // 开始做 子页
  (function(){
    $('.cont').hide();
    // TODO: ...
    $('.content-home').show();
    // $('#banner').hide();
    // $('.content-project').show();
    $('#header .wrap').find('li').each(function(){
      this.dataset.name = this.children[0].innerHTML.toLowerCase();
      $(this).click(function(){
        if (this.dataset.name === 'home') {
          $('#banner').show();
          bindScroll(true);
          $('#header .nav').removeClass('ac');
        } else {
          $('#banner').hide();
          bindScroll(false);
          $('#header .nav').addClass('ac');
        }
        $('.cont').hide();
        $('.cont.content-' + this.dataset.name + '').show();
      });
    });
  })(); //导航栏切换子页显示/隐藏

  (function (data) {
    $(data).each(function(){
      var oLi = $(
      '<li>' +
        '<a href="' + this.href + '" target="_blank">' +
          '<div class="img-c">' +
            '<img src="' + this.src + '" alt="">' +
            '<div class="mask"><i class="icon-link"></i></div>' +
          '</div>' +
          '<p>' + this.caption + '</p>' +
        '</a>' +
      '</li>'
      );
      oLi[0].dataset.type = this.type;
      $(oLi).appendTo('#demo-group');
    });
  })(data.opusData); //创建demo组li

  (function(){
    function tgLi(sType){
      // $('#demo-group li[data-type="'+sType+'"]').addClass('hd').bind('transitionend',function(){$(this).unbind('transitionend').addClass('nw')});

      $('#demo-group li').each(function(){
        if (this.dataset.type==sType) {
          // $(this).unbind('transitionend').removeClass('hd nw');
          $(this).removeClass('nw');
          return true;
        };
        // $(this).addClass('hd').bind('transitionend',function(){$(this).unbind('transitionend').addClass('nw')});
        $(this).addClass('nw');
      });
    }
    function tgLi(sType){
      if (sType==='all') {
        $('#demo-group li').removeClass('nw');
        return;
      }
      $('#demo-group li').addClass('nw');
      $('#demo-group li[data-type="'+ sType +'"]').removeClass('nw');
    }

    $('.content-project nav ul').bind('click',function(ev){
      $(this).find('li').removeClass('ac');
      $(ev.target).addClass('ac');
      switch (ev.target.dataset.type) {
        case 'h4':
          tgLi('h4');
        break;
        case 'js':
          tgLi('js');
        break;
        case 'h5':
          tgLi('h5');
        break;
        default :
          tgLi('all');
        break;
      }
    });
  })();
});
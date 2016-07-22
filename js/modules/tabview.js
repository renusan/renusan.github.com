define(['jquery','easing'],function($,$easing){
  function extend(){
    var results = new Object();
    for (var i = 0; i < arguments.length; i++) {
      if (!arguments[i]) {continue}
      for (var name in arguments[i]) {
        results[name] = arguments[i][name]
      }
    }
    return results;
  }

  function TabView(cfg){
    cfg = cfg || {};
    this.wrap = cfg.wrap;
    this.nav = cfg.nav;
    this.con = cfg.con;
    this.prevBtn = cfg.prevBtn;
    this.nextBtn = cfg.nextBtn;
    this.iNow = 0;
    this.timer = null;
    this.toggle = true;
    this.hasAutoTab = cfg.hasAutoTab===undefined ? true : false;
    this.hasPrevNextBtn = cfg.hasPrevNextBtn===undefined ? true : false;
    this.init();
  }

  TabView.prototype = {
    init : function(){
      this.tab();
      this.click();
      if (this.hasAutoTab) {
        this.hover();
        this.autotab();
      };
    },
    click : function(){
      for (var i = 0; i < this.nav.length; i++) {
        (function (_this,index){
          _this.nav[index].onclick = function(){
            _this.iNow = index;
            console.log(index);
            _this.tab();
          }
        })(this,i);
      }
      if (this.hasPrevNextBtn) {
        (function(_this){
          _this.prevBtn.onclick =function(){
            _this.prev();
          }
          _this.nextBtn.onclick =function(){
            _this.next();
          }
        })(this);
      }
    },
    tab : function(){
      for (var i = 0; i < this.nav.length; i++) {
        this.nav[i].className = '';
      }
      this.nav[this.iNow].className = 'ac';
      var l = -this.con[0].offsetWidth * this.iNow;
      var oP = this.con[0].parentNode;
      $(oP).stop().animate({
        left : l
      },700,'easeOutQuint')
    },
    autotab : function(){
     (function (_this){
      if (_this.toggle) {
        clearInterval(_this.timer);
        _this.timer = setInterval(function(){
          _this.next();
        },3000);
      } else {
        clearInterval(_this.timer);
      }
     })(this);
    },
    hover : function(){
      (function (_this){
        _this.wrap.onmouseover = function(){
          _this.toggle = false;
          _this.autotab();
        }
        _this.wrap.onmouseout = function(){
          _this.toggle = true;
          _this.autotab();
        }
      })(this);
    },
    next : function(){
      this.iNow ++;
      this.iNow %= this.nav.length;
      this.tab();
    },
    prev : function(){
      this.iNow --;
      (this.iNow<0) && (this.iNow=this.nav.length-1);
      this.tab();
    }
  }

  return {TabView : TabView};
});
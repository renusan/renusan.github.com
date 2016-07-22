    function $(v,obj) {
      obj = obj || document;
      if (typeof(v) === 'function') {
        if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded',function(){
            v && v();
          },false);
        } else {
          document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
              v && v();
            }
          }
        }
      } else if (typeof(v) === 'string') {
        switch (true) {
          case (v.indexOf('#') !== -1):
          return obj.getElementById(v.substring(1));
          break;

          case (v.indexOf('.') !== -1):
          return getClass(obj,v.substring(1));
          break;

          default:
          return obj.getElementsByTagName(v);
          break;
        }
      }
    };

    function getPos(obj) {
      var l = 0;
      var t = 0;

      while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
      }

      return {left:l,top:t}
    };

    function findDir(obj,ev) {
      var oEvent = ev || event;
      var iST = document.body.scrollTop || document.documentElement.scrollTop;
      var iSL = document.body.scrollLeft || document.documentElement.scrollLeft;
      var l = obj.offsetWidth/2 + getPos(obj).left;
      var t = obj.offsetHeight/2 + getPos(obj).top;
      var x = l - oEvent.clientX - iSL;
      var y = t - oEvent.clientY - iST;
      var dir = Math.round((Math.atan2(y,x)*180 / Math.PI + 180) / 90) % 4;

      return dir;
    }

    function getClass(obj,sClass) {
      if (obj.getElementsByClassName) {
        return obj.getElementsByClassName(sClass);
      } else {
        var aEle = obj.getElementsByTagName('*');
        var arr = [];
        for (var i = 0; i < aEle.length; i++) {
          var tmp = aEle[i].className.split(' ');
          for (var j = 0; j < tmp.length; j++) {
            if (tmp[j] === sClass) {
              arr.push(aEle[i]);
            }
          }
        }
        return arr;
      }
    };
    
    function getStyle(obj,attr) {
      return (obj.currentStyle || getComputedStyle(obj,false))[attr];
    };

    function fnMove(obj,oTarget,options) {
      options = options || {};
      options.time = options.time || 1000;
      options.speed = options.speed || 30;
      options.type = options.type || 'linear';
      clearInterval(obj.timer);

      var iCount = parseInt(options.time/options.speed);
      var start = {};
      var dis = {};

      for (attr in oTarget) {
        start[attr] = parseFloat(getStyle(obj,attr));
        dis[attr] = oTarget[attr] - start[attr];
      }

      var n = 0;
      obj.timer = setInterval(function(){
        n ++;

        for (attr in oTarget) {
          switch (options.type) {
            case 'linear':
            var a = n/iCount;
            var sAttr = start[attr] + dis[attr]*a;
            break;

            case 'ease-in':
            var a = n/iCount;
            var sAttr = start[attr] + dis[attr]*a*a*a;
            break;

            case 'ease-out':
            var a = 1-n/iCount;
            var sAttr = start[attr] + dis[attr]*(1-a*a*a);
            break;
          }

          if (attr === 'opacity') {
            obj.style[attr] = sAttr;
            obj.style.filter = 'alpha(opacity:' + sAttr*100 + ')';
          } else {
            obj.style[attr] = sAttr + 'px';
          }
        }

        if (n === iCount) {
          clearInterval(obj.timer);
          options.end && options.end();
        }
      },options.speed)
    };
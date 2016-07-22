define(function(){
  var requestAnimaFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
      function(callback, element) {
        return window.setTimeout(callback, 1000 / 60);
      };
  })();

  function rand(n, m, int){
    return arguments.length<1 ? Math.random() : int ? parseInt(Math.random()*(m-n)+n) : Math.random()*(m-n)+n;
  }

  function extend(){
    var res = {};
    var arg = arguments;
    for (var i = 0; i < arg.length; i++) {
      for (var name in arg[i]) {
        if (!arg[i]) continue;
        res[name] = arg[i][name];
      }
    }
    return res;
  }

  function lerpAngle(a, b, t){
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
  }

  function lerpDistance(aim, cur, ratio){
    var delta = cur - aim;
    return aim + delta * ratio;
  }

  function calcDis(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
  }

  return {
    requestAnimationFrame: requestAnimationFrame,
    rand: rand,
    extend: extend,
    lerpAngle: lerpAngle,
    lerpDistance: lerpDistance,
    calcDis: calcDis
  };
});
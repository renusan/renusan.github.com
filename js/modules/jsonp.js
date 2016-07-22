define(function(){
  function jsonp(json){
    if (!json.url) return;
    json.data = json.data || {};
    json.cbName = json.cbName || 'cb';

    var oHead = document.getElementsByTagName('head')[0];
    var oSc = document.createElement('script');
    var fnName = json['data'][json.cbName] + new Date().getTime();
    var arr = new Array();

    window[fnName] = function(cbData) {
      json.fnSucc && json.fnSucc(cbData);
      oHead.removeChild(oSc);
    };

    for (var name in json['data']) {
      if (name===json.cbName) {
        arr.push(name+'='+fnName);
        continue;
      }
      arr.push(name+'='+json['data'][name]);
    };

    oSc.src = json.url + '?' + arr.join('&');
    oHead.appendChild(oSc);
  };

  return jsonp;
});
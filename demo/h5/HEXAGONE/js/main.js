/**
 * JavaScript
 * @authors Rus (rusyue@gmail.com)
 * @date    2016-07-11 16:48:44
 * @version 1.0
 */

(function(){
  function change() {
    var iFS = document.documentElement.clientWidth/320*20;
    document.documentElement.style.fontSize = iFS + 'px';
  }
  window.addEventListener('resize',change,false);
  change();
})();


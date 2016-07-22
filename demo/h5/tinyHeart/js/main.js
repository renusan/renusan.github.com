/**
 * tinyHeart
 * @authors rus (rusyue@gmail.com)
 * @date    2016-07-15 10:22:13
 * @version 1.3
 */

require.config({
  baseUrl: './js/modules/',
  paths: {
    common: 'common',
    drawBg: 'background',
    Ane: 'ane',
    Fruit: 'fruit',
    Mom: 'mom',
    Baby: 'baby',
    Data: 'data',
    Effect: 'effect',
    Dust: 'dust',
    coll: 'collision',
  }
});

require(['common','drawBg','Ane','Fruit','Mom','Baby','Data','Effect','Dust','coll'],function(common,drawBg,Ane,Fruit,Mom,Baby,Data,Effect,Dust,coll){
  var canF, canB, ctxF, ctxB, iW, iH;
  var rand, reqAnimate;
  var lastTime, deltaTime;
  var bgPic;
  var oAne, oFruit;
  var oMom, oBaby;
  var babyTail, babyEye, babyBody;
  var momTail, momEye, momBodyOrange, momBodyBlue;
  var mx, my;
  var collMom, collBaby;
  var oData;
  var oWave, oHalo;
  var oDust, dustPic;
  var restart;

  gameStart();

  function gameStart(){
    init();
    lastTime = Date.now();
    deltaTime = 0;
    if (!restart) {
      gameLoop();
    }
  }

  function init(){ // 初始化
    canF = document.querySelector('#canvasFront');
    canB = document.querySelector('#canvasBack');

    ctxF = canF.getContext('2d'); // 前景画布, 绘制: 鱼, 漂浮尘埃, 界面, 碰撞特效
    ctxB = canB.getContext('2d'); // 背景画布, 绘制: 背景, 海葵, 果实

    ctxF.font = '30px Verdana';
    ctxB.font = '20px Verdana';
    ctxF.textAlign = 'center';

    iW = canF.offsetWidth;
    iH = canF.offsetHeight;
    mx = iW * .5;
    my = iH * .5;

    canF.addEventListener('mousemove', fnMouseMove, false);
    canF.addEventListener('touchmove', fnMouseMove, false);
    canF.addEventListener('click', fnClick, false);

    bgPic = new Image();
    bgPic.src = './src/background.jpg';

    oAne = new Ane();
    oAne.init(iH);

    oFruit = new Fruit();
    oFruit.init();

    oMom = new Mom();
    oMom.init(iW, iH);

    oBaby = new Baby();
    oBaby.init(iW, iH);

    babyTail = [];
    momTail = [];
    for (var i = 0; i < 8; i++) {
      babyTail[i] = new Image();
      babyTail[i].src = './src/babyTail' + i + '.png';
      momTail[i] = new Image();
      momTail[i].src = './src/bigTail' + i + '.png';
    }

    babyEye = [];
    momEye = [];
    for (var i = 0; i < 2; i++) {
      babyEye[i] = new Image();
      babyEye[i].src = './src/babyEye' + i + '.png';
      momEye[i] = new Image();
      momEye[i].src = './src/bigEye' + i + '.png';
    }

    babyBody = [];
    for (var i = 0; i < 20; i++) {
      babyBody[i] = new Image();
      babyBody[i].src = './src/babyFade' + i + '.png';
    }

    momBodyOrange = [];
    momBodyBlue = [];
    for (var i = 0; i < 8; i++) {
      momBodyOrange[i] = new Image();
      momBodyBlue[i] = new Image();
      momBodyOrange[i].src = './src/bigSwim' + i + '.png';
      momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
    }

    collMom = coll.collMom;
    collBaby = coll.collBaby;

    oData = new Data();
    oData.bgMusic.volume = .5;
    oData.bgMusic.loop = 'loop';
    oData.bgMusic.play();
    oData.gameoverSound.volume = .5;
    oData.collSound.volume = .4;
    oData.addSound.volume = .2;

    oData.soundCount = 0;

    oWave = new Effect.Wave();
    oWave.init();

    oHalo = new Effect.Halo();
    oHalo.init();

    oDust = new Dust();
    oDust.init(iW, iH);

    dustPic = [];
    for (var i = 0; i < 7; i++) {
      dustPic[i] = new Image();
      dustPic[i].src = './src/dust' + i + '.png';
    }

    rand = common.rand;
    reqAnimate = common.requestAnimationFrame;
  }

  function gameLoop(){ // 循环, 帧动画
    reqAnimate(gameLoop);

    var now = Date.now();
    deltaTime = now - lastTime;
    if (deltaTime>40) deltaTime = 40;
    lastTime = now;

    drawBg(ctxB, bgPic, iW, iH);
    oAne.draw(ctxB, iH, deltaTime);
    oFruit.draw(ctxB, oAne, iH, deltaTime, oData);
    fruitMonitor();

    ctxF.clearRect(0, 0, iW, iH);
    oBaby.draw(ctxF, oMom.x, oMom.y, babyTail, babyBody, babyEye, deltaTime, oData);
    oMom.draw(ctxF, mx, my, momTail, momBodyOrange, momBodyBlue, momEye, deltaTime);

    collMom(oFruit, oMom, oData, oWave);
    collBaby(oMom, oBaby, oData, oHalo);

    oData.draw(ctxF, iW, iH, deltaTime, restart);

    oWave.draw(ctxF, deltaTime);
    oHalo.draw(ctxF, deltaTime);

    oDust.draw(ctxF, dustPic, iH, deltaTime);
  }

  function fruitMonitor(){
    var num = 0;
    for (var i=0; i<oFruit.num; i++) {
      if (oFruit.alive[i]) num ++;
    }
    if (num<oFruit.iMax) {
      sendFruit();
      return;
    }
  }

  function sendFruit(){
    for (var i = 0; i < oFruit.num; i++) {
      if (!oFruit.alive[i]) {
        oFruit.born(i,oAne,iH);
        return;
      }
    }
  }

  function fnMouseMove(ev){
    if (oData.gameover) return;
    if (ev.offSetX || ev.layerX) {
      mx = ev.offSetX == undefined ? ev.layerX : ev.offSetX;
      my = ev.offSetY == undefined ? ev.layerY : ev.offSetY;
    }
  }

  function fnClick(){
    if (!oData.gameover) return;
    restart = true;
    gameStart();
  }

}); // require end
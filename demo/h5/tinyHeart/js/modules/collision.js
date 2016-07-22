define(['common'],function(common){
  var calcDis = common.calcDis;

  function collMom(oF, oM, oData, oWave){
    if (oData.gameover) return;
    for (var i = 0; i < oF.num; i++) {
      if (oF.alive[i]) {
        var dis = calcDis(oF.x[i], oF.y[i], oM.x, oM.y);
        if (dis < 30) {
          oF.eaten(i);
          oM.bodyCount ++;
          oM.bodyType = oF.type[i];
          (oM.bodyCount<=7) || (oM.bodyCount=7);

          oData.fruitNum += oF.scale[i];
          if (oF.type[i] === 'blue') {
            oData.double ++;
          }

          oWave.born(oF.x[i], oF.y[i]);
          oData.collSound.play();
        }
      }
    }
  }

  function collBaby(oM, oB, oData, oHalo){
    if (oData.gameover || !oData.fruitNum) return;
    var dis = calcDis(oM.x, oM.y, oB.x, oB.y);
    if (dis < 30) {
      var iNum = oB.bodyCount - oData.fruitNum * oData.double * 2;
      (iNum>=0) || (iNum=0);
      oB.bodyCount = iNum;
      oM.bodyCount = 0;
      
      oData.addscore();

      oHalo.born(oB.x, oB.y);
      oData.addSound.play();
    }
  }

  return {
    collMom: collMom,
    collBaby: collBaby
  }
});
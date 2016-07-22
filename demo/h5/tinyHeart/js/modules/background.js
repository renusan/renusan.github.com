define (function(){
  function drawBackground(ctx, bgPic, iW, iH){
    ctx.drawImage(bgPic, 0, 0, iW, iH);
  }

  return drawBackground;
 });
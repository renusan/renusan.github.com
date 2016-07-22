define(function(){
  function Data(){
    this.fruitNum = 0;
    this.double = 1;
    this.level = 1;
    this.score = 0;
    this.alpha = 0;
    this.iS = 1;
    this.gameover = false;
    this.suoundConut = 0;
    this.bgMusic = new Audio('./music/bg233.mp3');
    this.collSound = new Audio('./music/bullet.mp3');
    this.addSound = new Audio('./music/addscore.wav');
    this.gameoverSound = new Audio('./music/gameover.ogg');
    this.blueIcon = new Image();
    this.blueIcon.src = './src/blue.png';
    this.fruitIcon = new Image();
    this.fruitIcon.src = './src/fruit.png';
  }

  Data.prototype = {
    reset: function(){
      this.fruitNum = 0;
      this.double = 1;
    },
    addscore: function(){
      this.score += this.fruitNum * 10 * this.double;
      this.reset();
    },
    draw: function(ctx, iW, iH, deltaTime, restart){
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 16;
      ctx.shadowColor = '#fff';
      ctx.fillText('score  ' + this.score, iW * .5, 40);
      ctx.drawImage(this.blueIcon, iW*.5 - 20, iH - 28, 16, 16);
      ctx.drawImage(this.fruitIcon, iW*.5 + 20, iH - 30, 19, 19);

      ctx.save();
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#fff';
      ctx.font = '24px Verdana';
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      ctx.fillText(this.double, iW*.5 - 40, iH - 12);
      ctx.fillText(this.fruitNum*10, iW*.5 + 58, iH - 13);
      ctx.restore();
      
      if (!restart) this.gameover = true;
      if (this.gameover) {
        if (restart) {
          this.bgMusic.pause();
          if (this.suoundConut<1) {
            this.gameoverSound.play();
          }
          this.suoundConut ++;
          this.alpha += deltaTime * .0004;
          (this.alpha<=1) || (this.alpha=1);
          ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
          ctx.fillText('GAME OVER!', iW * .5, iH * .5 - 10);
          ctx.fillText('Click To Restart!', iW * .5, iH * .5 + 34);
        } else {
          this.bgMusic.pause();

          this.alpha +=  deltaTime * .0004 * this.iS;

          if (this.alpha>=1 || this.alpha<=0) {
            this.iS *= -1;
          }

          ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')';
          ctx.fillText('Click To Start!', iW * .5, iH * .5 + 124);
        }
      }
      ctx.restore();
    }
  }

  return Data;
});
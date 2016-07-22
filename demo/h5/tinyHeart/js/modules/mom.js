define(['common'], function(common){
  var rand = common.rand;
  var lerpAngle = common.lerpAngle;
  var lerpDistance = common.lerpDistance;

  function Mom(){
    this.x;
    this.y;
    this.angle;

    this.tailTimer;
    this.tailCount;
    this.tailDelay;

    this.bodyCount;
    this.bodyType;

    this.eyeTimer;
    this.eyeCount;
    this.eyeDelay;
  }

  Mom.prototype = {
    init: function(iW, iH){
      this.x = iW * .5;
      this.y = iH * .5;
      this.angle = 0;

      this.tailTimer = 0;
      this.tailCount = 0;
      this.tailDelay = 50;

      this.bodyCount = 0;
      this.bodyType = 'orange';

      this.eyeTimer = 0;
      this.eyeCount = 0;
      this.eyeDelay = 1000;
    },
    draw: function(ctx, mx, my, momTail, momBodyOrange, momBodyBlue, momEye, deltaTime){
      this.x = lerpDistance(mx, this.x, .97);
      this.y = lerpDistance(my, this.y, .98);

      var beta = Math.atan2(my-this.y, mx-this.x) + Math.PI;
      this.angle = lerpAngle(beta, this.angle, .8);

      this.tailTimer += deltaTime;
      if (this.tailTimer > this.tailDelay) {
        this.tailCount = (this.tailCount + 1) % 8;
        this.tailTimer %= this.tailDelay;
      }

      this.eyeTimer += deltaTime;
      if (this.eyeTimer > this.eyeDelay) {
        this.eyeCount = (this.eyeCount + 1) % 2;
        this.eyeTimer %= this.eyeDelay;
        if (this.eyeCount == 0) {
          this.eyeDelay = rand(1400, 3000);
        } else {
          this.eyeDelay = 130;
        }
      }

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(momTail[this.tailCount], -momTail[this.tailCount].width * -.4, -momTail[this.tailCount].height*.5);

      if (this.bodyType==='blue') {
        ctx.drawImage(momBodyBlue[this.bodyCount], -momBodyBlue[this.bodyCount].width * .5, -momBodyBlue[this.bodyCount].height*.5);
      } else {
        ctx.drawImage(momBodyOrange[this.bodyCount], -momBodyOrange[this.bodyCount].width * .5, -momBodyOrange[this.bodyCount].height*.5);
      }
      
      ctx.drawImage(momEye[this.eyeCount], -momEye[this.eyeCount].width * 0.8, -momEye[this.eyeCount].height*.5);
      ctx.restore();
    }
  }

  return Mom;
});
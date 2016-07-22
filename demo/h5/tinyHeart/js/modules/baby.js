define(['common'], function(common){
  var rand = common.rand;
  var lerpAngle = common.lerpAngle;
  var lerpDistance = common.lerpDistance;

  function Baby(){
    this.x;
    this.y;
    this.angle;

    this.tailTimer;
    this.tailCount;
    this.tailDelay;

    this.eyeTimer;
    this.eyeCount;
    this.eyeDelay;

    this.bodyTimer;
    this.bodyCount;
    this.bodyDelay;
  }

  Baby.prototype = {
    init: function(iW, iH){
      this.x = iW * .5 + 50;
      this.y = iH * .5 + 50;
      this.angle = 0;

      this.tailTimer = 0;
      this.tailCount = 0;
      this.tailDelay = 50;

      this.eyeTimer = 0;
      this.eyeCount = 0;
      this.eyeDelay = 1000;

      this.bodyTimer = 0;
      this.bodyCount = 0;
      this.bodyDelay = 300;
    },
    draw: function(ctx, mx, my, babyTail, babyBody, babyEye, deltaTime, oData){
      this.x = lerpDistance(mx, this.x, .98);
      this.y = lerpDistance(my, this.y, .99);

      var beta = Math.atan2(my-this.y, mx-this.x) + Math.PI;
      this.angle = lerpAngle(beta, this.angle, .94);

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

      this.bodyTimer += deltaTime;
      this.bodyDelay = 300 - (oData.level*10);
      if (this.bodyTimer > this.bodyDelay) {
        this.bodyCount = this.bodyCount + 1;
        this.bodyTimer %= this.bodyDelay;
        if (this.bodyCount > 19) {
          this.bodyCount = 19;
          // GAME OVER
          oData.gameover = true;
        }
      }


      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(babyTail[this.tailCount], -babyTail[this.tailCount].width * -.4, -babyTail[this.tailCount].height*.5);
      ctx.drawImage(babyBody[this.bodyCount], -babyBody[this.bodyCount].width * .5, -babyBody[this.bodyCount].height*.5);
      ctx.drawImage(babyEye[this.eyeCount], -babyEye[this.eyeCount].width * 0.8, -babyEye[this.eyeCount].height*.5);
      ctx.restore();
    }
  }

  return Baby;
});
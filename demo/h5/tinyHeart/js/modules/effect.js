define(['common'], function(common){
  function Wave(){
    this.x = [];
    this.y = [];
    this.r = [];
    this.alive = [];
  }

  Wave.prototype = {
    num: 10,
    init: function(){
      for (var i = 0; i < this.num; i++) {
        this.x[i] = i;
        this.y[i] = i;
        this.r[i] = i;
        this.alive[i] = false;
      }
    },
    born: function(x, y){
      for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
          this.alive[i] = true;
          this.r[i] = common.rand(4,20);
          this.x[i] = x;
          this.y[i] = y;
          return;
        }
      }
    },
    draw: function(ctx, deltaTime){
      ctx.save();
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#fff';
      ctx.lineWidth = 2;
      for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
          this.r[i] += deltaTime * .048;
          if (this.r[i]>40) this.alive[i] = false;
          var alpha = 1 - this.r[i] / 40;
          if (alpha <= 0) {
            alpha = 0;
            this.alive[i] = false;
          }
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
          ctx.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  function Halo(){
    this.x = [];
    this.y = [];
    this.r = [];
    this.alive = [];
  }

  Halo.prototype = {
    num: 3,
    init: function(){
      for (var i = 0; i < this.num; i++) {
        this.x[i] = i;
        this.y[i] = i;
        this.r[i] = i;
        this.alive[i] = false;
      }
    },
    born: function(x, y){
      for (var i = 0; i < this.num; i++) {
        if (!this.alive[i]) {
          this.alive[i] = true;
          this.r[i] = common.rand(14,30);
          this.x[i] = x;
          this.y[i] = y;
          return;
        }
      }
    },
    draw: function(ctx, deltaTime){
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ed5736';
      ctx.lineWidth = 4;
      for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
          this.r[i] += deltaTime * .088;
          if (this.r[i]>100) this.alive[i] = false;
          var alpha = 1 - this.r[i] / 100;
          if (alpha <= 0) {
            alpha = 0;
            this.alive[i] = false;
          }
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(213,140,50,' + alpha + ')';
          ctx.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  }

  return {
    Wave: Wave,
    Halo: Halo
  };
});
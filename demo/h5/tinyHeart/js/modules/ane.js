define(['common'], function(common){
  var rand = common.rand;

  function Ane(){
    this.width = [];
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
  }

  Ane.prototype = {
    num: 50,
    init: function(iH){
      for (var i=0; i<this.num; i++) {
        this.width[i] = rand(8,20,true);
        this.rootx[i] = i * 16 + this.width[i];
        this.headx[i] = this.rootx[i];
        this.heady[i] = iH - (200 + rand() * 80);
        this.alpha[i] = rand(1,10);
        this.amp[i] = (0,29);
      }
    },
    draw: function(ctx, iH, deltaTime){
      ctx.save();
      ctx.strokeStyle = '#8d4256';
      ctx.globalAlpha = .6;
      ctx.lineCap = 'round';

      this.alpha += deltaTime * .001;
      var l = Math.sin(this.alpha);

      for (var i=0; i<this.num; i++) {
        ctx.beginPath();
        ctx.lineWidth = this.width[i];
        ctx.moveTo(this.rootx[i], iH);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx.quadraticCurveTo(this.rootx[i], iH - 50, this.headx[i], this.heady[i]);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  return Ane;
});
define(['common'],function(common){
  var rand = common.rand;

  function Dust(){
    this.x = [];
    this.y = [];
    this.sy = [];
    this.amp = [];
    this.NO = [];
    this.alpha;
  }

  Dust.prototype = {
    num: 40,
    init: function(iW, iH){
      for (var i = 0; i < this.num; i++) {
        this.x[i] = rand(0, iW);
        this.y[i] = rand(0, iH);
        this.sy[i] = rand(-8, 8);
        this.amp[i] = rand(1, 30);
        this.NO[i] = rand(0, 6, true);
      }
      this.alpha = 0;
    },
    draw: function(ctx, pic, iH, deltaTime){
      this.alpha += deltaTime * .001;
      var l = Math.sin(this.alpha);
      for (var i = 0; i < this.num; i++) {
        var Pic = pic[this.NO[i]];
        this.y[i] += this.sy[i]/40;
        if (this.y[i]>iH) {
          this.y[i]=0;
        }
        if (this.y[i]<0) {
          this.y[i]=iH;
        }
        ctx.drawImage(Pic, this.x[i] + l * this.amp[i], this.y[i], Pic.width, Pic.height);
      }
    }
  }

  return Dust;
});
define(['common'], function(common){
  var rand = common.rand;

  function Fruit(){
    this.alive = [];
    this.x = [];
    this.y = [];
    this.l = [];
    this.opa = [];
    this.spd = [];
    this.size = [];
    this.type = [];
    this.aneId = [];
    this.scale = [];
    this.blue = new Image();
    this.orange = new Image();
    this.v;
    this.timer;
    this.level;
    this.delay;
    this.iMax;
  }

  Fruit.prototype = {
    num: 30, 
    init: function(){ 
      for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.opa[i] = 0;
        this.size[i] = rand(1, 140);
        this.type[i] = 'orange';
      }
      this.orange.src = './src/fruit.png';
      this.blue.src = './src/blue.png';
      this.v = .03;
      this.timer = 0;
      this.level = 1;
      this.delay = 6000;
      this.iMax = 15;
    },
    born: function(i,oAne,iH){ 
      this.aneId[i] = rand(0, oAne.num, true); 
      this.x[i] = oAne.headx[this.aneId[i]];
      this.y[i] = oAne.heady[this.aneId[i]];
      this.size[i] = rand(1, 14); 
      this.type[i] = this.size[i] < 4 ? 'blue' : 'orange'; 
      this.l[i] = 0; 
      this.spd[i] = rand(.002, .008); 
      this.opa[i] = rand(.5, .8); 
      this.alive[i] = true; 
      this.scale[i] = 1;
    },
    draw: function(ctx, oAne, iH, deltaTime, oData){
      if (this.level < 13 && !oData.gameover) {
        this.timer += deltaTime;
        if (this.timer > this.delay) {
          this.level ++;
          oData.level = this.level;
          this.v += .02;
          this.iMax -= .9;
          this.timer %= this.delay;
          this.delay -= 300; // 提升难度, 最好弄到Data模块去
        }
      }
      
      ctx.save();
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#fff';
      ctx.fillStyle = 'rgba(255,255,255,.7)';
      ctx.fillText('Level: ' + this.level, 14, 30);
      ctx.restore();

      ctx.save();
      for (var i=0; i<this.num; i++) {

        if (this.alive[i]) { 
          if (this.l[i] <= this.size[i]) { 
            this.l[i] += this.spd[i] * deltaTime;

            this.x[i] = oAne.headx[this.aneId[i]];
            this.y[i] = oAne.heady[this.aneId[i]];
          } else { 
            this.y[i] -= Math.abs(1-this.size[i]/100) * this.v * deltaTime; 
            if (this.y[i]<10) this.alive[i] = false;
            this.scale[i] = 2;
          }

          ctx.globalAlpha = this.opa[i]; 

          ctx.drawImage(this[this.type[i]], this.x[i] - this[this.type[i]].width/2 * .5 - this.l[i], this.y[i] - this[this.type[i]].height * .5 - this.l[i], this[this.type[i]].width/2 + this.l[i], this[this.type[i]].height/2 + this.l[i]);
        }
      }

      ctx.restore();   
    },
    eaten: function(i){
      this.alive[i] = false;
    }

  }

  return Fruit;
});
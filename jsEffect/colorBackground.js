// 颜色集合
// const COLORS = [
//     { r: 102, g: 112, b: 255 },  // 浅蓝色
//     { r: 212, g: 218, b: 244 },   // 淡紫色
//     { r: 210, g: 127, b: 255 },  // 淡紫色
//     { r: 51, g: 184, b: 255 },   // 浅蓝色
//     { r: 254, g: 215, b: 216 },  // 粉
//   ]

  const COLORS = [
    { r: 0, g: 10, b: 148 },  // 浅蓝色
    { r: 64, g: 0, b: 148 },   // 淡紫色
    { r: 111, g: 0, b: 148 },  // 淡紫色
    { r: 148, g: 0, b: 76 },   // 浅蓝色
    { r: 148, g: 96, b: 0 },  // 粉
  ]

  class App {
    constructor() {
      // 获取id为intro的canvas元素
      this.canvas = document.getElementById("introBack");
      if (!this.canvas) return; // 如果没有找到canvas元素则退出

      this.ctx = this.canvas.getContext("2d");
  
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
      // 色块球的数量
      this.totalParticles = 15;
      this.particles = [];
      // 最大半径与最小半径
      this.maxRadius = 200;
      this.minRadius = 150;
  
      window.addEventListener("resize", this.resize.bind(this), false);
      this.resize();
      this.animate();
    }
  
    // 重置画布大小
    resize() {
      const heroSection = document.getElementById('heroSection');
      this.stageWidth = heroSection.clientWidth;
      this.stageHeight = heroSection.clientHeight;
      console.log(this.stageWidth, this.stageHeight)

        // this.stageWidth = window.innerWidth;
        // this.stageHeight = window.innerHeight;
      
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
      
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight); // 填充整個畫布
      
        this.ctx.globalCompositeOperation = "saturation";
        this.createParticles();
      }
      
    // 创建色块球
    createParticles() {
      let curColor = 0;
      this.particles = [];
      for (let i = 0; i < this.totalParticles; i++) {
        this.particles.push(
          new GlowParticle(
            Math.random() * this.stageWidth,
            Math.random() * this.stageHeight,
            Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
            COLORS[curColor % COLORS.length]
          )
        );
        curColor++;
      }
    }
  
    animate() {
      window.requestAnimationFrame(this.animate.bind(this));
      // 清除画布内容
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
      for (let i = 0; i < this.totalParticles; i++) {
        const item = this.particles[i];
        item.animate(this.ctx, this.stageWidth, this.stageHeight);
      }
    }
  }
  
  window.onload = () => {
    new App();
  };
  
  const PI2 = Math.PI * 2;
  // 运动速度
  const speed = 2;
  
  // 色块对象
  class GlowParticle {
    constructor(x, y, radius, rgb) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.rgb = rgb;
  
      // 随机运动速度
      this.vx = Math.random() * speed;
      this.vy = Math.random() * speed;
      this.sinValue = Math.random();
    }
  
    animate(ctx, stageWidth, stageHeight) {
      this.sinValue += 0.01;
      this.radius += Math.sin(this.sinValue);
      this.x += this.vx;
      this.y += this.vy;
  
      // 超出边界
      if (this.x < -10) {
        this.vx *= -1;
      } else if (this.x > stageWidth + 10) {
        this.vx *= -1;
      }
      if (this.y < -10) {
        this.vy *= -1;
      } else if (this.y > stageHeight + 10) {
        this.vy *= -1;
      }
  
      // 绘图
      ctx.beginPath();
      const g = ctx.createRadialGradient(this.x, this.y, this.radius * 0.01, this.x, this.y, this.radius);
      g.addColorStop(0, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},1)`);
      g.addColorStop(1, `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},0)`);
      ctx.fillStyle = g;
      ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
      ctx.fill();
    }
  }
  
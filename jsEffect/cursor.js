const cursor = document.querySelector('.custom-cursor');
const core = document.querySelector('.cursor-core');
const ringMid = document.querySelector('.cursor-ring--mid');
const ringOuter = document.querySelector('.cursor-ring--outer');
const hoverTargets = document.querySelectorAll(
  'a, button, input, textarea, select, label, .hoverable'
);

let mouseX = 0;
let mouseY = 0;

const followers = [
  { el: ringOuter, x: 0, y: 0, ease: 0.06 },
  { el: ringMid, x: 0, y: 0, ease: 0.1 },
  { el: core, x: 0, y: 0, ease: 0.16 },
];

// 取得滑鼠位置
if (cursor && core && ringMid && ringOuter) {
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}

// 平滑延遲移動（約 0.5 秒拖尾）
function animate() {
  followers.forEach((item) => {
    if (!item.el) return;
    item.x += (mouseX - item.x) * item.ease;
    item.y += (mouseY - item.y) * item.ease;
    item.el.style.left = item.x + 'px';
    item.el.style.top = item.y + 'px';
  });

  requestAnimationFrame(animate);
}

animate();

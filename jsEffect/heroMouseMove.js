var rect = $('.heroBackgroundCircle')[0].getBoundingClientRect();
var mouse = {x: 0, y: 0, moved: false};

$(".heroBackgroundCircle").mousemove(function(e) {
  mouse.moved = true;
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
 
// Ticker event will be called on every frame
gsap.ticker.add(function(){
  if (mouse.moved){    
    parallaxIt(".circleOne", -100);
    parallaxIt(".circleTwo", -30);
    parallaxIt(".circleImg", -50);
  }
  mouse.moved = false;
});

function parallaxIt(target, movement) {
  gsap.to(target, {
    duration: 0.3,
    x: (mouse.x - rect.width / 2) / rect.width * movement,
    y: (mouse.y - rect.height / 2) / rect.height * movement
  });
}

$(window).on('resize scroll', function(){
  rect = $('.heroBackgroundCircle')[0].getBoundingClientRect();
});

// Bind canvas to listeners
var canvas = document.getElementById('drawing_board');
canvas.addEventListener('mousedown', mouseDown, false);
canvas.addEventListener('mousemove', mouseMove, false);
canvas.addEventListener('mouseup', mouseUp, false);
var ctx = canvas.getContext('2d');

ctx.lineWidth = 8;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

var started = false;
var lastx = 0;
var lasty = 0;
var points = [];

function mouseDown(e) {
  var m = getMouse(e, canvas);
  points.push({
    x: m.x,
    y: m.y
  });
  started = true;
};

function mouseMove(e) {
  if (started) {
    ctx.clearRect(0, 0, 500, 500);
    // put back the saved content
    var m = getMouse(e, canvas);
    points.push({
      x: m.x,
      y: m.y
    });
    drawPoints(ctx, points);
  }
};

function mouseUp(e) {
  if (started) {
    started = false;
    points = [];
  }
};

// Clear both canvases!
function clear() {
  context.clearRect(0, 0, 500, 500);
//  memCtx.clearRect(0, 0, 500, 500);

};

function drawPoints(ctx, points) {

  // Draw a basic circle instead
  if (points.length < 6) {
    var b = points[0];
    ctx.beginPath(), ctx.arc(b.x, b.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0),
                             ctx.closePath(), ctx.fill();
    return
  }

  ctx.beginPath(), ctx.moveTo(points[0].x, points[0].y);
  // draw a bunch of quadratics, using the average of two points as the control point
  for (i = 1; i < points.length - 2; i++) {
    var c = (points[i].x + points[i + 1].x) / 2,
    d = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, c, d)
  }
  ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y), ctx.stroke()
}

// Creates an object with x and y defined,
// set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky,
// we have to worry about padding and borders
// takes an event and a reference to the canvas
function getMouse(e, canvas) {
  var element = canvas, offsetX = 0, offsetY = 0, mx, my;

  // Compute the total offset. It's possible to cache this if you want
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  // We return a simple javascript object with x and y defined
  return {x: mx, y: my};
}

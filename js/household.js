console.log('%cLoaded household functions','color:#ff0000;font-family:Comic Sans MS;');

function roll(die, faces, modifier){
  //TODO
  return 1;
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// equiv to Engine = Matter.Engine;
const { Bodies, Bounds, Body, Common, Composite, Composites, Constraint, Engine, Events, MouseConstraint, Mouse, Query, Render, Runner, Sleeping, Vector, World } = Matter;

function pcWidth(percentage){
  if(typeof(percentage) === 'number'){
    return window.innerWidth * percentage;
  }else{
    return window.innerWidth;
  }
}
function pcHeight(percentage){
  if(typeof(percentage) === 'number'){
    return window.innerHeight * percentage;
  }else{
    return window.innerHeight;
  }
}

function buildRect(x, y, width, height, options){
  return Bodies.rectangle(x, y, width, height, options);
}

function buildCircle(x, y, size, options){
  return Bodies.circle(x, y, size, options);
}

function pingBumper(bumper, color_og, color_new, reset_time) {
  //updateScore(currentScore + 10);
  bumper.render.fillStyle = color_new;
  setTimeout(function() {
    bumper.render.fillStyle = color_og;
  }, reset_time);
}

function stopBall(ball, bumper, og_bounce, og_inertia) {
  Body.setVelocity(ball, { x: 0, y: 0 });
  Body.setInertia(ball, 900000);
  bumper.restitution = 0;
  setTimeout(function() {
    bumper.restitution = og_bounce;
    Body.setInertia(ball, og_inertia);
  }, 100);
}

var staticOption = { isStatic: true };
var group = Body.nextGroup(true);

// create circles
// half-cup
//for(var i = 0; i < 45; i++) {
/*
// half-dome
for(var i = 45; i < 90; i++) {
  a = Bodies.rectangle(
    //last param controls width / height
    reWi / 2 + Math.cos(i * 4 * Math.PI / 180) * (reWi/2), 
    //half cup
    //reHi / 4 + Math.sin(i * 4 * Math.PI / 180) * (reWi/2), 
    //half dome
    reHi / 1.25 + Math.sin(i * 4 * Math.PI / 180) * (reWi/2), 
    40, 
    80, 
    {
      isStatic: true, 
      angle: Math.PI / 180 * i * 4,
      friction: 0,
      render: {
        fillStyle: "#ff0000",
        strokeStyle: "#fff",
        lineWidth: 0
      }
    }
  );
  World.add(world, a);
}
*/

// return width calculated from bounds
function wbb(bounds) {
  return Math.abs(bounds.max.x - bounds.min.x);
}
// return height calculated from bounds
function hbb(bounds) {
  return Math.abs(bounds.max.y - bounds.min.y);
}

// Find intersection of RAY & SEGMENT
function getIntersection(ray,segment){

	// RAY in parametric: Point + Delta*T1
	var r_px = ray.a.x;
	var r_py = ray.a.y;
	var r_dx = ray.b.x-ray.a.x;
	var r_dy = ray.b.y-ray.a.y;

	// SEGMENT in parametric: Point + Delta*T2
	var s_px = segment.a.x;
	var s_py = segment.a.y;
	var s_dx = segment.b.x-segment.a.x;
	var s_dy = segment.b.y-segment.a.y;

	// Are they parallel? If so, no intersect
	var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
	var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
	if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){
		// Unit vectors are the same.
		return null;
	}

	// SOLVE FOR T1 & T2
	// r_px+r_dx*T1 = s_px+s_dx*T2 && r_py+r_dy*T1 = s_py+s_dy*T2
	// ==> T1 = (s_px+s_dx*T2-r_px)/r_dx = (s_py+s_dy*T2-r_py)/r_dy
	// ==> s_px*r_dy + s_dx*T2*r_dy - r_px*r_dy = s_py*r_dx + s_dy*T2*r_dx - r_py*r_dx
	// ==> T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx)
	var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
	var T1 = (s_px+s_dx*T2-r_px)/r_dx;

	// Must be within parametic whatevers for RAY/SEGMENT
	if(T1<0) return null;
	if(T2<0 || T2>1) return null;

	// Return the POINT OF INTERSECTION
	return {
		x: r_px+r_dx*T1,
		y: r_py+r_dy*T1,
		param: T1
	};
}
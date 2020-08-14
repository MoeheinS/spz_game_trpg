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

// combine with draw_Graphics([actor], 'source-atop');
function ray_fov(caster){
  /*
    Object vertices go clockwise. Therefore I can deduce segments per vertex pair
    Per ally / raycaster, cast a ray towards every unique vertex (of LoS breaking objects)
    Plus 2 rays offset by +/- 0.00001 rad
    Get the intersect points
    Sort intersect points by ray angle and draw a polygon by connecting the dots going clockwise
    Repeat ^ per ally and overlap the visibility polygons
  */

  // Plot segments per FoV blocking shape
  var segments = [];
  for( let o of obstacles_Array ){
    //skip 0 and the last vertex; we'll push those manually
    segments.push({a:{x:o.vertices[0].x,y:o.vertices[0].y}, b:{x:o.vertices[1].x,y:o.vertices[1].y}});
    for( i=1; i<o.vertices.length-1; i++ ){
      segments.push({a:{x:o.vertices[i].x,y:o.vertices[i].y}, b:{x:o.vertices[i+1].x,y:o.vertices[i+1].y}});
    }
    segments.push({a:{x:o.vertices[i].x,y:o.vertices[i].y}, b:{x:o.vertices[0].x,y:o.vertices[0].y}});
  }

  // Get all unique points
	var points = (function(segments){
		var a = [];
    for( seg of segments ){
      a.push(seg.a,seg.b);
    }
		return a;
	})(segments);
	var uniquePoints = (function(points){
		var set = {};
		return points.filter(function(p){
			var key = p.x+","+p.y;
			if(key in set){
				return false;
			}else{
				set[key]=true;
				return true;
			}
		});
  })(points);
  
  // Get all angles
	var uniqueAngles = [];
	for(var j=0;j<uniquePoints.length;j++){
		var uniquePoint = uniquePoints[j];
		var angle = Math.atan2(uniquePoint.y-caster.position.y,uniquePoint.x-caster.position.x);
		uniquePoint.angle = angle;
		uniqueAngles.push(angle-0.00001,angle,angle+0.00001);
  }
  
  // RAYS IN ALL DIRECTIONS
	var intersects = [];
	for(var j=0;j<uniqueAngles.length;j++){
		var angle = uniqueAngles[j];

		// Calculate dx & dy from angle
		var dx = Math.cos(angle);
		var dy = Math.sin(angle);

		// Ray from center of screen to caster
		var ray = {
			a:{x:caster.position.x,y:caster.position.y},
			b:{x:caster.position.x+dx,y:caster.position.y+dy}
		};

		// Find CLOSEST intersection
		var closestIntersect = null;
		for(var i=0;i<segments.length;i++){
			var intersect = getIntersection(ray,segments[i]);
			if(!intersect) continue;
			if(!closestIntersect || intersect.param<closestIntersect.param){
				closestIntersect=intersect;
			}
    }
    
    // Intersect angle
		if(!closestIntersect){ continue; }
		closestIntersect.angle = angle;

		// Add to list of intersects
		intersects.push(closestIntersect);
  }
  
  // Sort intersects by angle
	intersects = intersects.sort(function(a,b){
		return a.angle-b.angle;
	});

  // DRAW AS A GIANT POLYGON
  ctx.fillStyle = RENDER_FILLCOLOR;
  // experimental: currect "active" selection renders polygon LAST, and in a different color
  if (mouseConstraint.body && mouseConstraint.mouse.button === 0){
    if( mouseConstraint.body.id == caster.id ){
      ctx.fillStyle = RENDER_ACTIVE_FILLCOLOR;
    }
  }
	ctx.beginPath();
	ctx.moveTo(intersects[0].x,intersects[0].y);
	for(var i=1;i<intersects.length;i++){
		var intersect = intersects[i];
		ctx.lineTo(intersect.x,intersect.y);
	}
  ctx.fill();
}

//var crab = ["1",2,3,4,5,6];
function cycleArray(a, lofi) { 
  //console.table(a);
  if(lofi){ //last-out-first-in
    a.unshift(a.pop());
    return a;
  }else{ //first-out-last-in
    a.push(a[0]);
    a.shift();
    return a;
  }
}

// Sort bodies by y-position
function sortByY(bods) {
	bods = bods.sort(function(a,b){
    try{
      // return by bounds (lower edge) rather than center point
      // return a.position.y-b.position.y;
      return a.bounds.max.y-b.bounds.max.y;
    }catch(err){
      console.warn('renderOrder error');
      return 0;
    }
  });
  return bods;
}

// get the lesser dimension of the largest from amongst the selection's x and y's
function sortByDim(bods) {
	bods_by_x = bods.sort(function(a,b){
    try{
      return a.custom.graphics.sprite_dim.x-b.custom.graphics.sprite_dim.x;
    }catch(err){
      console.warn('sortByDimension_x error');
      return 0;
    }
  });
  bods_by_y = bods.sort(function(a,b){
    try{
      return a.custom.graphics.sprite_dim.y-b.custom.graphics.sprite_dim.y;
    }catch(err){
      console.warn('sortByDimension_y error');
      return 0;
    }
  });
  return (bods_by_x[0].custom.graphics.sprite_dim.x <= bods_by_y[0].custom.graphics.sprite_dim.y) ? bods_by_x[0].custom.graphics.sprite_dim.x : bods_by_y[0].custom.graphics.sprite_dim.y;
}

// move an actor with position.x/y to vector v.x/v.y, at a speed dependent on its mass or not
// 0.01 forceI is okay for mass 1-4 objects
function moveToPoint(a, dv, force, uniform){
  if(!uniform){
    force = force * a.mass;
  }
  let deltaVector = Vector.sub(dv, a.position);
  let normalizedDelta = Vector.normalise(deltaVector);
  let forceVector = Vector.mult(normalizedDelta, force);
  Body.applyForce(a, a.position, forceVector);
  
  // This rotates the body, which is a problem for non-square, non-round bodies.
  // FIXME: alternative is to get the movement vector; then you can use non-round bodies...
  if( a.custom && a.custom.shape ){
    Body.setAngle( a, Vector.angle( a.position, dv));
  }
}

// works off world bounds; performance is still good for now
// grid size unit, feathering from edges
function grid_pathfind(bod, gsu, feather, exceptID){

  var playfield = new Coordinate(FIELD_SIZE, FIELD_SIZE);
  var max_rows = Math.ceil(playfield.y / gsu);
  var max_cols = Math.ceil(playfield.x / gsu);
  // console.warn(`rows: ${max_rows},cols: ${max_cols}`);

  var astar_grid = [];

  for (let g_v = 0; g_v < max_rows; g_v++) {
    var astar_row = [];

    for (let g_h = 0; g_h < max_cols; g_h++) {
      //console.log(g_v, g_h);
      
      // region offset
      let ros = new Coordinate((g_h*gsu), (g_v*gsu));

      var region = new Object;
          region.min = new Coordinate(ros.x+feather, ros.y+feather);
          region.max = new Coordinate(ros.x+gsu-feather, ros.y+gsu-feather);

      var blockers_Array = new Array;
      switch (bod.custom.moveType) {
        case 'air':
          blockers_Array = buildings_Array;
          break;
        case 'ground':
        default:
          blockers_Array = buildings_all_Array;
          break;
      }

      //let detectedBodies = Query.region(Composite.allBodies(world), region);
      let detectedBodies = Query.region(blockers_Array, region);
      
      //console.log(detectedBodies);

      if( detectedBodies.length ){
        var itsMe = false;
        for( dbod of detectedBodies ){
          if( dbod.id == exceptID ){
            itsMe = true;
          }
        }
        // if detecting self, push 0 so you don't block yourself from moving
        astar_row.push((itsMe ? 0 : 1));
      }else{
        astar_row.push(0);
      }

    }

    astar_grid.push(astar_row);
  }
  var start_pos = new Coordinate(
    Math.floor(bod.position.x / gsu), 
    Math.floor(bod.position.y / gsu)
  ); // find in grid. floor not ceil because array counting
  var goal_pos = new Coordinate(
    Math.floor(bod.custom.target.position.x / gsu), 
    Math.floor(bod.custom.target.position.y / gsu)
  );
  grid_astar(astar_grid, start_pos, goal_pos, unit);
}

// TODO: it finds the path, but I can't draw it within this function. Because easystar is async?
// so that leaves NOT drawing it, or pushing the points to a higher scoped array, which is drawn instead
function grid_astar(astar_grid, start_pos, goal_pos, unit){
  var easystar = new EasyStar.js();
  easystar.setGrid(astar_grid);
  easystar.enableDiagonals();
  easystar.setAcceptableTiles([0]);
  easystar.findPath(start_pos.x, start_pos.y, goal_pos.x, goal_pos.y, function( path ) {
    //console.log(path);
    if (path === null) {
      //console.error("Path was not found.");
      console.warn(`path for ${unit.id} NOT found`);
      unit_acquireTarget_wall(unit);
    } else {
      //console.warn("Path was found. The first Point is " + path[0].x + " " + path[0].y);
      console.warn(`path for ${unit.id} found`);
      unit.custom.state = 'moving';
    }
  });
  easystar.calculate();
}

function getDistance(a, b){
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

class aStar_grid {
  constructor() {
    var aStar_baseGrid = [];
    for( let hi = 0; hi < GRID_LIMIT; hi++ ){
      var aStar_baseGrid_row = [];
      for( let vi = 0; vi < GRID_LIMIT; vi++ ){
        aStar_baseGrid_row.push(0);
      }
      aStar_baseGrid.push(aStar_baseGrid_row);
    }
    return aStar_baseGrid;
  }
}

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// class Enemy {
//   constructor(o) {
//     this.info = o;
//   }
//   // ie Enemy.distance(obj1, obj2)
//   // is there a benefit here over household functions?
//   static distance(a, b) { 
//     let dx = a.x - b.x;
//     let dy = a.y - b.y;
//     return Math.hypot(dx, dy);
//   }
//   inspect() { // works on the chosen enemy
//     console.log(this);
//   }
// }
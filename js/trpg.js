console.log('%cUo Poko game','color:#ff0000;font-family:Comic Sans MS;');

/*  Table of Contents
*   Constants and settings
*   Actual physics objects
*   Functions
*   Lifecycle events
*   Rendering
*/

/*
*   Constants and settings
*/
let game_state = 'idle';
let game_debug = true;
let game_phase = 'player';

let background_img = new Image();
background_img.src = './assets/map.jpg';

//const COLOR_STACKED = '#795548';
const COLOR_SHIFT = [
  '#7f7f7f',//grey
  '#ff0000',//red
  '#00ff00',//green
  '#ffff00',//yellow
  '#0000ff',//blue
  '#ff00ff',//fuchsia
  '#00ffff',//aqua
  '#ffffff'//white
];

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var reWi = pcWidth();
var reHi = pcHeight();
console.warn(reWi, reHi);

const GRID_SIZE = reHi/14;

var render = Render.create({
    element: document.querySelector('.container__Matter'),
    engine: engine,
    options: {
        width: reWi,
        height: reHi,
        wireframes: false,
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true,
        hasBounds: true,
        //background: '#004444',
        background: '#202124'
    }
});
Render.run(render);

var viewportCentre = {
  x: render.options.width * 0.5,
  y: render.options.height * 0.5
};

// make the world bounds a little bigger than the render bounds
world.bounds.min.x = render.options.width * -0.25;
world.bounds.min.y = render.options.height * -0.25;
world.bounds.max.x = render.options.width * 1.25;
world.bounds.max.y = render.options.height * 1.25;

// keep track of current bounds scale (view zoom)
var boundsScaleTarget = 1,
boundsScale = {
    x: 1,
    y: 1
};

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add mouse control
// TODO add collision filtering for the invisible pushers?
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.6,
        render: {
            visible: true
        }
    }
});
World.add(world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: reWi, y: reHi }
});

world.gravity.y = 0;
engine.enableSleeping = false;

/*
*   Actual physics objects
*/
/*
Walls, Pillars, Characters
*/
var w_bot = buildRect(reWi*0.5, reHi, reWi, GRID_SIZE, { 
  label: 'wall',
  isStatic: true,
  render: {
    //fillStyle: 'transparent'
  }
});
var w_top = buildRect(reWi*0.5, 0, reWi, GRID_SIZE, { 
  label: 'wall',
  isStatic: true,
  render: {
    //fillStyle: 'transparent'
  }
});
var w_right = buildRect(reWi, reHi*0.5, GRID_SIZE, reHi, {
  label: "wall",
  isStatic: true,
  render: {
    //fillStyle: 'transparent'
  }
});
var w_left = buildRect(0, reHi*0.5, GRID_SIZE, reHi, {
  label: "wall",
  isStatic: true,
  render: {
    //fillStyle: 'transparent'
  }
});

// basic world boundary
World.add(world, [
  w_bot,
  w_top,
  w_left,
  w_right
]);

debug_travelDistance = 0;
debug_travelDistance_color = 'green';

var test_obstacle_pillar = Bodies.rectangle(GRID_SIZE*7, GRID_SIZE*10, GRID_SIZE*2, GRID_SIZE*1.5, {
  label: 'obstacle',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*7, 
      y: GRID_SIZE*10 
    },
    render: 'sprite'
  },
  render: {
    fillStyle: 'grey'
  }
});
World.add(world, test_obstacle_pillar);
console.log(test_obstacle_pillar);

var test_obstacle_shape = Bodies.rectangle(GRID_SIZE*6, GRID_SIZE*7, GRID_SIZE*1.5, GRID_SIZE*1.5, {
  label: 'shape',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*6, 
      y: GRID_SIZE*7 
    },
    render: 'shape'
  },
  render: {
    fillStyle: 'grey',
    sprite: {
      texture: './assets/Cannon_06.png',
      xScale: 0.85,
      yScale: 0.85
    }
  }
});
World.add(world, test_obstacle_shape);
console.log(test_obstacle_shape);

// ==================================

var test_character = buildCircle(GRID_SIZE*4, GRID_SIZE*2, GRID_SIZE*1, {
  label: 'ally',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*4, 
      y: GRID_SIZE*2 
    },
    sprite: './assets/3382.png'
  },
  render: {
    fillStyle: 'fuchsia'
  }
});
World.add(world, test_character);

var test_character2 = buildCircle(reWi-(GRID_SIZE*4), reHi-(GRID_SIZE*12), GRID_SIZE*1, {
  label: 'ally',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*14,
    maxMove: GRID_SIZE*14,
    startPoint: { 
      x: reWi-(GRID_SIZE*4),
      y: reHi-(GRID_SIZE*12)
    },
    sprite: './assets/3096.png'
  },
  render: {
    fillStyle: 'fuchsia'
  }
});
World.add(world, test_character2);

var test_character3 = buildCircle(reWi-(GRID_SIZE*4), reHi-(GRID_SIZE*4), GRID_SIZE*1, {
  label: 'ally',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi-(GRID_SIZE*4),
      y: reHi-(GRID_SIZE*4)
    },
    sprite: './assets/2681.png'
  },
  render: {
    fillStyle: 'fuchsia'
  }
});
World.add(world, test_character3);



// Sensor grid; for raycasting

// make primitive groups, so I don't have to loop over ALL the objects every time i need something
// this also lets me ignore checks for properties
var allies_Array = [];
var obstacles_Array = [];

var bods = Composite.allBodies(world);
for( bod of bods ){
  if(bod.label == 'ally'){
    allies_Array.push(bod);
  }else if(bod.label == 'shape' || bod.label == 'obstacle' || bod.label == 'wall'){
    obstacles_Array.push(bod);
  }
}
console.log(allies_Array);
console.log(obstacles_Array);

//Composite.scale(world, 0.5, 0.5, {x: 0, y: 0});

/*
*   Functions
*/
// keydown to move curver brick, keyup to launch orb?
document.addEventListener("keydown", function(e){
  switch (e.key) {
    case 'd':
      game_debug = !game_debug;
      break;
    case 'r':
      var bods = Composite.allBodies(world);
      for( bod of bods ){
        if(bod.custom && bod.custom.startPoint){
          bod.custom.maxMove = bod.custom.baseMove;
          bod.custom.startPoint =  { x: bod.position.x, y: bod.position.y};
        }
      }
      break;
    default:
      console.log(e.key);
      break;
  }
});

/*
*   Lifecycle events
*/
//Events.on(engine, 'beforeUpdate', function(event) {});

//Events.on(engine, "collisionActive", function(event) {});
//all pairs colliding in the current tick

// TODO & render: turn starting position
// Fired after engine update and all collision events
Events.on(engine, 'afterUpdate', function(event) {
  if( game_state == 'movement' && mouseConstraint.body){
    let movingEnt = mouseConstraint.body;
    if( movingEnt.custom ){
      debug_travelDistance = Math.hypot((movingEnt.custom.startPoint.x - movingEnt.position.x) ,(movingEnt.custom.startPoint.y - movingEnt.position.y));
      if(debug_travelDistance < movingEnt.custom.maxMove){
        debug_travelDistance_color = 'green';
      }else{
        debug_travelDistance_color = 'red';
      }
    }
  }
});

Events.on(mouseConstraint, "startdrag", function(event) {
  console.log(event);
  let movingEnt = event.body;
  
  World.remove(world, movingEnt, true);
  World.add(world, movingEnt);

  game_state = 'movement';
  if( movingEnt.custom ){
    var bods = Composite.allBodies(world);
    for( bod of bods ){
      if(bod.id != movingEnt.id){
        console.log(`${movingEnt.id} moving, sleep ${bod.id}`);
        var rope = Constraint.create({ 
          pointA: {x: bod.position.x, y: bod.position.y}, 
          bodyB: bod, 
          stiffness: 0.95
        });
        World.add(world, rope);
      }
    }
  }
});

Events.on(mouseConstraint, "enddrag", function(event) {
  console.log(event);
  let movingEnt = event.body;
  if( movingEnt.custom ){
    if(debug_travelDistance < movingEnt.custom.maxMove){
      //startPoint =  { x: event.body.position.x, y: event.body.position.y};
      //event.body.custom.maxMove = event.body.custom.maxMove - debug_travelDistance;
    }else{
      Body.setPosition(movingEnt, movingEnt.custom.startPoint);
    }
  }
  var ropes = Composite.allConstraints(world);
  window.setTimeout(function(){
    for( rope of ropes ){
      if( rope.label != "Mouse Constraint" ){
        World.remove(world, rope, true);
      }
    }
  },200);
  game_state = 'idle';
});

//Events.on(engine, 'collisionStart', function(event) {});

/*
*   Rendering
*/
var tutorial = [
  'STUB'
];

Events.on(render, 'afterRender', function() {
  var ctx = render.context;

  Render.startViewTransform(render);

    //draw_BG(ctx);

    ctx.font = '16px alber';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('v0.0.1', 100, 20);

    //debug state rendering
    render_debug(game_debug, render.context);

    /*
    var bods = Composite.allBodies(world);
    for( bod of bods ){
      if( bod.custom && bod.custom.render){
        if( bod.custom.render == 'shape' ){
          render_shape(ctx, bod);
        }
      }
    }
    */

    if (mouseConstraint.body && mouseConstraint.mouse.button === 0){
      render_moveRange(ctx, mouseConstraint);
      if( mouseConstraint.body.label == 'ally' ){
        ray_tb(ctx, mouseConstraint);
      }
    }

    for( caster of allies_Array ){
      ray_fov(ctx, caster);
    }

    draw_Shapes(ctx, obstacles_Array);
    draw_Graphics(ctx, allies_Array);

  Render.endViewTransform(render);
});

function draw_BG(ctx){
  let img = new Image();
  img.src = './assets/map.jpg';
  ctx.drawImage(img,0,0,reWi,reHi);
}

function draw_Shapes(ctx, a){
  for( i of a ){
    ctx.beginPath();
    ctx.moveTo(i.vertices[0].x, i.vertices[0].y);
    for(v of i.vertices){
      ctx.lineTo(v.x, v.y);
    }
    ctx.lineTo(i.vertices[0].x, i.vertices[0].y);
    ctx.fillStyle = '#ffffffaa';
    ctx.lineWidth = 1;
    ctx.fill();
  }
}

function draw_Graphics(ctx, a){
  for( i of a ){
    let img = new Image();
    img.src = i.custom.sprite;
    var ix = i.bounds.min.x;
    var iy = i.bounds.min.y;
    var ixs = Math.abs(i.bounds.max.x - i.bounds.min.x);
    var iys = Math.abs(i.bounds.max.y - i.bounds.min.y);
    //ctx.drawImage(img,ix,iy);
    ctx.drawImage(img,ix,iy,ixs,iys);
  }
}

function render_debug(game_debug, ctx){
  if(game_debug){
    ctx.font = '10px alber';
    ctx.fillStyle = '#ffffff';
    var bods = Composite.allBodies(world);
    for( bod of bods ){
      ctx.fillText(`id:${bod.id}`, bod.position.x, bod.position.y-12);
      ctx.fillText(bod.label, bod.position.x, bod.position.y);
      ctx.fillText('slp:'+bod.isSleeping, bod.position.x, bod.position.y+12);
      ctx.fillText('stt:'+bod.isStatic, bod.position.x, bod.position.y+24);

      if( bod.custom && bod.custom.maxMove ){
        ctx.fillStyle = debug_travelDistance_color;
        ctx.fillText('dist:'+Math.floor(debug_travelDistance / GRID_SIZE), bod.position.x, bod.position.y+48);
        ctx.fillText('moveRemain:'+Math.floor(bod.custom.maxMove / GRID_SIZE), bod.position.x, bod.position.y+60);

        ctx.fillStyle = '#00ff0022';
        ctx.beginPath();
        ctx.arc(bod.custom.startPoint.x, bod.custom.startPoint.y, bod.custom.maxMove+(GRID_SIZE*0.5), 0, Math.PI * 2, true); // Outer circle
        ctx.stroke();
        ctx.moveTo(bod.position.x, bod.position.y);
      }
    }
  }
}

function render_moveRange(ctx, mouseConstraint){
  let movingEnt = mouseConstraint.body;
  if( movingEnt.custom ){
    if(debug_travelDistance < movingEnt.custom.maxMove){
      ctx.strokeStyle = debug_travelDistance_color;
      ctx.beginPath();
      ctx.arc(movingEnt.position.x, movingEnt.position.y, movingEnt.custom.maxMove - debug_travelDistance + GRID_SIZE*0.5, 0, Math.PI * 2, true); // Outer circle
      ctx.stroke();
    }
  }
}

function render_shape(ctx, o){
  // render graphics by means of a shape
  // we can use this to add shape animations to a primitive
  /*
  var time = engine.timing.timestamp;

  Composite.translate(stack, {
      x: Math.sin(time * 0.001) * 2,
      y: 0
  });
  */
}

function ray_tb(ctx, o){
  // draw lines between allies, change color if there's enemies intersecting
  // also draw the other cardinal directions, see who intersects with that
  let movingEnt = o.body;
  var bods = Composite.allBodies(world);
  for( bod of bods ){
    if( bod.label == 'ally' && bod.id != movingEnt.id ){
      var collisions = Query.ray(bods, movingEnt.position, bod.position);
      ctx.beginPath();
      ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
      ctx.lineTo(bod.position.x, bod.position.y);
      if (collisions.length > 2) { // >2 because the mover and the ally are included
        ray_crossVector(ctx, movingEnt, bod); // ccomment out for normal ray coloring
        ctx.strokeStyle = '#ffffff';
      } else {
        ctx.strokeStyle = '#ff00ff';
      }
      ctx.lineWidth = 1;
      ctx.stroke();
      
    }
  }
  //allies_Array
}

function ray_crossVector(ctx, movingEnt, bod){
  var deltaVector = Vector.sub(movingEnt.position, bod.position);
  //var normalizedDelta = Vector.normalise(deltaVector);
  var forceVector = Vector.mult(deltaVector, 1000);
  
  var v_behind = Vector.rotateAbout(forceVector, Math.PI*0, movingEnt.position);
  var v_left = Vector.rotateAbout(forceVector, Math.PI*0.5, movingEnt.position);
  var v_right = Vector.rotateAbout(forceVector, Math.PI*1.5, movingEnt.position);
  var v_front = Vector.rotateAbout(forceVector, Math.PI*1, movingEnt.position);
  var draw_vectors = [
    v_behind,
    v_left,
    v_right,
    v_front
  ];
  for( vec of draw_vectors ){
    ctx.beginPath();
    ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
    ctx.lineTo(vec.x, vec.y);
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(bod.position.x, bod.position.y);
    ctx.lineTo(vec.x, vec.y);
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.stroke();

    //this seems to be grabbing the cardinal me-too's.
    //TODO draw rects or something to denote target / pincer / chain
    var bods = Composite.allBodies(world);
    var collisions = Query.ray(bods, movingEnt.position, vec);
    ctx.beginPath();
    ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
    ctx.lineTo(vec.x, vec.y);
    if (collisions.length > 2) { // >2 because the mover and the ally are included
      ctx.strokeStyle = '#ffffff';
    } else {
      ctx.strokeStyle = '#ff00ff';
    }
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function ray_fov(ctx, caster){
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
  //ctx.fillStyle = "#dd383833";
  ctx.fillStyle = ctx.createPattern(background_img,'repeat');
	ctx.beginPath();
	ctx.moveTo(intersects[0].x,intersects[0].y);
	for(var i=1;i<intersects.length;i++){
		var intersect = intersects[i];
		ctx.lineTo(intersect.x,intersect.y);
	}
  ctx.fill();
}
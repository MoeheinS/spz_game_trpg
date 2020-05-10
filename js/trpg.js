console.log('%cTRPG','color:#ff0000;font-family:Comic Sans MS;');

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

let anim_timing = 25;
let anim_tick = 0;

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

const RENDER_FILLCOLOR = '#bebec0';//'#dee1e6';
const RENDER_ACTIVE_FILLCOLOR = '#dd3838cc';

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
var boundsScaleTarget = 1;
var boundsScale = {
    x: 1,
    y: 1
};

// create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add mouse control
// define our categories (as bit fields, there are up to 32 available)
var defaultCategory = 0x0001,
    draggable_true = 0x0002,
    draggable_false = 0x0004;
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
mouseConstraint.collisionFilter.mask = defaultCategory | draggable_true;
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
var w_bot = buildRect(reWi*0.5, reHi+(GRID_SIZE*0.5), reWi, GRID_SIZE, { 
  label: 'wall',
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});
var w_top = buildRect(reWi*0.5, 0-(GRID_SIZE*0.5), reWi, GRID_SIZE, { 
  label: 'wall',
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});
var w_right = buildRect(reWi+(GRID_SIZE*0.5), (reHi*0.5), GRID_SIZE, reHi, {
  label: "wall",
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});
var w_left = buildRect(0-(GRID_SIZE*0.5), reHi*0.5, GRID_SIZE, reHi, {
  label: "wall",
  isStatic: true,
  collisionFilter: {
    category: draggable_false
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

var test_obstacle_pillar = Bodies.rectangle(reWi*0.5, reHi*0.25, GRID_SIZE*2, GRID_SIZE*1.5, {
  label: 'obstacle',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi*0.5, 
      y: reHi*0.25
    },
    render: 'sprite'
  }
});
World.add(world, test_obstacle_pillar);

var test_obstacle_shape = Bodies.rectangle(reWi*0.5, GRID_SIZE*9, GRID_SIZE*1.5, GRID_SIZE*7.5, {
  label: 'shape',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi*0.5, 
      y: GRID_SIZE*9 
    },
    render: 'shape'
  }
});
World.add(world, test_obstacle_shape);

// ==================================

var test_character = buildCircle(GRID_SIZE*4, GRID_SIZE*2, GRID_SIZE*1, {
  label: 'enemy',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*4, 
      y: GRID_SIZE*2 
    },
    sprite: './assets/2681.png'
  }
});
World.add(world, test_character);

/*
*   Functions
*/
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
    case 'f':
      for( ally of allies_Array ){
        if( ally.collisionFilter.category == draggable_false ){
          ally.collisionFilter.category = draggable_true;
        }else{
          ally.collisionFilter.category = draggable_false;
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

let allies_Array = [];
let enemies_Array = [];
let obstacles_Array = [];

Events.on(render, 'afterRender', function() {

  anim_tick++;
  if( anim_tick >= anim_timing ){
    anim_tick = 0;
    console.log('tick');
    for( bod of Composite.allBodies(world) ){
      if( bod.custom && bod.custom.animation ){
        bod.custom.animation = cycleArray(bod.custom.animation);
      }
    }
  }

  // make primitive groups, so I don't have to loop over ALL the objects every time i need something
  // this also lets me ignore checks for properties
  allies_Array = [];
  enemies_Array = [];
  obstacles_Array = [];
  for( bod of Composite.allBodies(world) ){
    if(bod.label == 'ally'){
      allies_Array.push(bod);
    }else if(bod.label == 'enemy'){
      enemies_Array.push(bod);
    }else if(bod.label == 'shape' || bod.label == 'obstacle' || bod.label == 'wall'){
      obstacles_Array.push(bod);
    }
  }

  var ctx = render.context;
  ctx.clearRect(0, 0, reWi, reHi);

  Render.startViewTransform(render);

    ctx.font = '16px alber';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('v0.0.3', 100, -100);
    ctx.fillText(game_state, 100, -80);

    for( caster of allies_Array ){
      ray_fov(ctx, caster);
    }
    draw_Graphics(ctx, enemies_Array, 'source-atop');

    draw_Graphics(ctx, allies_Array);
    draw_Shapes(ctx, obstacles_Array);
    //draw mouse cq custom cursor

    if( game_state == 'mouse_select' ){ // && mouseConstraint.mouse.button === 0
      draw_mouseSelect(ctx);
    }

    //debug state rendering
    render_debug(game_debug, render.context);
    // experimental
    if (mouseConstraint.body && mouseConstraint.mouse.button === 0){
      render_moveRange(ctx, mouseConstraint);
      if( mouseConstraint.body.label == 'ally' ){
        ray_tb(ctx, mouseConstraint);
      }
    }

  Render.endViewTransform(render);
});

function draw_Shapes(ctx, a){
  for( i of a ){
    ctx.beginPath();
    ctx.moveTo(i.vertices[0].x, i.vertices[0].y);
    for(v of i.vertices){
      ctx.lineTo(v.x, v.y);
    }
    ctx.lineTo(i.vertices[0].x, i.vertices[0].y);
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.fill();
  }
}

function draw_Graphics(ctx, a, mode){
  for( i of a ){
    let img = new Image();
    if( i.custom.animation ){
      img.src = i.custom.animation[0];
    }else{
      img.src = i.custom.sprite;  
    }
    var ix = i.bounds.min.x;
    var iy = i.bounds.min.y;
    var ixs = Math.abs(i.bounds.max.x - i.bounds.min.x);
    var iys = Math.abs(i.bounds.max.y - i.bounds.min.y);
    if(mode){
      ctx.globalCompositeOperation = mode;
      ctx.drawImage(img,ix,iy,ixs,iys);
      ctx.globalCompositeOperation = 'source-over';
    }else{
      ctx.drawImage(img,ix,iy,ixs,iys);
    }
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

        ctx.fillStyle = '#00ff00';
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

function ray_tb(ctx, o){
  // draw lines between allies, change color if there's enemies intersecting
  // also draw the other cardinal directions, see who intersects with that
  let movingEnt = o.body;
  for( bod of allies_Array ){
    if( bod.id != movingEnt.id ){
      var collisions = Query.ray(Composite.allBodies(world), movingEnt.position, bod.position);
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

// option 1: cast rays from allies to enemies, if the enemy isn't 0th on the collision array, hide them
// option 2: render enemies before the polygons, using a different globalCompositeOperation
// ctx.globalCompositeOperation = "destination-atop";
// ctx.globalCompositeOperation = "source-over";

/*
  add enemy type
    render before visibility polygons; enemy with globalCompositeOperation to fully darken graphic
    render after  visibility polygons; ray from allies to enemies; 
      if it's a CLEAR loS (not counting other allies) enemy normal graphic
      else skip the normal graphic; this leaves a silhouette that bleeds into the shadows. In theory.
  add mouse select
  hotkey bindings, group forming?
*/

var mouse_selectArea = {};

Events.on(mouseConstraint, "mousedown", function(event) {
  console.log(event);
  if( event.mouse.button === 0 ){
    console.warn('start drag selection area');
    game_state = 'mouse_select';
    mouse_selectArea = {};
    mouse_selectArea.min = {x: mouseConstraint.mouse.mousedownPosition.x, y: mouseConstraint.mouse.mousedownPosition.y};
  }
});

Events.on(mouseConstraint, "mouseup", function(event) {
  if( event.mouse.button === -1 && game_state == 'mouse_select' ){
    console.warn('end drag selection area');
    game_state = 'mouse_select_done';
    mouse_selectArea.max = {x: mouseConstraint.mouse.mouseupPosition.x, y: mouseConstraint.mouse.mouseupPosition.y};
    console.table(mouse_selectArea);

    var region = {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 0,
        y: 0
      }
    };
    var bound_a = mouse_selectArea.min;
    var bound_b = mouse_selectArea.max;
    region.min.x = (bound_a.x <= bound_b.x ? bound_a.x : bound_b.x);
    region.max.x = (bound_a.x > bound_b.x ? bound_a.x : bound_b.x);
    region.min.y = (bound_a.y <= bound_b.y ? bound_a.y : bound_b.y);
    region.max.y = (bound_a.y > bound_b.y ? bound_a.y : bound_b.y);

    var selectedBodies = Query.region(allies_Array, region);
    console.log(selectedBodies);
  }
});

function draw_mouseSelect(ctx){
  if( mouse_selectArea.min ){
    var oldStroke = ctx.strokeStyle;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(
      mouse_selectArea.min.x, 
      mouse_selectArea.min.y, 
      mouseConstraint.mouse.position.x-mouse_selectArea.min.x, 
      mouseConstraint.mouse.position.y-mouse_selectArea.min.y
    ); 
    
    var region = {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 0,
        y: 0
      }
    };
    var bound_a = {
      x: mouse_selectArea.min.x, 
      y: mouse_selectArea.min.y 
    };
    var bound_b = {
      x: mouseConstraint.mouse.position.x,
      y: mouseConstraint.mouse.position.y
    };
    region.min.x = (bound_a.x <= bound_b.x ? bound_a.x : bound_b.x);
    region.max.x = (bound_a.x > bound_b.x ? bound_a.x : bound_b.x);
    region.min.y = (bound_a.y <= bound_b.y ? bound_a.y : bound_b.y);
    region.max.y = (bound_a.y > bound_b.y ? bound_a.y : bound_b.y);
      
    let selectedBodies = Query.region(allies_Array, region);
    if( selectedBodies.length > 0 ){
      for( bod of selectedBodies ){
        // placeholder box to denote they're about to be selected
        ctx.strokeRect(bod.bounds.min.x, bod.bounds.min.y, bod.bounds.max.x-bod.bounds.min.x, bod.bounds.max.y-bod.bounds.min.y); 
      }
    }

    ctx.strokeStyle = oldStroke;
  }
}

// Query.region(mouse, bounds) for all allies, to draw moveRange (disagonal striped fill)
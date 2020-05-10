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

let mouse_selectArea = {};
let allies_Array = [];
let enemies_Array = [];
let obstacles_Array = [];

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
const RENDER_SHADOWCOLOR = '#202124';

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
        background: RENDER_SHADOWCOLOR
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

var test_enemy = Bodies.rectangle(GRID_SIZE*4, GRID_SIZE*2, 80, 88, {
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
    sprite: './assets/smt/suika.png'
  }
});
World.add(world, test_enemy);

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

//Events.on(engine, "collisionActive", function(event) {});
//all pairs colliding in the current tick
//Events.on(engine, 'collisionStart', function(event) {});

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

/*
*   Rendering
*/
var tutorial = [
  'STUB'
];

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

    for( caster of allies_Array ){
      ray_fov(ctx, caster);
    }
    draw_Graphics(ctx, enemies_Array, 'source-atop');

    draw_Shapes(ctx, obstacles_Array);
    draw_Graphics(ctx, allies_Array);
    //draw mouse cq custom cursor
    draw_UI(ctx, allies_Array);

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
  hotkey bindings, group forming?
*/

// Query.region(mouse, bounds) for all allies, to draw moveRange (disagonal striped fill)
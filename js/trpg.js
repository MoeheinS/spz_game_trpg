console.log('%cTRPG','color:#ff0000;font-family:Comic Sans MS;');

/*  Table of Contents
*   Engine setup
*   Functions
*   Lifecycle events
*   Rendering
*/

/*
*   Engine setup
*/

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

// TODO roll this into the traveling objects
debug_travelDistance = 0;
debug_travelDistance_color = 'green';

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
    case 'Shift':
      if( !game_shift ){
        game_shift = true;
      }
      break;
    default:
      console.log(e.key);
      break;
  }
});
document.addEventListener("keyup", function(e){
  switch (e.key) {
    case 'Shift':
      game_shift = false;
      break;
    default:
      break;
  }
});

function heartbeat_animations(){
  anim_tick++;
  if( anim_tick >= anim_timing ){
    anim_tick = 0;
    console.log('tick');
    for( bod of Composite.allBodies(world) ){
      // bruh. Is there a better way other than try catch?
      if( bod.custom && bod.custom.graphics && bod.custom.graphics.animation ){
        bod.custom.graphics.animation = cycleArray(bod.custom.graphics.animation);
      }
    }
  }
}

function group_Entities() {
  // make primitive groups, so I don't have to loop over ALL the objects every time i need something
  // this also lets me ignore checks for properties
  // in the future maybe use .filter() but for now it's fine
  allies_Array = [];
  enemies_Array = [];
  actors_Array = [];
  obstacles_Array = [];
  nonAllies_Array = [];
  for( bod of Composite.allBodies(world) ){
    if(bod.label == 'ally'){
      allies_Array.push(bod);
    }else if(bod.label == 'enemy'){
      enemies_Array.push(bod);
      nonAllies_Array.push(bod);
    }else if(bod.label == 'shape' || bod.label == 'obstacle' || bod.label == 'wall'){
      obstacles_Array.push(bod);
      nonAllies_Array.push(bod);
    }
  }
  
  allies_Array = sortByY(allies_Array);
  enemies_Array = sortByY(enemies_Array);
  actors_Array = allies_Array.concat(enemies_Array);
  actors_Array = sortByY(actors_Array);

  obstacles_Array = sortByY(obstacles_Array);
  nonAllies_Array = sortByY(nonAllies_Array);
}

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
Events.on(render, 'afterRender', function() {

  heartbeat_animations();
  group_Entities();

  var ctx = render.context;
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.fillStyle = RENDER_TERRAINCOLOR;
  ctx.lineWidth = 2;
  ctx.clearRect(0, 0, reWi, reHi);

  Render.startViewTransform(render);

    //var sortedBodies = sortByY(Composite.allBodies(world));

    for( caster of allies_Array ){
      ray_fov(ctx, caster);
    }
    render_debug(game_debug, render.context);
    // deprec render order
    //draw_Graphics(ctx, enemies_Array, 'source-atop');

    draw_Shapes(ctx, obstacles_Array);
    // deprec render order
    //draw_Graphics(ctx, allies_Array);

    // this way enemies also respect y-position overlapping
    for( actor of actors_Array ){
      if( actor.label == 'enemy'){
        draw_Graphics(ctx, [actor], 'source-atop');
      }else{
        draw_Graphics(ctx, [actor]);
      }
    }

    //draw mouse cq custom cursor
    draw_UI(ctx, allies_Array);

    if( game_cursor == 'select' ){ // && mouseConstraint.mouse.button === 0
      draw_mouseSelect(ctx);
    }
    render_rangefinder(ctx, mouseConstraint, null, 'red');

    //debug state rendering
    //render_debug(game_debug, render.context);
    // experimental
    if (mouseConstraint.body && mouseConstraint.mouse.button === 0){
      render_moveRange(ctx, mouseConstraint);
      if( mouseConstraint.body.label == 'ally' ){
        ray_tb(ctx, mouseConstraint);
      }
    }

  Render.endViewTransform(render);

  // render_ui.js
  render_ui(ctx);
  render_cursor(ctx);
});

/*
  option:
    render before visibility polygons; enemy with globalCompositeOperation to fully darken graphic
    render after  visibility polygons; ray from allies to enemies; 
      if it's a CLEAR loS (not counting other allies) enemy normal graphic
      else skip the normal graphic; this leaves a silhouette that bleeds into the shadows. In theory.
  hotkey bindings, group forming?
*/

// Query.region(mouse, bounds) for all allies, to draw moveRange (disagonal striped fill)
// TODO write reset function for fillStyle, strokeStyle etc...
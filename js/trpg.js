console.log('%cClashlike','color:#ff0000;font-family:Comic Sans MS;');

var grid32 = Matter.Grid.create({
  bucketHeight: 32,
  bucketWidth: 32
});

// create engine
var engine = Engine.create({
  broadphase: grid32
}),
    world = engine.world;

// create renderer
var reWi = pcWidth();
var reHi = pcHeight();
console.warn(reWi, reHi);

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
world.bounds.min.x = FIELD_SIZE * -0.5;
world.bounds.max.x = FIELD_SIZE * 1.5;
world.bounds.min.y = FIELD_SIZE * -0.5;
world.bounds.max.y = FIELD_SIZE * 1.5;

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
*   Functions
*/
document.addEventListener("keydown", function(e){
  switch (e.key) {
    case 'd':
      game_debug = !game_debug;
      break;
    case 'f':
      for( ally of units_Array ){
        if( ally.collisionFilter.category == draggable_false ){
          ally.collisionFilter.category = draggable_true;
        }else{
          ally.collisionFilter.category = draggable_false;
        }
      }
      for( b of buildings_all_Array ){
        if( b.collisionFilter.category == draggable_false ){
          b.collisionFilter.category = draggable_true;
        }else{
          b.collisionFilter.category = draggable_false;
        }
      }
      break;
    // start of waypointing
    case 'm':
      console.log(mouseConstraint);
      game_waypoints = [];
      // TODO: mouse.absolute is accurate, but rendering (when zoomed) is only accurate for mouse.position... what even.
      // I could just fix it by having the waypoint be a body instead of a coordinate, but I want to understand
      // FIXME: it's FUCKED when you move the camera too. Body is the way to go
      let coord = {x: mouseConstraint.mouse.position.x, y: mouseConstraint.mouse.position.y};
      game_waypoints.push(coord);
      break;
    case 's':
    // clear waypoints
      game_waypoints = [];
      break;
    // case 'Shift':
    //   if( !game_shift ){
    //     game_shift = true;
    //   }
    //   break;
    // case 'g':
    //   game_debug_flags.grid = !game_debug_flags.grid;
    //   break;
    default:
      console.log(e.key);
      break;
  }
});
// document.addEventListener("keyup", function(e){
//   switch (e.key) {
//     case 'Shift':
//       game_shift = false;
//       break;
//     default:
//       break;
//   }
// });

/*
*   Lifecycle events
*/

//Events.on(engine, "collisionActive", function(event) {});
//all pairs colliding in the current tick
//Events.on(engine, 'collisionStart', function(event) {});

let ticker = 0;

// Fired after engine update and all collision events
Events.on(engine, 'afterUpdate', function(event) {
  if( game_waypoints.length ){
    for( selected of game_selection ){
      cycle_movement(selected, game_waypoints[0]);
    }
  }
  // every time the ticker cycle resets
  if( ticker == 10 ){
    if( !game_debug_flags.grass ){
      game_debug_flags.grass = landScape();
    }
    for( unit of units_Array ){
      unit_sortTargets(unit);
    }
  }
  if( ticker % 15 == 0 ){
    for( unit of units_Array ){
      unit_acquireTarget(unit);
    }
  }

  for( unit of units_Array ){
    unit.custom.attackCD--;
    switch (unit.custom.state) {
      case 'ready':
        //cycle_movement(unit, unit.custom.target.position);
        unit_attackTarget(unit);
        break;
      default:
        // mildly deprecated
        break;
    }
  }
});

/*
*   Rendering
*/

// moved ctx outside of the render loop provided by Matter.js
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var groundPattern = new Object;
groundImg = new Image();
groundImg.src = './assets/gnd02.png';
groundImg.onload = function(){
    // create pattern
    groundPattern = ctx.createPattern(groundImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
}
var wastePattern = new Object;
wasteImg = new Image();
wasteImg.src = './assets/gnd01.png';
wasteImg.onload = function(){
    // create pattern
    wastePattern = ctx.createPattern(wasteImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
}

Events.on(render, 'afterRender', function() {

  heartbeat_animations();
  group_Entities();
  //var ctx = render.context;
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.fillStyle = RENDER_TERRAINCOLOR;
  ctx.lineWidth = 2;
  ctx.clearRect(0, 0, reWi, reHi);
  
  Render.startViewTransform(render);

    ctx.fillStyle = groundPattern;
    ctx.fillRect(0, 0, FIELD_SIZE, FIELD_SIZE);
    ctx.fillStyle = RENDER_TERRAINCOLOR;

    render_debug(game_debug, render.context);

    for( e of render_Array ){
      draw_Graphics([e]);
    }
    
    //debug state rendering
    //render_debug(game_debug, render.context);

    // FIXME: clean up someday
    ticker++;
    if( ticker > 119 ){
      ticker = 0;
    }
    //if( ticker == 60 ){
      for( turret of defenses_Array ){
        turret.custom.turret.attackCD--;
        if( turret.custom.turret.attackCD <= 0 ){
          turret.custom.turret.attackCD = turret.custom.turret.attackCD_base;
          turret_acqTarget(turret, (turret.custom.turret.range*GRID_SIZE));
        }
      }
    //}

    if( projectiles_Array.length ){
      for( p of projectiles_Array ){
        p.advance();
        draw_Projectile(p);
      }
    }

    // render_ui.js
    // handles portraits (UI UI) and waypoints (game UI)
    // FIXME: split in two
    render_ui(); // waypoints
    render_hpBars();
    //render_cursor();

  Render.endViewTransform(render);

  draw_UI(); // zoom level debugging
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

// meh
window.addEventListener('resize', resizeCanvas, false);
function resizeCanvas() {
  reWi = pcWidth();
  reHi = pcHeight();
  canvas.width = reWi;
  canvas.height = reHi;
}
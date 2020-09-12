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
        // showAngleIndicator: true,
        // showCollisions: true,
        // showVelocity: true,
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
var boundsScaleTarget = 1.5;
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
mouseConstraint.collisionFilter.mask = defaultCategory;
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
      game_state.debug_overlay = !game_state.debug_overlay;
      break;
    case 'q':
      document.querySelector('.UI_container').dataset.show = !JSON.parse(document.querySelector('.UI_container').dataset.show);
      break;
    case 's':
      game_state.game_phase = 'survey';
      break;
    case 'e':
      game_state.game_phase = 'engage';
      break;
    default:
      console.log(e.key);
      break;
  }
});
// document.addEventListener("keyup", function(e){
//   switch (e.key) {
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
  switch (true) {
    // every time the ticker cycle resets
    case ( ticker == 10 ):
      for( unit of units_Array ){
        unit_sortTargets(unit);
      }
      break;
    case ( ticker % 15 == 0 ):
      for( unit of units_Array ){
        unit_acquireTarget(unit);
      }
    default:
      break;
  }

  for( unit of units_Array ){
    // wack bug, TODO: remove when it no longer occurs
    // if( isNaN(unit.angle) && isNaN(unit.position.x) ){
    //   alert('A unit just escaped this reality');
    //   World.remove(world, unit, true);
    // }
    unit.custom.attackCD--;
    switch (unit.custom.state) {
      case 'ready':
        unit_attackTarget(unit);
        break;
      default:
        // mildly deprecated
        break;
    }
  }

  flowControl('check');

  // experimental last-ditch speed hack?
  //Matter.Engine.clear(engine);
});

/*
*   Rendering
*/

// moved ctx outside of the render loop provided by Matter.js
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var oobPattern = new Object;
oobImg = new Image();
oobImg.src = './assets/gnd00.png';
oobImg.onload = function(){
    // create pattern
    oobPattern = ctx.createPattern(oobImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
}
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
unitsImg = new Image();
unitsImg.src = './assets/units.png';
buildingsImg = new Image();
buildingsImg.src = './assets/buildings.png';

Events.on(render, 'afterRender', function() {

  ticker++;
  switch (true) {
    case ( ticker > TIMING_RESET ):
      ticker = 0;
      break;
    case ( ticker % ANIM_TIMING == 0 ):
      heartbeat_animations();
      if( particles_Array.length ){
        for( pa of particles_Array ){
          if( pa.lifetimeMax == -1 ){
            pa.advance_immortal();
          }else{
            pa.advance_decay();
          }
        }
      }
    default:
      break;
  }
  group_Entities();
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.fillStyle = RENDER_TERRAINCOLOR;
  ctx.lineWidth = 2;
  ctx.clearRect(0, 0, reWi, reHi);
  
  ctx.fillStyle = oobPattern;
  ctx.fillRect(0, 0, reWi, reHi);
  ctx.fillStyle = RENDER_TERRAINCOLOR;

  Render.startViewTransform(render);

    // background pattern
    ctx.fillStyle = oobPattern;
    ctx.fillRect(-2*reWi, -2*reHi, 5*reWi, 5*reHi);
    ctx.fillStyle = RENDER_TERRAINCOLOR;

    ctx.fillStyle = wastePattern;
    ctx.fillRect(0, 0, FIELD_SIZE, FIELD_SIZE);
    ctx.fillStyle = RENDER_TERRAINCOLOR;

    // particles under everything else (static terrain)
    if( particles_Array.length ){
      for( pa of particles_Array ){
        if( pa.lifetimeMax == -1 ){
          draw_Particle(pa);
        }
      }
    }

    render_grass();

    if( game_state.debug_overlay ){
      render_debug();
    }

    for( e of render_Array ){
      draw_Graphics([e]);
    }
    
    for( turret of defenses_Array ){
      turret.custom.turret.attackCD--;
      if( turret.custom.name == 'Air Elemental' ){
        turret_airPush(turret, (turret.custom.turret.range*GRID_SIZE));
      }
      if( turret.custom.turret.attackCD <= 0 ){
        //turret.custom.turret.attackCD = turret.custom.turret.attackCD_base;
        // moved this to within the function for firing an attack
        turret_acqTarget(turret, (turret.custom.turret.range*GRID_SIZE));
      }
    }

    // particles on top of everything else (explosions etc)
    if( particles_Array.length ){
      for( pa of particles_Array ){
        if( pa.lifetimeMax != -1 ){
          draw_Particle(pa);
        }
      }
    }

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
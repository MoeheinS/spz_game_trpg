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
        hasBounds: true
    }
});
Render.run(render);

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

var test_character = buildCircle(GRID_SIZE*4, GRID_SIZE*2, GRID_SIZE*0.5, {
  label: 'ally',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*4, 
      y: GRID_SIZE*2 
    }
  },
  render: {
    fillStyle: 'fuchsia',
    sprite: {
      texture: './assets/kamui.gif',
      xScale: 2,
      yScale: 2
    }
  }
});
World.add(world, test_character);

var test_character = buildCircle(reWi-(GRID_SIZE*4), reHi-(GRID_SIZE*2), GRID_SIZE*0.5, {
  label: 'ally',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi-(GRID_SIZE*4),
      y: reHi-(GRID_SIZE*2)
    }
  },
  render: {
    fillStyle: 'fuchsia',
    sprite: {
      texture: './assets/kamui.gif',
      xScale: 2,
      yScale: 2
    }
  }
});
World.add(world, test_character);

debug_travelDistance = 0;
debug_travelDistance_color = 'green';

var test_obstacle_pillar = buildCircle(GRID_SIZE*6, GRID_SIZE*6, GRID_SIZE*0.5, {
  label: 'obstacle',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*6, 
      y: GRID_SIZE*6 
    },
    render: 'sprite'
  },
  render: {
    fillStyle: 'grey',
    sprite: {
      texture: './assets/Wall_04.png'
    }
  }
});
World.add(world, test_obstacle_pillar);

var test_obstacle_shape = buildCircle(GRID_SIZE*6, GRID_SIZE*7, GRID_SIZE*0.5, {
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
      //texture: './assets/Wall_04.png'
    }
  }
});
World.add(world, test_obstacle_shape);

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
// TODO & render: turn starting position
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
]

Events.on(render, 'afterRender', function() {
  var ctx = render.context;

  Render.startViewTransform(render);

    ctx.font = '16px alber';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('v0.0.1', 100, 20);

    //debug state rendering
    render_debug(game_debug, render.context);

    var bods = Composite.allBodies(world);
    for( bod of bods ){
      if( bod.custom && bod.custom.render){
        if( bod.custom.render == 'shape' ){
          render_shape(ctx, bod);
        }
      }
    }

    if (mouseConstraint.body && mouseConstraint.mouse.button === 0){
      render_moveRange(ctx, mouseConstraint);
    }

  Render.endViewTransform(render);
});

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
}
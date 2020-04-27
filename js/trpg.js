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
let game_state = 'running';
let game_debug = true;
let game_phase = 'debug';

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
engine.enableSleeping = true;

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
  label: 'character',
  frictionAir: 1,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4
  },
  render: {
    fillStyle: 'fuchsia'
  }
});
World.add(world, test_character);
test_character.custom.anchor = test_character.position;

var startPoint = { x: GRID_SIZE*4, y: GRID_SIZE*2 };

debug_travelDistance = 0;
debug_travelDistance_color = 'green';

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
      test_character.custom.maxMove = test_character.custom.baseMove;
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
Events.on(engine, 'afterUpdate', function(event) {
  // see if there's a Matter method for doing this?
  debug_travelDistance = Math.hypot((startPoint.x - test_character.position.x) ,(startPoint.y - test_character.position.y));
  if(debug_travelDistance < test_character.custom.maxMove){
    debug_travelDistance_color = 'green';
  }else{
    debug_travelDistance_color = 'red';
  }
});

Events.on(mouseConstraint, "enddrag", function(event) {
  console.log(event);
  if(debug_travelDistance < test_character.custom.maxMove){
    //startPoint =  { x: event.mouse.mouseupPosition.x, y: event.mouse.mouseupPosition.y};
    startPoint =  { x: event.body.position.x, y: event.body.position.y};
    event.body.custom.maxMove = test_character.custom.maxMove - debug_travelDistance;
  }else{
    Body.setPosition(test_character, startPoint);
  }
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
      ctx.fillText(`vel:${bod.velocity.x.toFixed(2)};${bod.velocity.y.toFixed(2)}`, bod.position.x, bod.position.y-12);
      ctx.fillText(bod.label, bod.position.x, bod.position.y);
      ctx.fillText('slp:'+bod.isSleeping, bod.position.x, bod.position.y+12);
      ctx.fillText('stt:'+bod.isStatic, bod.position.x, bod.position.y+24);
    }
    ctx.fillStyle = debug_travelDistance_color;
    ctx.fillText('dist:'+Math.floor(debug_travelDistance / GRID_SIZE), test_character.position.x, test_character.position.y+48);
    ctx.fillText('moveRemain:'+Math.floor(test_character.custom.maxMove / GRID_SIZE), test_character.position.x, test_character.position.y+60);
  }
}

function render_moveRange(ctx, mouseConstraint){
  var movingEnt = mouseConstraint.body.position;
  if(debug_travelDistance < test_character.custom.maxMove){
    ctx.beginPath();
    ctx.arc(movingEnt.x, movingEnt.y, test_character.custom.maxMove - debug_travelDistance + GRID_SIZE*0.5, 0, Math.PI * 2, true); // Outer circle
    ctx.stroke();
  }
}
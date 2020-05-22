/*
*   Constants and settings
*/
let game_state = 'idle';
let game_debug = true;
let game_phase = 'player';
let game_shift = false;

let anim_timing = 25;
let anim_tick = 0;

let mouse_selectArea = {};
let allies_Array = [];
let enemies_Array = [];
let obstacles_Array = [];
let nonAllies_Array = [];

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
const RENDER_TERRAINCOLOR = '#ffffff';
const RENDER_UI_GREEN = '#319d59';
const RENDER_UI_RED = '#f85f4a';
const RENDER_UI_BLUE = '#00b9fb';

function render_ui(ctx){
  ctx.save();

  // beyond placeholder
  /*
    This is the layer where I want to render UI and static elements that don't scale
    Since the data that feeds this is mostly seperate from the physics engine I can move the consts here...?
  */
  ctx.strokeStyle = 'red';
  ctx.strokeRect(2, 2, 4, 4);

  ctx.restore();
}
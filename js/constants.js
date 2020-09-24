/*
*   Constants and settings
*/
let game_state = {
  "debug_overlay": false,
  "debug_buildmode": false,
  "debug_buildmode_lastAdded": [],

  "game_phase": "survey", // survey, engage, aftermath?
  "timer_deploy": false,
  "timer_missionTime": false,
  "timer_missionTime_remaining": 180,
  "timer_missionTime_renderText": "--:--",

  "initial_buildings": 0, // debug number, set on mission initialize
  "grass": false,
  "mayDeploy": true,

  "squad": [
    
  ]
};

/*
  default
  invalid
  select
*/
let units_Array = [];
let units_ground_Array = [];
let units_air_Array = [];

let walls_Array = [];
let buildings_Array = []; // no walls
let buildings_all_Array = [];
let defenses_Array = [];
let economy_Array = [];

let doodads_Array = [];

let render_Array = [];

let projectiles_Array = [];
let particles_Array = [];

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
const RENDER_GRASSCOLOR = '#62bd20';

const RENDER_UI_GREEN = '#319d59';
const RENDER_UI_RED = '#f85f4a';
const RENDER_UI_BLUE = '#00b9fb';

const UI_ALLY_HP = '#d9ee46';
const UI_ENEMY_HP = '#f3bb33';

// define our categories (as bit fields, there are up to 32 available)
var defaultCategory = 0x0001,
    ground = 0x0002,
    air = 0x0004;

const GRID_SIZE = 32;
const GRID_LIMIT = 40;
const FIELD_SIZE = GRID_LIMIT * GRID_SIZE;

const ANIM_TIMING = 25;
const TIMING_RESET = 120;

const UNIT_AIR_OFFSET = 3*GRID_SIZE;
const PROJECTILE_ARC_OFFSET = 8*GRID_SIZE;
const TURRET_FAN_FORCE = 0.2;

var building_CORE;
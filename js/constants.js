/*
*   Constants and settings
*/
let game_debug = true;
let game_phase = 'player';
let game_shift = false;
let game_cursor = 'default';

let game_state = {
  "initial_buildings": 3, // debug number, set on mission initialize
  "grass": false,
  "mayDeploy": true
};

/*
  default
  invalid
  select
*/
let game_selection = [];
let game_waypoints = [];

let anim_timing = 25;
let anim_tick = 0;

let mouse_selectArea = {};

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

let group_Index = [
  units_Array,
  units_ground_Array,
  units_air_Array,
  walls_Array,
  buildings_Array,
  buildings_all_Array,
  defenses_Array,
  economy_Array,
  doodads_Array
];

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
const RENDER_UI_GREEN = '#319d59';
const RENDER_UI_RED = '#f85f4a';
const RENDER_UI_BLUE = '#00b9fb';

const UI_ALLY_HP = '#d9ee46';
const UI_ENEMY_HP = '#f3bb33';

// define our categories (as bit fields, there are up to 32 available)
var defaultCategory = 0x0001,
    draggable_true = 0x0002,
    draggable_false = 0x0004;

const GRID_SIZE = 32;
const GRID_LIMIT = 40;
const FIELD_SIZE = GRID_LIMIT * GRID_SIZE;

var building_CORE;
/*
*   Constants and settings
*/
let game_state = 'idle';
let game_debug = true;
let game_phase = 'player';
let game_shift = false;
let game_cursor = 'default';

let game_debug_flags = { 
  "grid": false,
  "path": [],
  "path_size": 1
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
let allies_Array = [];
let enemies_Array = [];
let actors_Array = [];
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

function render_ui(){
  ctx.save();

  // beyond placeholder
  /*
    This is the layer where I want to render UI and static elements that don't scale
  */
  if( game_selection.length ){
    draw_UI_portrait(game_selection, 4, 4);
  }
  for( waypoint of game_waypoints ){
    ctx.save();
    ctx.font = '24px alber';
    ctx.textAlign = 'center';
    ctx.fillStyle = RENDER_UI_GREEN;
    ctx.fillText('x', waypoint.x, waypoint.y);
    ctx.restore();
  }

  ctx.restore();
}

function render_cursor(){
  ctx.save();

  // beyond placeholder
  /*
    Context sensitive cursor, color and shape based on action
  */
  ctx.beginPath();
  ctx.strokeStyle = RENDER_TERRAINCOLOR;
  ctx.strokeRect(mouse.absolute.x, mouse.absolute.y, 7, 7);
  ctx.arc(mouse.absolute.x+7, mouse.absolute.y+7, 7, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = RENDER_FILLCOLOR;
  ctx.arc(mouse.absolute.x+7, mouse.absolute.y+7, 5, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.arc(mouse.absolute.x+7, mouse.absolute.y+7, 3, 0, Math.PI * 2, true);
  ctx.stroke();

  switch (game_cursor) {
    case 'invalid':
      // draw an X
      ctx.strokeStyle = RENDER_UI_RED;
      ctx.lineWidth = 20;
      // ugly as sin, and rotate() is a PITA. Just get a sprite or SVG...
      ctx.translate(7, 7);
      ctx.beginPath();
      ctx.moveTo(mouse.absolute.x, mouse.absolute.y-2);
      ctx.lineTo(mouse.absolute.x, mouse.absolute.y+2);
      ctx.stroke();
      break;
    default:
      // stub
      break;
  }

  ctx.restore();
}

function draw_UI_portrait(a, xp, yp){
  ctx.save();
  let x_offset = xp;
  // you can calculate a mean dimension, but in practice it's 62-64, whereas GRID_SIZE is 67ish, so use that or 64...
  //let uixs = sortByDim(a);
  let uixs = GRID_SIZE;
  for( i of a ){
    let img = new Image();
    if( i.custom.graphics.animation ){
      img.src = i.custom.graphics.animation[0];
    }else{
      img.src = i.custom.graphics.sprite;  
    }
    var ix = x_offset;
    x_offset += xp + uixs;
    var iy = yp;
    var ixs = i.custom.graphics.sprite_dim.x;
    var iys = i.custom.graphics.sprite_dim.y;

    ctx.save();
    ctx.beginPath();
    // x, y, width, height ; ixs twice for squares
    ctx.rect(ix, iy, uixs, uixs);
    ctx.clip();
    ctx.fillStyle = RENDER_UI_GREEN;
    ctx.fill();
    // what, where, where, width, height
    ctx.drawImage(img,ix,iy,ixs,iys);
    ctx.restore();
  }
  ctx.restore();
}

// TODO: Next step; render moverange as arced area for game_selection actors.

// STUB========================================================================

// render UI elements, per actor
// hijacked for zoom factor debugging
function draw_UI(a){
  ctx.save();
  ctx.font = '12px alber';
  ctx.textAlign = 'right';
  ctx.fillStyle = 'red';
  ctx.fillText('zoom:'+boundsScaleTarget.toFixed(2), reWi-20, 20);
  ctx.restore();
  return;
  let saveStyle = ctx.strokeStyle;
  let saveFill = ctx.fillStyle;
  let saveWidth = ctx.lineWidth;
  for( i of a ){
    let i_w = wbb(i.bounds);
    let i_h = hbb(i.bounds);
    let radius = (i_w >= i_h ? i_w : i_h);
    ctx.strokeStyle = RENDER_SHADOWCOLOR;
    ctx.lineWidth = '4';
    ctx.beginPath();
    ctx.arc(i.position.x, i.position.y, radius*0.75, 0, Math.PI * 2, true); // Outer circle
    ctx.stroke();

    ctx.strokeStyle = 'green';
    ctx.lineWidth = '3';
    ctx.beginPath();
    ctx.arc(i.position.x, i.position.y, radius*0.75+1, 0, Math.PI * 2, true); // Outer circle
    ctx.stroke();

    ctx.strokeStyle = RENDER_SHADOWCOLOR;
    ctx.fillStyle = RENDER_FILLCOLOR;
    ctx.lineWidth = '1';
    let box_w = 30;
    let box_h = 16;
    ctx.fillRect(i.position.x-(box_w*0.5), i.position.y-(radius*0.75)-(box_h*0.3), box_w, box_h);
    ctx.strokeRect(i.position.x-(box_w*0.5), i.position.y-(radius*0.75)-(box_h*0.3), box_w, box_h);

    ctx.font = '12px alber';
    ctx.textAlign = 'left';
    ctx.fillStyle = RENDER_SHADOWCOLOR;
    ctx.fillText('100', i.position.x-(box_w*0.5)+4, i.position.y-(radius*0.75)-(box_h*0.3)+box_h-4);
  }
  ctx.strokeStyle = saveStyle;
  ctx.fillStyle = saveFill;
  ctx.lineWidth = saveWidth;
}
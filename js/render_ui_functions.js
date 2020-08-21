function render_ui(){
  ctx.save();

  // beyond placeholder
  /*
    This is the layer where I want to render UI and static elements that don't scale
  */
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
  ctx.strokeRect(mouse.position.x, mouse.position.y, 7, 7);
  ctx.arc(mouse.position.x+7, mouse.position.y+7, 7, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = RENDER_FILLCOLOR;
  ctx.arc(mouse.position.x+7, mouse.position.y+7, 5, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.arc(mouse.position.x+7, mouse.position.y+7, 3, 0, Math.PI * 2, true);
  ctx.stroke();

  switch (game_cursor) {
    case 'invalid':
      // draw an X
      ctx.strokeStyle = RENDER_UI_RED;
      ctx.lineWidth = 20;
      // ugly as sin, and rotate() is a PITA. Just get a sprite or SVG...
      ctx.translate(7, 7);
      ctx.beginPath();
      ctx.moveTo(mouse.position.x, mouse.position.y-2);
      ctx.lineTo(mouse.position.x, mouse.position.y+2);
      ctx.stroke();
      break;
    default:
      // stub
      break;
  }

  ctx.restore();
}

// render UI elements, per actor
// hijacked for zoom factor debugging
function draw_UI(a){
  ctx.save();
  
  ctx.font = '12px alber';
  ctx.textAlign = 'right';
  ctx.fillStyle = 'red';
  ctx.fillText('zoom:'+boundsScaleTarget.toFixed(2), reWi-20, 20);

  ctx.restore();
}

function render_hpBars(){
  ctx.save();

  for( bod of Composite.allBodies(world) ){
    if( bod.custom && bod.custom.hp_current && bod.custom.hp_current > 0 ){
      if( bod.custom.hp_current < bod.custom.hp_max ){
        ctx.fillStyle = RENDER_SHADOWCOLOR;
        ctx.fillRect(bod.position.x - 0.5*GRID_SIZE, bod.bounds.min.y - 0.75*GRID_SIZE, GRID_SIZE, 5);
        
        ctx.fillStyle = ( bod.label == 'ally' ? UI_ALLY_HP : UI_ENEMY_HP );
        let barWidth = ( bod.custom.hp_current / bod.custom.hp_max ) * GRID_SIZE;
        ctx.fillRect(bod.position.x - 0.5*GRID_SIZE +1, bod.bounds.min.y - 0.75*GRID_SIZE +1, barWidth, 3);        
      }
    }
  }
  
  ctx.restore();
}
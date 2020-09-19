function render_ui(){
  ctx.save();

  // beyond placeholder
  /*
    This is the layer where I want to render UI and static elements that don't scale
  */

  render_cursor();

  ctx.restore();
}

function render_progress(){
  let progress_pct = ( game_state.initial_buildings ? 100 - Math.floor( buildings_Array.length / game_state.initial_buildings * 100 ) : 0 );

  if( !building_CORE ){
    return;
  }

  // star tracker
  let ui_gradient = ctx.createLinearGradient( 1*GRID_SIZE,0, 4*GRID_SIZE,0);
  ui_gradient.addColorStop(0, RENDER_SHADOWCOLOR);
  ui_gradient.addColorStop(1, RENDER_SHADOWCOLOR+'55');
  ctx.fillStyle = ui_gradient;

  ctx.beginPath();
  ctx.arc(1*GRID_SIZE, 1.25*GRID_SIZE, 0.375*GRID_SIZE, Math.PI * 1.5, Math.PI * 0.5, true);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(3.75*GRID_SIZE, 1.25*GRID_SIZE, 0.375*GRID_SIZE, Math.PI * 0.5, Math.PI * 1.5, true);
  ctx.fill();

  ctx.fillRect( 1*GRID_SIZE, 0.875*GRID_SIZE, 2.75*GRID_SIZE, 0.75*GRID_SIZE );

  ctx.imageSmoothingEnabled = false;

  // bronze star for 50% destruction
  ctx.fillStyle = ( progress_pct >= 50 ? '#9c4a00' : RENDER_SHADOWCOLOR );
  ctx.beginPath();
  ctx.arc(1*GRID_SIZE, 1.25*GRID_SIZE, 0.5*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.fill();
  if( progress_pct >= 50 ){
    ctx.drawImage(buildingsImg, 560, 416, 16, 16, 0.5*GRID_SIZE, 0.7*GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }

  //building_CORE aka Composite.get(world, building_CORE.id, 'body')
  // silver star for core destruction
  ctx.fillStyle = ( building_CORE.custom.hp_current <= 0 ? '#9395ab' : RENDER_SHADOWCOLOR );
  ctx.beginPath();
  ctx.arc(2.125*GRID_SIZE, 1.25*GRID_SIZE, 0.5*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.fill();
  if( building_CORE.custom.hp_current <= 0 ){
    ctx.drawImage(buildingsImg, 576, 416, 16, 16, 1.625*GRID_SIZE, 0.7*GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }

  // gold star for 100% destruction
  ctx.fillStyle = ( progress_pct == 100 ? '#ffa347' : RENDER_SHADOWCOLOR );
  ctx.beginPath();
  ctx.arc(3.25*GRID_SIZE, 1.25*GRID_SIZE, 0.5*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.fill();
  if( progress_pct == 100 ){
    ctx.drawImage(buildingsImg, 592, 416, 16, 16, 2.75*GRID_SIZE, 0.7*GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }

  // percentage tracker
  ctx.fillStyle = ui_gradient;

  ctx.beginPath();
  ctx.arc(1*GRID_SIZE, 2.75*GRID_SIZE, 0.375*GRID_SIZE, Math.PI * 1.5, Math.PI * 0.5, true);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(3.75*GRID_SIZE, 2.75*GRID_SIZE, 0.375*GRID_SIZE, Math.PI * 0.5, Math.PI * 1.5, true);
  ctx.fill();

  ctx.fillRect( 1*GRID_SIZE, 2.375*GRID_SIZE, 2.75*GRID_SIZE, 0.75*GRID_SIZE );

  ctx.font = '2rem zelda';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RENDER_TERRAINCOLOR;
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.strokeText( progress_pct/*+'%'*/, 3*GRID_SIZE, 2.625*GRID_SIZE);
  ctx.fillText( progress_pct/*+'%'*/, 3*GRID_SIZE, 2.625*GRID_SIZE);
  ctx.font = '1.25rem zelda';
  ctx.strokeText('%', 3.75*GRID_SIZE, 2.75*GRID_SIZE);
  ctx.fillText('%', 3.75*GRID_SIZE, 2.75*GRID_SIZE);
}

function render_cursor(){

  switch (game_state.game_phase) {
    case 'survey':
      return game_state.mayDeploy = false;
    case 'engage':
      break;
    default:
      break;
  }

  ctx.save();

  let distanceCheck = true;

  for( bld of buildings_all_Array ){
    if( wbb(bld.bounds) > GRID_SIZE || hbb(bld.bounds) > GRID_SIZE ){
      for( b_vert of bld.vertices ){
        if( distanceCheck ){
          distanceCheck = ( getDistance(mouse.position, 
            {
              x: b_vert.x+(0.5*GRID_SIZE * ( b_vert.x > bld.position.x ? -1 : 1 ) ), 
              y: b_vert.y+(0.5*GRID_SIZE * ( b_vert.y > bld.position.y ? -1 : 1 ))
            }
          ) <= 2*GRID_SIZE ? false : true );  
        }else{
          break;
        }
      }
    }
    // for( b_vrt of bld.vertices ){
    //   if( distanceCheck ){
    //     distanceCheck = ( getDistance(mouse.position, b_vrt) <= 2*GRID_SIZE ? false : true );
    //   }
    // }
    if( distanceCheck ){
      distanceCheck = ( getDistance(mouse.position, bld.position) <= 2*GRID_SIZE ? false : true );
    }else{
      break;
    }
  }
  for( doo of doodads_Array ){
    if( doo.label2 == 'rubble' ){
      // for( d_vrt of doo.vertices ){
      //   if( distanceCheck ){
      //     distanceCheck = ( getDistance(mouse.position, d_vrt) <= 2*GRID_SIZE ? false : true );
      //   }
      // }
      if( distanceCheck ){
        distanceCheck = ( getDistance(mouse.position, doo.position) <= 2*GRID_SIZE ? false : true );
      }
    }
  }

  switch (distanceCheck) {
    case (mouse.position.x < 0):
    case (mouse.position.x > FIELD_SIZE):
    case (mouse.position.y > FIELD_SIZE):
    case (mouse.position.y < 0):
      distanceCheck = false;
      break;
    default:
      break;
  }

  game_state.mayDeploy = distanceCheck;

  ctx.drawImage(unitsImg, 576, ( distanceCheck ? 80 : 32 ), 32, 32, mouse.position.x - mouse.position.x % GRID_SIZE , mouse.position.y - mouse.position.y % GRID_SIZE, 2*GRID_SIZE, 2*GRID_SIZE);

  ctx.restore();
}

// render UI elements, per actor
// hijacked for zoom factor debugging
function draw_UI(a){
  ctx.save();
  
  ctx.font = 'bold 16px alber';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeText('zoom:'+boundsScaleTarget.toFixed(2), reWi-20, 20);
  ctx.fillText('zoom:'+boundsScaleTarget.toFixed(2), reWi-20, 20);
  ctx.strokeText('fps:'+Math.floor(runner.fps), reWi-20, 36);
  ctx.fillText('fps:'+Math.floor(runner.fps), reWi-20, 36);

  ctx.restore();

  switch (game_state.game_phase) {
    case 'survey':
      render_menuButton(game_state.game_phase);
      render_survey();
      if( game_state.timer_deploy !== false ){
        render_countdown();
      }
      break;
    case 'engage':
      render_menuButton(game_state.game_phase);
      render_progress();
      render_battleTime();
      break;
    default:
      break;
  }
}

function render_countdown(){

  if( game_state.timer_deploy === false ){
    return;
  }
  flowControl('countdown');

  ctx.save();

  let bg_gradient = ctx.createRadialGradient( // x0, y0, r0, x1, y1, r1
    reWi*0.5, reHi*0.5, reHi*0.125,
    reWi*0.5, reHi*0.5, reHi*0.25
  );
  bg_gradient.addColorStop(0, '#ffffffdd');
  bg_gradient.addColorStop(0.75, '#ffdf8c77');
  bg_gradient.addColorStop(1, '#ffb43422');

  ctx.fillStyle = bg_gradient;
  ctx.moveTo(reWi*0.5, reHi*0.5);
  ctx.arc(reWi*0.5, reHi*0.5, reHi*0.25, 0, Math.PI*2, true);
  ctx.fill();

  let text_gradient = ctx.createLinearGradient( // x0, y0, x1, y1
    0, reHi*0.35, 
    0, reHi*0.65
  );
  text_gradient.addColorStop(0, '#ffffff');
  text_gradient.addColorStop(0.5, '#ffdf8c');
  text_gradient.addColorStop(1, '#ffb434');
  
  ctx.fillStyle = text_gradient;
  ctx.font = 'bold '+(reHi/2)+'px zelda';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = reHi*0.0375;
  ctx.strokeText(( game_state.timer_deploy ? Math.floor(game_state.timer_deploy) : '' ), reWi/2, reHi/2);
  ctx.fillText(( game_state.timer_deploy ? Math.floor(game_state.timer_deploy) : '' ), reWi/2, reHi/2);

  ctx.restore();
}

function render_menuButton(phase){
  ctx.save();

  ctx.imageSmoothingEnabled = false;

  let ui_gradient = ctx.createLinearGradient( 1*GRID_SIZE,0, 4*GRID_SIZE,0);
  ui_gradient.addColorStop(0, RENDER_SHADOWCOLOR);
  ui_gradient.addColorStop(1, RENDER_SHADOWCOLOR+'55');

  // airship retreat button
  ctx.strokeStyle = ui_gradient;
  ctx.fillStyle = 'lightblue';//RENDER_TERRAINCOLOR;
  ctx.beginPath();
  ctx.arc(2.25*GRID_SIZE, 5.125*GRID_SIZE, 1.25*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();

  switch (phase) {
    case 'survey':
      ctx.drawImage(buildingsImg, 864, 16, 48, 48, 0.375*GRID_SIZE, 2.875*GRID_SIZE, 3*GRID_SIZE, 3*GRID_SIZE);
      ctx.drawImage(buildingsImg, 976, 64, 32, 32, 0.125*GRID_SIZE, 3.25*GRID_SIZE, 3*GRID_SIZE, 3*GRID_SIZE);
      break;
    case 'engage':
      ctx.drawImage(buildingsImg, ( ticker % 15 < 8 ? 672 : 704 ), 368, 32, 32, 1.25*GRID_SIZE, 3.75*GRID_SIZE, 2*GRID_SIZE, 2*GRID_SIZE);
      break;
    default:
      break;
  }

  ctx.restore();
}

function render_survey(){
  // stub
}

function render_hpBars(){
  ctx.save();

  for( bod of Composite.allBodies(world) ){
    if( bod.custom && bod.custom.hp_current && bod.custom.hp_current > 0 ){
      if( bod.custom.hp_current < bod.custom.hp_max ){
        ctx.fillStyle = RENDER_SHADOWCOLOR;
        ctx.fillRect(bod.position.x - 0.5*GRID_SIZE, bod.bounds.min.y - 0.75*GRID_SIZE - ( bod.custom.moveType == 'air' ? UNIT_AIR_OFFSET : 0 ), GRID_SIZE, 5);
        
        ctx.fillStyle = ( bod.label == 'ally' ? UI_ALLY_HP : UI_ENEMY_HP );
        let barWidth = ( bod.custom.hp_current / bod.custom.hp_max ) * GRID_SIZE;
        ctx.fillRect(bod.position.x - 0.5*GRID_SIZE +1, bod.bounds.min.y - 0.75*GRID_SIZE +1 - ( bod.custom.moveType == 'air' ? UNIT_AIR_OFFSET : 0 ), barWidth, 3);        
      }
    }
  }
  
  ctx.restore();
}

function render_battleTime(){
  if( game_state.timer_missionTime ){
    ctx.save();
  
    ctx.font = 'bold 2rem zelda';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.strokeText(game_state.timer_missionTime_renderText, reWi/2, 20);
    ctx.fillText(game_state.timer_missionTime_renderText, reWi/2, 20);
  
    ctx.restore();
  }
}
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
  let progress_pct = 100 - Math.floor( buildings_Array.length / game_state.initial_buildings * 100 );

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
  //ctx.strokeStyle = '#9c4a00';
  ctx.strokeStyle = ( progress_pct >= 50 ? RENDER_TERRAINCOLOR : RENDER_SHADOWCOLOR );
  ctx.beginPath();
  ctx.arc(1*GRID_SIZE, 1.25*GRID_SIZE, 0.5*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.drawImage(buildingsImg, ( progress_pct >= 50 ? 576 : 624 ), 384, 16, 16, 0.5*GRID_SIZE, 0.7*GRID_SIZE, GRID_SIZE, GRID_SIZE);

  //building_CORE
  //Composite.get(world, building_CORE.id, 'body')
  // silver star for core destruction
  // ctx.strokeStyle = '#696969';
  ctx.strokeStyle = ( building_CORE.custom.hp_current <= 0 ? RENDER_TERRAINCOLOR : RENDER_SHADOWCOLOR );
  ctx.beginPath();
  ctx.arc(2.125*GRID_SIZE, 1.25*GRID_SIZE, 0.5*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.drawImage(buildingsImg, ( building_CORE.custom.hp_current <= 0 ? 640 : 624 ), 384, 16, 16, 1.625*GRID_SIZE, 0.7*GRID_SIZE, GRID_SIZE, GRID_SIZE);

  // gold star for 100% destruction
  // ctx.strokeStyle = '#cd7320';
  ctx.strokeStyle = ( progress_pct == 100 ? RENDER_TERRAINCOLOR : RENDER_SHADOWCOLOR );
  ctx.beginPath();
  ctx.arc(3.25*GRID_SIZE, 1.25*GRID_SIZE, 0.5*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.drawImage(buildingsImg, ( progress_pct == 100 ? 560 : 624 ), 384, 16, 16, 2.75*GRID_SIZE, 0.7*GRID_SIZE, GRID_SIZE, GRID_SIZE);

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
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = RENDER_TERRAINCOLOR;
  ctx.strokeStyle = RENDER_SHADOWCOLOR;
  ctx.strokeText('%', 3.75*GRID_SIZE, 2.75*GRID_SIZE);
  ctx.fillText('%', 3.75*GRID_SIZE, 2.75*GRID_SIZE);

  // airship retreat button
  ctx.strokeStyle = ui_gradient;
  ctx.fillStyle = 'lightblue';//RENDER_TERRAINCOLOR;
  ctx.beginPath();
  ctx.arc(2.25*GRID_SIZE, 5.125*GRID_SIZE, 1.25*GRID_SIZE, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();
  
  ctx.drawImage(buildingsImg, ( ticker % 15 < 8 ? 672 : 704 ), 368, 32, 32, 1.25*GRID_SIZE, 3.75*GRID_SIZE, 2*GRID_SIZE, 2*GRID_SIZE);
}

function render_cursor(){
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

  game_state.mayDeploy = distanceCheck;

  ctx.drawImage(unitsImg, 576, ( distanceCheck ? 80 : 32 ), 32, 32, mouse.position.x - mouse.position.x % GRID_SIZE , mouse.position.y - mouse.position.y % GRID_SIZE, 2*GRID_SIZE, 2*GRID_SIZE);

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

  render_progress();

  ctx.restore();
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
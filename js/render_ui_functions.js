function render_ui(){
  ctx.save();

  // beyond placeholder
  /*
    This is the layer where I want to render UI and static elements that don't scale
  */

 render_cursor();

  ctx.restore();
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

  game_debug_flags.mayDeploy = distanceCheck;

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
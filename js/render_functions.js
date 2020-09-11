// render arbitrary information to help me debug
function render_debug(){
  ctx.save();

  ctx.font = '16px alber';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('v0.0.3', 100, -100);

  ctx.fillText('hold rclick and move to pan camera', 100, -120);
  ctx.fillText('mousewheel to zoom', 100, -140);
  ctx.fillText('press f to toggle free-drag', 100, -160);
  ctx.fillText('press r to reset allowed movement range', 100, -180);
  ctx.fillText('press d to toggle debug info', 100, -200);

  ctx.strokeStyle = RENDER_FILLCOLOR;
  var gimmeGrid = FIELD_SIZE/GRID_SIZE;
  for( let hi = 0; hi < gimmeGrid; hi++ ){
    for( let vi = 0; vi < gimmeGrid; vi++ ){
    ctx.strokeRect(hi*GRID_SIZE, vi*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }

  // 1 GRID_SIZE square
  ctx.save();
  ctx.strokeStyle = RENDER_TERRAINCOLOR;
  ctx.setLineDash([]);
  ctx.strokeRect(110, -230, GRID_SIZE, GRID_SIZE);
  ctx.restore();

  ctx.font = '10px alber';
  ctx.fillStyle = RENDER_SHADOWCOLOR;
  var bods = Composite.allBodies(world);
  for( bod of bods ){
    ctx.fillText(`id:${bod.id}`, bod.bounds.min.x-10, bod.bounds.min.y+12);
    ctx.fillText(bod.label, bod.bounds.min.x-10, bod.bounds.min.y+24);

    if( bod.custom && ( bod.label == 'ally' )){
      // for when autonomous movement is added
      // This works if moveToPoint() sets body angle
      //ctx.fillText('angle:'+((180*bod.angle/Math.PI)+180).toFixed(2), bod.bounds.min.x-10, bod.bounds.min.y+60);

      ctx.fillText('hp:'+bod.custom.hp_current, bod.bounds.min.x-10, bod.bounds.min.y+0);
      ctx.fillText('target:'+bod.custom.target.id, bod.bounds.min.x-10, bod.bounds.min.y+36);
      ctx.fillText('state:'+bod.custom.state, bod.bounds.min.x-10, bod.bounds.min.y+48);
      ctx.fillText('angle:'+Math.floor(((180*bod.angle/Math.PI)+180)/45), bod.bounds.min.x-10, bod.bounds.min.y+60);
      ctx.fillText('speed:'+bod.speed.toFixed(2), bod.bounds.min.x-10, bod.bounds.min.y+72);
      if(bod.region){
        ctx.fillText(`gridPos: ${bod.region.startRow},${bod.region.startCol}`, bod.bounds.min.x-10, bod.bounds.min.y+84);
      }
      ctx.fillText('mass:'+bod.mass.toFixed(2), bod.bounds.min.x-10, bod.bounds.min.y+96);

      if( bod.custom.target ){
        ctx.save();
        ctx.strokeStyle = RENDER_SHADOWCOLOR;

        ctx.beginPath();
        ctx.moveTo( bod.vertices[0].x, bod.vertices[0].y);
        if( bod.custom.waypoint.length ){
          ctx.lineTo( bod.custom.waypoint[0].x*GRID_SIZE + 0.5*GRID_SIZE, bod.custom.waypoint[0].y*GRID_SIZE + 0.5*GRID_SIZE);
          ctx.arc(bod.custom.waypoint[0].x*GRID_SIZE + 0.5*GRID_SIZE, bod.custom.waypoint[0].y*GRID_SIZE + 0.5*GRID_SIZE, 0.125*GRID_SIZE, 0, Math.PI * 2, true);
        }
        ctx.lineTo( bod.custom.target.position.x, bod.custom.target.position.y);

        ctx.lineTo( bod.custom.target.position.x, bod.custom.target.position.y);
        ctx.stroke();
        
        ctx.restore();
      }
    }
    ctx.fillStyle = RENDER_UI_RED;
    ctx.fillRect(bod.bounds.min.x, bod.bounds.min.y, wbb(bod.bounds), hbb(bod.bounds));
    ctx.fillStyle = RENDER_SHADOWCOLOR;
  }

  ctx.restore();
}

// visualize pathfinding
function render_debug_path(path, gsu){
  ctx.save();
  ctx.strokeStyle = RENDER_SHADOWCOLOR;

  ctx.beginPath();
  ctx.moveTo((path[0].x*gsu)+gsu/2, (path[0].y*gsu)+gsu/2);
  for( step of path ){
    ctx.lineTo((step.x*gsu)+gsu/2, (step.y*gsu)+gsu/2);
    ctx.stroke();
  }

  ctx.restore();
}

// render shapes from vertices of actors, for terrain
// in the future add an arg to override fillStyle with an image based pattern?
function draw_Shapes(a){
  ctx.save();
  ctx.fillStyle = RENDER_TERRAINCOLOR;
  for( i of a ){
    ctx.beginPath();
    ctx.moveTo(i.vertices[0].x, i.vertices[0].y);
    for(v of i.vertices){
      ctx.lineTo(v.x, v.y);
    }
    ctx.lineTo(i.vertices[0].x, i.vertices[0].y);
    ctx.fill();
  }
  ctx.restore();
}

// render sprites or animations, per actor, with optional override for globalCompositeOperation
function draw_Graphics(a, mode){
  ctx.save();
  for( i of a ){
    let img = new Image();
    img.src = i.custom.graphics.sprite;

    var ixs = i.custom.graphics.sprite_dim.x;
    var iys = i.custom.graphics.sprite_dim.y;

    var dx = (i.bounds.max.x - i.bounds.min.x) *2;
        //dx = ixs*2;
    var dy = (i.bounds.max.y - i.bounds.min.y) *2;
        //dy = iys*2;
    var ix = i.position.x - ixs;
    var iy = i.position.y - iys*1.5;

    switch (i.custom.graphics.renderMode) {
      case 'sheet_directional':
        // wiggle wiggle
        //Body.rotate(i, 0.02);

        //which direction? as the clock goes, 1 2, 3 4, 5 6, 7 0
        var bod_angle = Math.floor(((180*i.angle/Math.PI)+180)/45);
        switch (bod_angle) {
          case 1:
          case 2:
            var sx = i.custom.graphics.sheet_up[0].x;
            var sy = i.custom.graphics.sheet_up[0].y;
            break;
          case 3:
          case 4:
            var sx = i.custom.graphics.sheet_right[0].x;
            var sy = i.custom.graphics.sheet_right[0].y;
            break;
          case 7:
          case 0:
            var sx = i.custom.graphics.sheet_left[0].x;
            var sy = i.custom.graphics.sheet_left[0].y;
            break;
          default: // 5, 6
            var sx = i.custom.graphics.sheet_idle[0].x;
            var sy = i.custom.graphics.sheet_idle[0].y;
            break;
        }
        if( !Math.floor(i.speed) ){
          var sx = i.custom.graphics.sheet_idle[0].x;
          var sy = i.custom.graphics.sheet_idle[0].y;
        }

        // shadows for air units
        if( i.label == 'ally' && i.custom.moveType == 'air' ){
          ctx.fillStyle = RENDER_SHADOWCOLOR;
          ctx.fillRect(i.position.x - 0.25*GRID_SIZE, i.bounds.min.y, 0.5*dx, 0.5*dy);
          iy = iy-UNIT_AIR_OFFSET;
        }

        // source, source x, y, width, height, destination x, y, width x, y
        ctx.drawImage(img, sx, sy, ixs, iys, ix, iy, dx, dy);
        break;
      case 'sheet_animation':
      case 'sheet_static':
        var sx = i.custom.graphics.sheet_idle[0].x;
        var sy = i.custom.graphics.sheet_idle[0].y;

        // used to be buildings only, but now works for doodads too
        //if( i.label == 'building' ){
          //iy = i.position.y - iys;
          iy = i.bounds.max.y - ( dy/2 ) - ( i.custom.graphics.sprite_offset && i.custom.graphics.sprite_offset.y ? i.custom.graphics.sprite_offset.y : 0 );
        //}

        dx = ixs*2;
        dy = iys*2;

        // source, source x, y, width, height, destination x, y, width x, y
        ctx.drawImage(img, sx, sy, ixs, iys, ix, iy, dx, dy);
        break;
      default:
        var ix = i.position.x - (i.custom.graphics.sprite_dim.x/2);
        var iy = i.bounds.max.y - (i.custom.graphics.sprite_dim.y);
        var ixs = i.custom.graphics.sprite_dim.x;
        var iys = i.custom.graphics.sprite_dim.y;
        if(mode){
          ctx.globalCompositeOperation = mode;
          // what, where, where, width, height
          ctx.drawImage(img,ix,iy,ixs,iys);
          // probably unnecessary with save and restore, but just in case
          ctx.globalCompositeOperation = 'source-over';
        }else{
          // what, where, where, width, height
          ctx.drawImage(img,ix,iy,ixs,iys);
        }
        break;
    }
    // specifically for the CORE
    // if( building_CORE ){
    //   if( i.id == building_CORE.id ){
    //     ctx.font = `${0.5*GRID_SIZE}px comic sans ms`;
    //     ctx.textAlign = 'center';
    //     ctx.fillStyle = '#1880f8';
    //     ctx.fillText(i.custom.level+1, i.bounds.min.x+GRID_SIZE, i.bounds.min.y+1.1*GRID_SIZE);
    //   }
    // }
  }

  // ctx.fillStyle = '#ff000033';
  // ctx.fillRect(i.bounds.min.x, i.bounds.min.y, (i.bounds.max.x - i.bounds.min.x), (i.bounds.max.y - i.bounds.min.y));

  ctx.restore();
}

function heartbeat_animations(){
  console.log('tick');
  for( bod of Composite.allBodies(world) ){
    // bruh. Is there a better way other than try catch?
    if( bod.custom && bod.custom.graphics && bod.custom.graphics.renderMode ){
      if( bod.custom.graphics.sheet_idle ){
        bod.custom.graphics.sheet_idle = cycleArray(bod.custom.graphics.sheet_idle);
      }
      if( bod.custom.graphics.sheet_right ){
        bod.custom.graphics.sheet_right = cycleArray(bod.custom.graphics.sheet_right);
      }
      if( bod.custom.graphics.sheet_left ){
        bod.custom.graphics.sheet_left = cycleArray(bod.custom.graphics.sheet_left);
      }
      if( bod.custom.graphics.sheet_up ){
        bod.custom.graphics.sheet_up = cycleArray(bod.custom.graphics.sheet_up);
      }
    }
  }
}

function render_grass(){
  if( game_state.grass.length ){
    // beginning of 'raised platform grass effect'
    for( let hi = 0; hi < 40; hi++ ){
			for( let vi = 0; vi < 40; vi++ ){
        // 0.5 for walls and terrain, 1 for everything else
				if( game_state.grass[hi][vi] ){
          ctx.beginPath();
          ctx.fillStyle = oobPattern;
          ctx.arc((vi*GRID_SIZE)+(game_state.grass[hi][vi]*GRID_SIZE), 12+(hi*GRID_SIZE)+(game_state.grass[hi][vi]*GRID_SIZE), 2*GRID_SIZE, 0, Math.PI * 2, true);
          ctx.fill();
        }
			}
    }
    // end of experimental effect
    for( let hi = 0; hi < 40; hi++ ){
			for( let vi = 0; vi < 40; vi++ ){
        // 0.5 for walls and terrain, 1 for everything else
				if( game_state.grass[hi][vi] ){
          ctx.beginPath();
          ctx.fillStyle = groundPattern;
          ctx.arc((vi*GRID_SIZE)+(game_state.grass[hi][vi]*GRID_SIZE), (hi*GRID_SIZE)+(game_state.grass[hi][vi]*GRID_SIZE), 2*GRID_SIZE, 0, Math.PI * 2, true);
          ctx.fill();
        }
			}
		}
  }
  for( bld of buildings_all_Array ){
    if( bld.custom.name == 'Mermage' ){
      ctx.beginPath();
      ctx.fillStyle = oobPattern;
      ctx.arc(bld.position.x, bld.position.y-3, 1*GRID_SIZE-3, 0, Math.PI * 2, true);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#415aff';
      ctx.arc(bld.position.x, bld.position.y+3, 1*GRID_SIZE-3, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
  /* This is the alternative method
  for( building of buildings_all_Array ){
    if ( building.region && building.region.startRow ){
      for( let hi = building.region.startRow; hi < building.region.endRow; hi++ ){
        for( let vi = building.region.startCol; vi < building.region.endCol; vi++ ){
          ctx.fillStyle = groundPattern;
          ctx.beginPath();
          ctx.arc((vi*GRID_SIZE)+( building.custom.category == 'wall' || building.custom.category == 'terrain' ? 0.5*GRID_SIZE : 1*GRID_SIZE ), (hi*GRID_SIZE)+( building.custom.category == 'wall' || building.custom.category == 'terrain' ? 0.5*GRID_SIZE : 1*GRID_SIZE ), 2*GRID_SIZE, 0, Math.PI * 2, true);
          ctx.fill();
        }
      }
    }
  }
  */
}
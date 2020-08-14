// render arbitrary information to help me debug
function render_debug(game_debug){
  ctx.save();
  if(game_debug){
    ctx.font = '16px alber';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('v0.0.3', 100, -100);
    ctx.fillText(game_state, 100, -80);
    ctx.fillText('hold rclick and move to pan camera', 100, -120);
    ctx.fillText('mousewheel to zoom', 100, -140);
    ctx.fillText('press f to toggle free-drag', 100, -160);
    ctx.fillText('press r to reset allowed movement range', 100, -180);
    ctx.fillText('press d to toggle debug info', 100, -200);
    ctx.fillText('hold shift and rclick to rotate the screen', 100, -220);

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

        ctx.fillText('target:'+bod.custom.target.id, bod.bounds.min.x-10, bod.bounds.min.y+36);
        ctx.fillText('state:'+bod.custom.state, bod.bounds.min.x-10, bod.bounds.min.y+48);
        ctx.fillText('angle:'+Math.floor(((180*bod.angle/Math.PI)+180)/45), bod.bounds.min.x-10, bod.bounds.min.y+60);
        ctx.fillText('speed:'+bod.speed.toFixed(2), bod.bounds.min.x-10, bod.bounds.min.y+72);
        if(bod.region){
          ctx.fillText(`gridPos: ${bod.region.startRow},${bod.region.startCol}`, bod.bounds.min.x-10, bod.bounds.min.y+84);
        }
      }
      ctx.fillStyle = RENDER_UI_RED;
      ctx.fillRect(bod.bounds.min.x, bod.bounds.min.y, wbb(bod.bounds), hbb(bod.bounds));
      ctx.fillStyle = RENDER_SHADOWCOLOR;
    }
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
        // source, source x, y, width, height, destination x, y, width x, y
        ctx.drawImage(img, sx, sy, ixs, iys, ix, iy, dx, dy);
        break;
      case 'sheet_animation':
      case 'sheet_static':
        var sx = i.custom.graphics.sheet_idle[0].x;
        var sy = i.custom.graphics.sheet_idle[0].y;

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
  }

  // ctx.fillStyle = '#ff000033';
  // ctx.fillRect(i.bounds.min.x, i.bounds.min.y, (i.bounds.max.x - i.bounds.min.x), (i.bounds.max.y - i.bounds.min.y));

  ctx.restore();
}

function draw_Projectile(i){
  ctx.save();

  let img = new Image();
  img.src = i.graphics.sprite;

  if( i.graphics.sheet ){

    let whichSprite = Math.round( (i.lifetime % 10) / 10 );

    var sx = i.graphics.sheet[whichSprite].x;
    var sy = i.graphics.sheet[whichSprite].y;
    var sw = i.graphics.sprite_dim.x;
    var sh = i.graphics.sprite_dim.y;

    var dw = sw*2;
    var dh = sh*2;
    var dx = i.position.x - (dw/2);
    var dy = i.position.y - (dh/2);
    
    // source, source x, y, source width, height, destination x, y, width x, y
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  ctx.restore();
}

function heartbeat_animations(){
  anim_tick++;
  if( anim_tick >= anim_timing ){
    anim_tick = 0;
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
}
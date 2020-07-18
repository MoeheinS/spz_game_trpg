// render arbitrary information to help me debug
function render_debug(game_debug, ctx){
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

    // 1 GRID_SIZE square
    ctx.save();
    ctx.strokeStyle = RENDER_TERRAINCOLOR;
    ctx.setLineDash([]);
    ctx.strokeRect(110, -230, GRID_SIZE, GRID_SIZE);
    ctx.restore();

    ctx.font = '10px alber';
    var bods = Composite.allBodies(world);
    for( bod of bods ){
      ctx.fillText(`id:${bod.id}`, bod.bounds.min.x-10, bod.bounds.min.y+12);
      ctx.fillText(bod.label, bod.bounds.min.x-10, bod.bounds.min.y+24);

      if( bod.custom && bod.custom.maxMove && ( bod.label == 'ally' )){
        ctx.save();

        ctx.fillStyle = RENDER_UI_GREEN;
        ctx.fillText('move_max:'+Math.floor(bod.custom.baseMove / GRID_SIZE), bod.bounds.min.x-10, bod.bounds.min.y+36);
        ctx.fillText('moved:'+Math.floor(bod.custom.maxMove / GRID_SIZE), bod.bounds.min.x-10, bod.bounds.min.y+48);
        // for when autonomous movement is added
        // This works if moveToPoint() sets body angle
        //ctx.fillText('angle:'+((180*bod.angle/Math.PI)+180).toFixed(2), bod.bounds.min.x-10, bod.bounds.min.y+60);
        //ctx.fillText('speed:'+bod.speed.toFixed(2), bod.bounds.min.x-10, bod.bounds.min.y+72);

        ctx.beginPath();
        ctx.arc(bod.custom.startPoint.x, bod.custom.startPoint.y, bod.custom.maxMove+(GRID_SIZE*0.5)+2, 0, Math.PI * 2, true);
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.restore();
      }
    }
  }
  ctx.restore();
}

// render shapes from vertices of actors, for terrain
// in the future add an arg to override fillStyle with an image based pattern?
function draw_Shapes(ctx, a){
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
function draw_Graphics(ctx, a, mode){
  ctx.save();
  for( i of a ){
    let img = new Image();
    if( i.custom.graphics.animation ){
      img.src = i.custom.graphics.animation[0];
    }else{
      img.src = i.custom.graphics.sprite;  
    }
    if( i.custom.graphics.sheet ){
      var ix = i.bounds.min.x;
      var iy = i.bounds.min.y;
      var ixs = i.custom.graphics.sprite_dim.x;
      var iys = i.custom.graphics.sprite_dim.y;
      var sx = i.custom.graphics.sheet_idle[0].x;
      var sy = i.custom.graphics.sheet_idle[0].y;
      var dx = i.bounds.max.x - i.bounds.min.x;
      var dy = i.bounds.max.y - i.bounds.min.y;
      // angle, angularSpeed, angularVelocity
      // TODO: draw the proper image based on direction of body
      // also dx and dy fuck up on rotation because the diagonal is wider, so either hardcode 32 or include a unit_dim property
      ctx.drawImage(img, sx, sy, ixs, iys, ix, iy, dx, dy);
    }else{
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
    }
  }
  ctx.restore();
}
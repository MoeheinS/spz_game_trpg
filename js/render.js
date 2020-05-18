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
    if( i.custom.animation ){
      img.src = i.custom.animation[0];
    }else{
      img.src = i.custom.sprite;  
    }
    var ix = i.bounds.min.x;
    var iy = i.bounds.min.y;
    var ixs = Math.abs(i.bounds.max.x - i.bounds.min.x);
    var iys = Math.abs(i.bounds.max.y - i.bounds.min.y);
    if(mode){
      ctx.globalCompositeOperation = mode;
      ctx.drawImage(img,ix,iy,ixs,iys);
      // probably unnecessary with save and restore, but just in case
      ctx.globalCompositeOperation = 'source-over';
    }else{
      ctx.drawImage(img,ix,iy,ixs,iys);
    }
  }
  ctx.restore();
}
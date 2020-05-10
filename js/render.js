// render arbitrary information to help me debug
function render_debug(game_debug, ctx){
  if(game_debug){
    ctx.font = '16px alber';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('v0.0.3', 100, -100);
    ctx.fillText(game_state, 100, -80);

    ctx.font = '10px alber';
    ctx.fillStyle = '#ffffff';
    var bods = Composite.allBodies(world);
    for( bod of bods ){
      ctx.fillText(`id:${bod.id}`, bod.position.x, bod.position.y-12);
      ctx.fillText(bod.label, bod.position.x, bod.position.y);
      ctx.fillText('slp:'+bod.isSleeping, bod.position.x, bod.position.y+12);
      ctx.fillText('stt:'+bod.isStatic, bod.position.x, bod.position.y+24);

      if( bod.custom && bod.custom.maxMove ){
        ctx.fillStyle = debug_travelDistance_color;
        ctx.fillText('dist:'+Math.floor(debug_travelDistance / GRID_SIZE), bod.position.x, bod.position.y+48);
        ctx.fillText('moveRemain:'+Math.floor(bod.custom.maxMove / GRID_SIZE), bod.position.x, bod.position.y+60);

        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(bod.custom.startPoint.x, bod.custom.startPoint.y, bod.custom.maxMove+(GRID_SIZE*0.5), 0, Math.PI * 2, true); // Outer circle
        ctx.stroke();
        ctx.moveTo(bod.position.x, bod.position.y);
      }
    }
  }
}

// render shapes from vertices of actors, for terrain
// in the future add an arg to override fillStyle with an image based pattern?
function draw_Shapes(ctx, a){
  for( i of a ){
    ctx.beginPath();
    ctx.moveTo(i.vertices[0].x, i.vertices[0].y);
    for(v of i.vertices){
      ctx.lineTo(v.x, v.y);
    }
    ctx.lineTo(i.vertices[0].x, i.vertices[0].y);
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.fill();
  }
}

// render sprites or animations, per actor, with optional override for globalCompositeOperation
function draw_Graphics(ctx, a, mode){
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
      ctx.globalCompositeOperation = 'source-over';
    }else{
      ctx.drawImage(img,ix,iy,ixs,iys);
    }
  }
}

// render UI elements, per actor
function draw_UI(ctx, a){
  let saveStyle = ctx.strokeStyle;
  let saveFill = ctx.fillStyle;
  let saveWidth = ctx.lineWidth;
  for( i of a ){
    let i_w = wbb(i.bounds);
    let i_h = hbb(i.bounds);
    let radius = (i_w >= i_h ? i_w : i_h);
    ctx.strokeStyle = RENDER_SHADOWCOLOR;
    ctx.lineWidth = '6';
    ctx.beginPath();
    ctx.arc(i.position.x, i.position.y, radius*0.75, 0, Math.PI * 2, true); // Outer circle
    ctx.stroke();

    ctx.strokeStyle = 'green';
    ctx.lineWidth = '3';
    ctx.beginPath();
    ctx.arc(i.position.x, i.position.y, radius*0.75, 0, Math.PI * 2, true); // Outer circle
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

function render_moveRange(ctx, mouseConstraint){
  let movingEnt = mouseConstraint.body;
  if( movingEnt.custom ){
    if(debug_travelDistance < movingEnt.custom.maxMove){
      ctx.strokeStyle = debug_travelDistance_color;
      ctx.beginPath();
      ctx.arc(movingEnt.position.x, movingEnt.position.y, movingEnt.custom.maxMove - debug_travelDistance + GRID_SIZE*0.5, 0, Math.PI * 2, true); // Outer circle
      ctx.stroke();
    }
  }
}

function ray_tb(ctx, o){
  // draw lines between allies, change color if there's enemies intersecting
  // also draw the other cardinal directions, see who intersects with that
  let movingEnt = o.body;
  for( bod of allies_Array ){
    if( bod.id != movingEnt.id ){
      var collisions = Query.ray(Composite.allBodies(world), movingEnt.position, bod.position);
      ctx.beginPath();
      ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
      ctx.lineTo(bod.position.x, bod.position.y);
      if (collisions.length > 2) { // >2 because the mover and the ally are included
        ray_crossVector(ctx, movingEnt, bod); // ccomment out for normal ray coloring
        ctx.strokeStyle = '#ffffff';
      } else {
        ctx.strokeStyle = '#ff00ff';
      }
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

function ray_crossVector(ctx, movingEnt, bod){
  var deltaVector = Vector.sub(movingEnt.position, bod.position);
  //var normalizedDelta = Vector.normalise(deltaVector);
  var forceVector = Vector.mult(deltaVector, 1000);
  
  var v_behind = Vector.rotateAbout(forceVector, Math.PI*0, movingEnt.position);
  var v_left = Vector.rotateAbout(forceVector, Math.PI*0.5, movingEnt.position);
  var v_right = Vector.rotateAbout(forceVector, Math.PI*1.5, movingEnt.position);
  var v_front = Vector.rotateAbout(forceVector, Math.PI*1, movingEnt.position);
  var draw_vectors = [
    v_behind,
    v_left,
    v_right,
    v_front
  ];
  for( vec of draw_vectors ){
    ctx.beginPath();
    ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
    ctx.lineTo(vec.x, vec.y);
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(bod.position.x, bod.position.y);
    ctx.lineTo(vec.x, vec.y);
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.stroke();

    //this seems to be grabbing the cardinal me-too's.
    //TODO draw rects or something to denote target / pincer / chain
    var bods = Composite.allBodies(world);
    var collisions = Query.ray(bods, movingEnt.position, vec);
    ctx.beginPath();
    ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
    ctx.lineTo(vec.x, vec.y);
    if (collisions.length > 2) { // >2 because the mover and the ally are included
      ctx.strokeStyle = '#ffffff';
    } else {
      ctx.strokeStyle = '#ff00ff';
    }
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function draw_mouseSelect(ctx){
  if( mouse_selectArea.min ){
    var oldStroke = ctx.strokeStyle;
    ctx.strokeStyle = 'green';
    ctx.strokeRect(
      mouse_selectArea.min.x, 
      mouse_selectArea.min.y, 
      mouseConstraint.mouse.position.x-mouse_selectArea.min.x, 
      mouseConstraint.mouse.position.y-mouse_selectArea.min.y
    ); 
    
    var region = {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 0,
        y: 0
      }
    };
    var bound_a = {
      x: mouse_selectArea.min.x, 
      y: mouse_selectArea.min.y 
    };
    var bound_b = {
      x: mouseConstraint.mouse.position.x,
      y: mouseConstraint.mouse.position.y
    };
    region.min.x = (bound_a.x <= bound_b.x ? bound_a.x : bound_b.x);
    region.max.x = (bound_a.x > bound_b.x ? bound_a.x : bound_b.x);
    region.min.y = (bound_a.y <= bound_b.y ? bound_a.y : bound_b.y);
    region.max.y = (bound_a.y > bound_b.y ? bound_a.y : bound_b.y);
      
    let selectedBodies = Query.region(allies_Array, region);
    if( selectedBodies.length > 0 ){
      for( bod of selectedBodies ){
        // placeholder box to denote they're about to be selected
        ctx.strokeRect(bod.bounds.min.x, bod.bounds.min.y, bod.bounds.max.x-bod.bounds.min.x, bod.bounds.max.y-bod.bounds.min.y); 
      }
    }

    ctx.strokeStyle = oldStroke;
  }
}
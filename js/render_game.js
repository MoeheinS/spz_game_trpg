// plenty of debug values in this one...
function render_rangefinder(mouseConstraint, a, color_override){
  ctx.save();
  let distance_max = (GRID_SIZE * 5.5);
  if(allies_Array.length){
    ctx.save();

    //for development
    a = allies_Array[0];
  
    let vx = mouseConstraint.mouse.position.x - a.position.x;   // get the line as vector
    let vy = mouseConstraint.mouse.position.y - a.position.y;
    let len = Math.hypot(vx, vy);
    let nx = vx / len; // normalize vector
    let ny = vy / len; // pixel long. This sets the scale

    if( len >= distance_max ){
      ctx.strokeStyle = color_override || RENDER_SHADOWCOLOR;
    }
    // a little circle at the center
    ctx.beginPath();
    ctx.arc(a.position.x, a.position.y, 3, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([9, 16]); //dash, empty
    ctx.moveTo(a.position.x, a.position.y);
    // end line early by subtracting vector * pixel units
    if( len < distance_max ){
      ctx.lineTo(mouseConstraint.mouse.position.x - nx*10, mouseConstraint.mouse.position.y - ny*10);
    }else{
      ctx.lineTo(mouseConstraint.mouse.position.x - nx*10, mouseConstraint.mouse.position.y - ny*10);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    let perpenTHICC = 2;
    let socialDistance = 10;
    // MAXIMUM MATH to draw a perpendicular line. And I end up just setting lineWidth to T H I C C...
    ctx.lineWidth = 20;
    if( len < distance_max ){
      ctx.moveTo(mouseConstraint.mouse.position.x - nx*socialDistance, mouseConstraint.mouse.position.y - ny*socialDistance);
      ctx.lineTo(mouseConstraint.mouse.position.x - nx*(socialDistance+perpenTHICC), mouseConstraint.mouse.position.y - ny*(socialDistance+perpenTHICC));
    }else{ // too far!
      ctx.moveTo(a.position.x + nx*(distance_max-socialDistance), a.position.y + ny*(distance_max-socialDistance));
      ctx.lineTo(a.position.x + nx*(distance_max+perpenTHICC-socialDistance), a.position.y + ny*(distance_max+perpenTHICC-socialDistance));
    }
    ctx.stroke();

    ctx.restore();
  }
  ctx.restore();
}

function render_moveRange(mouseConstraint){
  let movingEnt = mouseConstraint.body;
  if( movingEnt.custom ){
    let vx = mouseConstraint.mouse.position.x - movingEnt.custom.startPoint.x;   // get the line as vector
    let vy = mouseConstraint.mouse.position.y - movingEnt.custom.startPoint.y;
    let len = Math.hypot(vx, vy);
    if(len < movingEnt.custom.maxMove){
      ctx.save();

      ctx.strokeStyle = RENDER_TERRAINCOLOR;
      ctx.setLineDash([12, 24]); //dash, empty
      ctx.beginPath();
      ctx.arc(movingEnt.position.x, movingEnt.position.y, movingEnt.custom.maxMove - len + GRID_SIZE*0.5, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    }
  }
}

function ray_tb(o){
  // draw lines between allies, change color if there's enemies intersecting
  let movingEnt = o.body;
  for( bod of allies_Array ){
    ctx.save();
    if( bod.id != movingEnt.id ){
      // check collisions of any body
      //var collisions = Query.ray(Composite.allBodies(world), movingEnt.position, bod.position);
      var collisions_direct = Query.ray(enemies_Array, movingEnt.position, bod.position);
      var collisions_incObstacles = Query.ray(nonAllies_Array, movingEnt.position, bod.position);
      // if there's an enemy in-between 2 allies
      // AND there's no obstacles included in the line-of-sight check
      if (collisions_direct.length > 0 && collisions_direct.length == collisions_incObstacles.length ) {
        ctx.strokeStyle = RENDER_UI_BLUE;

        ctx.beginPath();
        ctx.arc(movingEnt.position.x, movingEnt.position.y, 3, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bod.position.x, bod.position.y, 3, 0, Math.PI * 2, true);
        ctx.stroke();

        ctx.font = '16px alber';
        ctx.textAlign = 'center';
        ctx.fillStyle = RENDER_UI_BLUE;

        // start of fancy flanking rendering
        let vx = movingEnt.position.x - bod.position.x;   // get the line as vector
        let vy = movingEnt.position.y - bod.position.y;
        let len = Math.hypot(vx, vy);
        let nx = vx / len; // normalize vector
        let ny = vy / len; // pixel long. This sets the scale
        for( hit of collisions_direct ){
          ctx.fillText('[ flanked ]', hit.body.position.x, hit.body.bounds.max.y+16);

          let t1_vx = movingEnt.position.x - hit.body.position.x;   // get the line as vector
          let t1_vy = movingEnt.position.y - hit.body.position.y;
          let t1_len = Math.hypot(t1_vx, t1_vy);

          ctx.beginPath();
          ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
          ctx.lineTo(movingEnt.position.x - nx*(t1_len-GRID_SIZE), movingEnt.position.y - ny*(t1_len-GRID_SIZE));
          ctx.stroke();
          ctx.lineWidth = 20;
          ctx.beginPath();
          ctx.moveTo(movingEnt.position.x - nx*(t1_len-GRID_SIZE), movingEnt.position.y - ny*(t1_len-GRID_SIZE));
          ctx.lineTo(movingEnt.position.x - nx*(t1_len-GRID_SIZE+2), movingEnt.position.y - ny*(t1_len-GRID_SIZE+2));
          ctx.stroke();
          ctx.lineWidth = 2;

          let t2_vx = bod.position.x - hit.body.position.x;   // get the line as vector
          let t2_vy = bod.position.y - hit.body.position.y;
          let t2_len = Math.hypot(t2_vx, t2_vy);

          ctx.beginPath();
          ctx.moveTo(bod.position.x, bod.position.y);
          ctx.lineTo(bod.position.x + nx*(t2_len-GRID_SIZE), bod.position.y + ny*(t2_len-GRID_SIZE));
          ctx.stroke();
          ctx.lineWidth = 20;
          ctx.beginPath();
          ctx.moveTo(bod.position.x + nx*(t2_len-GRID_SIZE), bod.position.y + ny*(t2_len-GRID_SIZE));
          ctx.lineTo(bod.position.x + nx*(t2_len-GRID_SIZE+2), bod.position.y + ny*(t2_len-GRID_SIZE+2));
          ctx.stroke();
          ctx.lineWidth = 2;
        }
        // end of fancy flanking rendering

        // uncomment this for simple flanking rendering
        /*
        for( hit of collisions_direct ){
          ctx.fillText('[ flanked ]', hit.body.position.x, hit.body.bounds.max.y+16);
        }
        ctx.beginPath();
        ctx.moveTo(movingEnt.position.x, movingEnt.position.y);
        ctx.lineTo(bod.position.x, bod.position.y);
        ctx.stroke();
        */
      }
    }
    ctx.restore();
  }
}

//FIXME: clean up, this runs always, but it should only activate in select mode.
function draw_mouseSelect(){
  if( mouse_selectArea.min ){
    ctx.save();

    ctx.strokeStyle = RENDER_UI_GREEN;
    ctx.strokeRect(
      mouse_selectArea.min.x, 
      mouse_selectArea.min.y, 
      mouseConstraint.mouse.position.x-mouse_selectArea.min.x, 
      mouseConstraint.mouse.position.y-mouse_selectArea.min.y
    ); 
    
    var region = {
      min: { x: 0, y: 0 },
      max: { x: 0, y: 0 }
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

    ctx.restore();
  }
}
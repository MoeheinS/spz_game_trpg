Events.on(mouseConstraint, "startdrag", function(event) {
  console.log(event);
  let movingEnt = event.body;
  
  World.remove(world, movingEnt, true);
  World.add(world, movingEnt);

  game_state = 'movement';
  if( movingEnt.custom ){
    var bods = Composite.allBodies(world);
    for( bod of bods ){
      if(bod.id != movingEnt.id){
        console.log(`${movingEnt.id} moving, sleep ${bod.id}`);
        var rope = Constraint.create({ 
          pointA: {x: bod.position.x, y: bod.position.y}, 
          bodyB: bod, 
          stiffness: 0.95
        });
        World.add(world, rope);
      }
    }
  }
});

Events.on(mouseConstraint, "enddrag", function(event) {
  console.log(event);
  let movingEnt = event.body;
  if( movingEnt.custom ){
    if(debug_travelDistance < movingEnt.custom.maxMove){
      //startPoint =  { x: event.body.position.x, y: event.body.position.y};
      //event.body.custom.maxMove = event.body.custom.maxMove - debug_travelDistance;
    }else{
      Body.setPosition(movingEnt, movingEnt.custom.startPoint);
    }
  }
  var ropes = Composite.allConstraints(world);
  window.setTimeout(function(){
    for( rope of ropes ){
      if( rope.label != "Mouse Constraint" ){
        World.remove(world, rope, true);
      }
    }
  },200);
  game_state = 'idle';
});

Events.on(mouseConstraint, "mousedown", function(event) {
  console.log(event);
  if( event.mouse.button === 0 ){
    console.warn('start drag selection area');
    game_state = 'mouse_select';
    mouse_selectArea = {};
    mouse_selectArea.min = {x: mouseConstraint.mouse.mousedownPosition.x, y: mouseConstraint.mouse.mousedownPosition.y};
  }
});

Events.on(mouseConstraint, "mouseup", function(event) {
  if( event.mouse.button === -1 && game_state == 'mouse_select' ){
    console.warn('end drag selection area');
    game_state = 'mouse_select_done';
    mouse_selectArea.max = {x: mouseConstraint.mouse.mouseupPosition.x, y: mouseConstraint.mouse.mouseupPosition.y};
    console.table(mouse_selectArea);

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
    var bound_a = mouse_selectArea.min;
    var bound_b = mouse_selectArea.max;
    region.min.x = (bound_a.x <= bound_b.x ? bound_a.x : bound_b.x);
    region.max.x = (bound_a.x > bound_b.x ? bound_a.x : bound_b.x);
    region.min.y = (bound_a.y <= bound_b.y ? bound_a.y : bound_b.y);
    region.max.y = (bound_a.y > bound_b.y ? bound_a.y : bound_b.y);

    var selectedBodies = Query.region(allies_Array, region);
    console.log(selectedBodies);
  }
});
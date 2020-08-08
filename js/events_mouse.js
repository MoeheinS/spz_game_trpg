// this entire file can be overhauled
// TODO: While dragging set collision mask
// TODO: On release if collision 0 velocities?
Events.on(mouseConstraint, "startdrag", function(event) {
  console.log(event);
  let movingEnt = event.body;

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
  if( event.mouse.button === 0){
    if(game_shift){
      console.warn('start drag selection area');
      game_cursor = 'select';
      mouse_selectArea = {};
      mouse_selectArea.min = {x: mouseConstraint.mouse.mousedownPosition.x, y: mouseConstraint.mouse.mousedownPosition.y};
    }else{
      // check to see if mouse is on an ally actor at mousedown start
      if( Query.point(allies_Array, mouseConstraint.mouse.position).length ){
        game_cursor = 'select';
        mouse_selectArea = {};
        mouse_selectArea.min = {x: mouseConstraint.mouse.mousedownPosition.x, y: mouseConstraint.mouse.mousedownPosition.y};
      }
    }
  }
});

Events.on(mouseConstraint, "mouseup", function(event) {
  if( event.mouse.button === -1 && game_cursor == 'select' ){
    console.warn('end drag selection area');
    game_cursor = 'default';
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
    game_selection = selectedBodies;
    console.log(game_selection);
  }
});
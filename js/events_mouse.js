// this entire file can be overhauled
// TODO: While dragging set collision mask
// TODO: On release if collision 0 velocities?
// Events.on(mouseConstraint, "startdrag", function(event) {
//   console.log(event);
//   let movingEnt = event.body;

//   // DEPREC
//   _game_state = 'movement';
//   if( movingEnt.custom ){
//     var bods = Composite.allBodies(world);
//     for( bod of bods ){
//       if(bod.id != movingEnt.id){
//         console.log(`${movingEnt.id} moving, sleep ${bod.id}`);
//         var rope = Constraint.create({ 
//           pointA: {x: bod.position.x, y: bod.position.y}, 
//           bodyB: bod, 
//           stiffness: 0.95
//         });
//         World.add(world, rope);
//       }
//     }
//   }
// });

// Events.on(mouseConstraint, "enddrag", function(event) {
//   console.log(event);
//   var ropes = Composite.allConstraints(world);
//   window.setTimeout(function(){
//     for( rope of ropes ){
//       if( rope.label != "Mouse Constraint" ){
//         World.remove(world, rope, true);
//       }
//     }
//   },200);
//   // DEPREC
//   _game_state = 'idle';
// });

Events.on(mouseConstraint, "mousedown", function(event) {
  console.log(event);
  if( event.mouse.button === 0){
    if( game_state.mayDeploy ){
      new UnitEnt( new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE, mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE ), 'Debug Ratty' );
    }
  }
  if( event.mouse.button === 2){
    if( game_state.mayDeploy ){
      new UnitEnt( new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE, mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE ), 'Debug Air Ratty' );
    }
  }
});
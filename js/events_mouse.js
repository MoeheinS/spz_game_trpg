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
  // if( event.mouse.button === 0){
  //   if( game_state.mayDeploy ){
  //     new UnitEnt( new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE, mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE ), 'Debug Ratty' );
  //   }
  // }
  // if( event.mouse.button === 2){
  //   if( game_state.mayDeploy ){
  //     new UnitEnt( new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE, mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE ), 'Debug Air Ratty' );
  //   }
  // }

  if( event.mouse.button === 0){
    // if( game_state.debug_buildmode ){
    //   let bldi = document.querySelector('[name=devBuilder--buildingType]').value;
    //   let lvl = document.querySelector('[name=devBuilder--buildingLevel]').value;
      
    //   let undoState = game_state.debug_buildmode_lastAdded;
    //   undoState.push( new BuildingEnt( 
    //     buildingList[bldi].name, lvl, 
    //     new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE + ( buildingList[bldi].category == 'wall' || buildingList[bldi].category == 'terrain' ? 0*GRID_SIZE : 0.5*GRID_SIZE ), mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE + ( buildingList[bldi].category == 'wall' || buildingList[bldi].category == 'terrain' ? 0*GRID_SIZE : 0.5*GRID_SIZE ) )
    //   ));
    //   window.setTimeout(function(){
    //     game_state.grass = landScape();
    //   },100);
    // }
    // if( game_state.mayDeploy ){

    //   var deployAble = document.querySelector('[name=partyPicker-deployer]:checked');
    //   if( deployAble ){
    //     var deploy_DOM = document.querySelector('[name=partyPicker-deployer]:checked+.partyPicker-member');
    //     if( deploy_DOM.dataset.amount < 1 ){
    //       return; //deployAble.disabled = true;
    //     }else{
    //       deploy_DOM.dataset.amount--;
    //       new UnitEnt( new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE, mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE ), deployAble.value );
    //     }
    //   }
    // }
    new UnitEnt( new Coordinate( mouseConstraint.mouse.mousedownPosition.x - mouseConstraint.mouse.mousedownPosition.x % GRID_SIZE, mouseConstraint.mouse.mousedownPosition.y - mouseConstraint.mouse.mousedownPosition.y % GRID_SIZE ), 'Ratty' );
  }
  if( event.mouse.button === 2){
    console.log('squee');

    for( constraint of constraints_Array ){
      World.remove(world, constraint);
    }

    for( unit of units_Array ){

      var dist = getDistance({x: unit.position.x, y: unit.position.y}, { x: mouseConstraint.mouse.mousedownPosition.x, y: mouseConstraint.mouse.mousedownPosition.y });
      console.log(dist);

      const constraint = Constraint.create({
        bodyA: unit,
        pointB: { x: mouseConstraint.mouse.mousedownPosition.x, y: mouseConstraint.mouse.mousedownPosition.y },
        // pointB: { x: unit.position.x, y: unit.position.y },
        stiffness: 0.00001, //smaller = smoother movement
        length: 10
      });
      World.add(world, constraint);

      constraints_Array.push(constraint);

    }

  }
});
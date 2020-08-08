function group_Entities() {
  // make primitive groups, so I don't have to loop over ALL the objects every time i need something
  // this also lets me ignore checks for properties
  // in the future maybe use .filter() but for now it's fine
  allies_Array = [];
  enemies_Array = [];
  actors_Array = [];
  obstacles_Array = [];
  nonAllies_Array = [];
  for( bod of Composite.allBodies(world) ){
    if(bod.label == 'ally'){
      allies_Array.push(bod);
    }else if(bod.label == 'enemy'){
      enemies_Array.push(bod);
      nonAllies_Array.push(bod);
    }else if(bod.label == 'shape' || bod.label == 'boundary' || bod.label == 'obstacle' || bod.label == 'wall'){
      obstacles_Array.push(bod);
      nonAllies_Array.push(bod);
    }
  }
  
  allies_Array = sortByY(allies_Array);
  enemies_Array = sortByY(enemies_Array);
  actors_Array = allies_Array.concat(enemies_Array);
  actors_Array = sortByY(actors_Array);

  obstacles_Array = sortByY(obstacles_Array);
  nonAllies_Array = sortByY(nonAllies_Array);
}

function clearField() {
  for( bod of Composite.allBodies(world) ){
    if( bod.label != 'boundary' ){
      World.remove(world, bod, true);
    }
  }
}

function populateField(i) {
  // TODO: expound
  for( mission of missionList ){
    if( mission.id == i ){
      for( e of mission.ents ){
        switch ( e.spawnType ) {
          case 'building':
            console.warn(e.label);
            break;
          default:
            break;
        }
      }
    }
    // function to add ent to world at coords based on its label?  
    // gonna need some more groundwork for this
  }
}
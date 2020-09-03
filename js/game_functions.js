function group_Entities() {
  // make primitive groups, so I don't have to loop over ALL the objects every time i need something
  // this also lets me ignore checks for properties
  // in the future maybe use .filter() but for now it's fine

  units_Array = [];
  units_ground_Array = [];
  units_air_Array = [];

  walls_Array = [];
  buildings_Array = []; // no walls
  buildings_all_Array = [];
  defenses_Array = [];
  economy_Array = [];

  doodads_Array = [];

  render_Array = [];

  for( bod of Composite.allBodies(world) ){
    switch (bod.label) {
      case 'ally':
        units_Array.push(bod);
        render_Array.push(bod);
        if( bod.custom.moveType == 'ground' ){
          units_ground_Array = [];
        }
        if( bod.custom.moveType == 'air' ){
          units_air_Array = [];
        }
        break;
      case 'building':
        buildings_all_Array.push(bod);
        switch (bod.custom.category) {
          case 'terrain':
            walls_Array.push(bod);  
            render_Array.push(bod);
            break;
          case 'wall':
            walls_Array.push(bod);
            render_Array.push(bod);
            break;
          case 'defense':
            defenses_Array.push(bod);
            buildings_Array.push(bod);
            render_Array.push(bod);
            break;
          case 'economy':
            economy_Array.push(bod);
            buildings_Array.push(bod);
            render_Array.push(bod);
            break;
          default:
            buildings_Array.push(bod);
            render_Array.push(bod);
            break;
        }
        break;
      case 'doodad':
        doodads_Array.push(bod);
        render_Array.push(bod);
      default:
        break;
    }
  }

  units_Array = sortByY(units_Array);

  buildings_all_Array = sortByY(buildings_all_Array);

  doodads_Array = sortByY(doodads_Array);

  render_Array = sortByY(render_Array);
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

function landScape(){

	var astar_grid = new aStar_grid();

	for( building of buildings_all_Array ){
		for( let hi = building.region.startRow; hi < building.region.endRow; hi++ ){
			for( let vi = building.region.startCol; vi < building.region.endCol; vi++ ){
				astar_grid[hi][vi] = ( building.custom.category == 'wall' || building.custom.category == 'terrain' ? 0.5 : 1 );
			}
		}
	}

  return astar_grid;

}

function level(command){
  switch (command) {
    case 'clear':
      for( bod of Composite.allBodies(world) ){
        if( bod.label != 'boundary' ){
          World.remove(world, bod, true);
        }
      }
      particles_Array = [];
      projectiles_Array = [];
      game_state.grass = new aStar_grid();
      break;
    default:
      break;
  }
}
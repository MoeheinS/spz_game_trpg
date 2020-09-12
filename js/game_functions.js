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

function landScape(){
	var astar_grid = new aStar_grid();

  if( buildings_all_Array.length ){
    for( building of buildings_all_Array ){
      for( let hi = building.region.startRow; hi < building.region.endRow; hi++ ){
        for( let vi = building.region.startCol; vi < building.region.endCol; vi++ ){
          astar_grid[hi][vi] = ( building.custom.category == 'wall' || building.custom.category == 'terrain' ? 0.5 : 1 );
        }
      }
    }
  }
	
  return astar_grid;
}

function flowControl(command, p, p2){
  switch (command) {
    // see if you've won or lost
    case 'check':
      let progress_pct = ( game_state.initial_buildings ? 100 - Math.floor( buildings_Array.length / game_state.initial_buildings * 100 ) : 0 );
      if( progress_pct == 100 ){
        // declare victory
        game_state.game_phase == 'victory';
        // STUB; function for DOM control
      }
      let deployable_unitCount = 1; // placeholder
      if( game_state.game_phase == 'engage' && deployable_unitCount == 0 && units_Array.length == 0 ){
        // declare defeat
        game_state.game_phase == 'defeat';
        // STUB; function for DOM control
      }
      break;
    // clear the board
    case 'clear':
      for( bod of Composite.allBodies(world) ){
        if( bod.label != 'boundary' ){
          World.remove(world, bod, true);
        }
      }
      particles_Array = [];
      projectiles_Array = [];
      game_state.grass = false; //new aStar_grid();
      game_state.initial_buildings = 0;
      break;
    case 'load':
      flowControl('clear');
      // use p from missionList
      for( mission of missionList ){
        // mission.id is int
        if( p == mission.id ){
          building_CORE = new BuildingEnt( 'Core', ( p2 ? p2 : mission.core.level ), mission.core.position );
          game_state.initial_buildings = 1;
          for( ent of mission.ents ){
            let newBuilding = new BuildingEnt( ent.name, ( p2 ? p2 : ent.level ), ent.position );
            if( newBuilding.custom.category != 'wall' && newBuilding.custom.category != 'terrain' ){// also exclude terrain props
              game_state.initial_buildings++;
            }
          }
          break;
        }
      }
      group_Entities();
      window.setTimeout(function(){
        game_state.grass = landScape();
        landScape_flowers();
      }, 100);
      //game_state.initial_buildings = mission.ents.length + 1;
      break;
    case 'countdown':
      switch (true) {
        case ( game_state.timer_deploy === false ):
          game_state.timer_deploy = 3;
          break;
        case ( game_state.timer_deploy < 1 ):
          game_state.game_phase = 'engage';
          game_state.timer_deploy = false;
          break;
        case ( ticker % ANIM_TIMING == 0 ):
          game_state.timer_deploy--;
          break;
        default:
          break;
      }
      break;
    case 'survey':
      // look at the map, assemble your squad, maybe pick a different level
      break;
    case 'embark':
      // 3, 2, 1, GO! Deploy and destroy!
      break;
    default:
      break;
  }
}
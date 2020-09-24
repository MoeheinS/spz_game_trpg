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

  sortByY(units_Array);

  sortByY(buildings_all_Array);

  sortByY(doodads_Array);

  sortByY(render_Array);
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
      let deployable_unitCount = document.querySelectorAll('.partyPicker-member:not([data-amount="0"])').length;
      switch (true) {
        case ( progress_pct == 100 ):
        case ( game_state.game_phase == 'engage' && deployable_unitCount == 0 && units_Array.length == 0 ):
        case ( game_state.timer_missionTime && game_state.timer_missionTime_remaining <= 0 ):
          battle_countdown('stop');  
          game_state.game_phase = 'survey';
          dom_aftermath();
          break;
        default:
          break;
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
          building_CORE = new BuildingEnt( 'Core', ( p2 == -1 ? mission.core.level : p2 ? p2 : mission.core.level ), mission.core.position );
          game_state.initial_buildings = 1;
          for( ent of mission.ents ){
            let newBuilding = new BuildingEnt( ent.name, ( p2 == -1 ? ent.level : p2 ? p2 : ent.level ), ent.position );
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
          game_state.timer_deploy = 3.5;
          break;
        case ( game_state.timer_deploy < 1 ):
          game_state.game_phase = 'engage';
          game_state.timer_deploy = false;
          battle_countdown('start');
          break;
        case ( ticker % ANIM_TIMING == 0 ):
          game_state.timer_deploy = game_state.timer_deploy-0.5;
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

function battle_countdown(command) {
  switch (command) {
    case 'start':
      game_state.timer_missionTime_remaining = 180;
      game_state.timer_missionTime = setInterval(function() {
        if(game_state.timer_missionTime_remaining <= 0) {
          setTimeout(function() {
            game_state.timer_missionTime_renderText = "0:00";
          }, 10);
          clearInterval(game_state.timer_missionTime);
        }
        var minutes = Math.floor( game_state.timer_missionTime_remaining / 60 );
        var seconds = game_state.timer_missionTime_remaining % 60;
        if( seconds < 10 ){
          seconds = "0" + seconds;
        }
        game_state.timer_missionTime_renderText = `${minutes}:${seconds}`;
        game_state.timer_missionTime_remaining--;
      }, 1000);
      break;
    case 'stop':
      clearInterval(game_state.timer_missionTime);
      game_state.timer_missionTime = false;
      break;
    default:
      break;
  }
}

// DEV function
function export_level(url) {
  let level_JSON = new Object;
      level_JSON.core = new Object;
      level_JSON.ents = new Array;
  for( bld of buildings_all_Array ){
    if( bld.custom.name == 'Core' ){
      level_JSON.core.level = bld.custom.level;
      level_JSON.core.position = `new Coordinate( ${bld.bounds.min.x / GRID_SIZE}*GRID_SIZE, ${bld.bounds.min.y / GRID_SIZE}*GRID_SIZE )`;
    }else{
      level_JSON.ents.push({
        name: bld.custom.name,
        level: bld.custom.level,
        position: `new Coordinate( ${bld.bounds.min.x / GRID_SIZE}*GRID_SIZE, ${bld.bounds.min.y / GRID_SIZE}*GRID_SIZE )`
      });
    }
  }
  level_JSON.id = prompt('Name this level');
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(level_JSON)
  });
}
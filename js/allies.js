let unitList = [
  // name, rarity, spriteName, attackCD, moveSpeed, attackRange, damage, preferredTarget, hp
  {name: 'Ratty', rarity: 'N', spriteName: 'ratty', attackCD: 126, movespeed: 140, moveType: 'ground', attackRange: 1, damage: 54, attackArt: 'particle_atk_1', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 180, amount: 15},
  {name: 'Sling', rarity: 'N', spriteName: 'sling', attackCD: 144, movespeed: 110, moveType: 'ground', attackRange: 10, damage: 26, attackArt: 'particle_atk_8',  projectileArt: 'projectile_unit_sling', preferredTarget: 'any', hp: 70, amount: 15}
];

class UnitEnt {
  constructor(
      spawnCoord,
      unitID
  ) {
      let info = new Object;
      for( unit of unitList ){
        if( unit.name == unitID ){
          info = unit;
        }
      }
      this.body = Bodies.circle(spawnCoord.x+(GRID_SIZE*0.5), spawnCoord.y+(GRID_SIZE*0.5), 8, {
        label: 'ally',
        frictionAir: 1, // magic numbers
        mass: 2,        // magic numbers
        collisionFilter: {
          category: draggable_false
        },
        custom: {
          shape: 'circle',

          hp_max: info.hp,
          hp_current: info.hp,
          attackRange: info.attackRange,
          attackCD: info.attackCD,
          attackCD_base: info.attackCD,
          moveType: info.moveType,
          damage: info.damage,
          preferredTarget: info.preferredTarget,

          waypoint: false,
          target: false,
          targetsArray: false,
          //turret: {
            attackArt: info.attackArt,
            projectileArt: info.projectileArt,
          //},

          state: 'idle',

          graphics: {
            renderMode: 'sheet_directional',
            sprite: unitsImg.src,
            sprite_dim: {
              x: 16,
              y: 16
            },
            sheet_idle: getSprites(info.spriteName, 'idle'),
            sheet_left: getSprites(info.spriteName, 'left'),
            sheet_right: getSprites(info.spriteName, 'right'),
            sheet_up: getSprites(info.spriteName, 'up')
          }
        }
      }, 10);
      World.add(world, this.body);
      //console.log(this.body.position);
      return this.body;
  }
  // adding niche properties to bodies?
  specialProp(prop, prop2) { 
    switch (prop) {
      case 'wallkiller':
        this.body.custom.bonusDamage = {"category": "wall", "amount": prop2};
        break;
      default:
        break;
    }
  }
}

function unit_sortTargets(a){
  var nearTargets_byDist_byCategory = new Array;
  /*
    sort: 
    -1: a moves up
    1: b moves up
    0: a and b unchanged regarding eachother, but sorted with respect to all different elements
  */

  // walls_Array
  var target_walls = new Array;

  for( let b_wall of walls_Array ){
    let dist = getDistance(a.position, b_wall.position);
    target_walls.push({"target": b_wall, "distance": dist, "category": b_wall.custom.category});
  }
  target_walls = target_walls.sort(function(apple,orange){
    return apple.distance-orange.distance;
  });

  // defenses_Array
  var target_defenses = new Array;

  for( let b_def of defenses_Array ){
    let dist = getDistance(a.position, b_def.position);
    target_defenses.push({"target": b_def, "distance": dist, "category": b_def.custom.category});
  }
  target_defenses = target_defenses.sort(function(apple,orange){
    return apple.distance-orange.distance;
  });

  // economy_Array
  var target_economy = new Array;

  for( let b_eco of economy_Array ){
    let dist = getDistance(a.position, b_eco.position);
    target_economy.push({"target": b_eco, "distance": dist, "category": b_eco.custom.category});
  }
  target_economy = target_economy.sort(function(apple,orange){
    return apple.distance-orange.distance;
  });

  // buildings_Array
  var target_buildings = new Array;

  // everything, except walls
  for( b of buildings_Array ){
    // hp 0 buildings are not eligible targets, and also don't block pathfinding
    // but if buildings self-delete and place doodads, this is redundant
    let dist = getDistance(a.position, b.position);
    target_buildings.push({"target": b, "distance": dist, "category": b.custom.category});
  }
  target_buildings = target_buildings.sort(function(apple,orange){
    return apple.distance-orange.distance;
  });

  //===================================[ Done sorting everything? ]===================================

  if( !target_buildings.length ){
    // do a little victory dance because there's nothing left to destroy, you monster
    // walls don't count
    a.custom.state = 'dancing';
    //console.error('No targets to be found');
  }else{
    switch (a.custom.preferredTarget) {
      case 'wall':
        nearTargets_byDist_byCategory = target_walls.concat(target_buildings);
        break;
      case 'defense':
      // case 'anti-air':
        nearTargets_byDist_byCategory = target_defenses.concat(target_economy).concat(target_walls);
        break;
      case 'economy':
      // case 'core':
        nearTargets_byDist_byCategory = target_economy.concat(target_defenses).concat(target_walls);
        break;
      case 'any':
      default:
        nearTargets_byDist_byCategory = target_buildings.concat(target_walls);
        break;
    }
    //console.warn(`${a.id}, pref ${a.custom.preferredTarget}`);
    //console.table(nearTargets_byDist_byCategory);

    // save the sorted list of potential targets inside the unit
    a.custom.targetsArray = nearTargets_byDist_byCategory;
  }

}

// target the closest building, according to preference
function unit_acquireTarget(a){
  if( a.custom.targetsArray && a.custom.targetsArray.length ){
    if( a.custom.target ){
      // empty out target if it's dead
      if( a.custom.target.custom.hp_current <= 0 ){
        a.custom.target = false;
      }
    }else{
      // we shift the topmost off the stack of potentials, making the list shorter
      var tryTarget = a.custom.targetsArray.shift();
      //console.warn(`searching path from ${a.id} to ${tryTarget.target.id}`);
      unit_pathfind(a, tryTarget.target.id, tryTarget.target);
    }
  }else{
    console.warn(`${a.id} ran out of targets`);
  }
}

// works off world bounds; performance is still good for now
// grid size unit, feathering from edges
function unit_pathfind(bod, exceptID, exceptBod){

  var astar_grid = new aStar_grid();

  for( possible_target of bod.custom.targetsArray ){
    if( possible_target.target.id != exceptID ){
      for( let hi = possible_target.target.region.startRow; hi < possible_target.target.region.endRow; hi++ ){
        for( let vi = possible_target.target.region.startCol; vi < possible_target.target.region.endCol; vi++ ){
          // push a 0 for air cuz they can't be blocked
          // TODO: might want to make only walls non-blocking for air, but that's future me's problem
          astar_grid[hi][vi] = ( bod.custom.moveType == 'air' ? 0:1);
        }
      }
    }
  }

  unit_astar( astar_grid, new Coordinate( bod.region.startCol, bod.region.startRow ), new Coordinate( exceptBod.region.startCol, exceptBod.region.startRow ), bod, exceptBod );
}

function unit_astar(astar_grid, start_pos, goal_pos, unit, target){
  // for ranged units
  // TODO: IT APPEARS TO WORK? But needs more testing
  if( getDistance(unit.position, target.position) <= unit.custom.attackRange*GRID_SIZE ){
    unit.custom.target = target;
    unit.custom.waypoint = [target.position];
    unit.custom.state = 'ready';
    return;
  }

  var easystar = new EasyStar.js();
  easystar.setGrid(astar_grid);
  easystar.enableDiagonals();
  easystar.setAcceptableTiles([0]);
  try {
    easystar.findPath(start_pos.x, start_pos.y, goal_pos.x, goal_pos.y, function( path ) {
      //console.log(path);
      if (path === null) {
        console.error(`path for ${unit.id} NOT found`);
      } else {
        console.warn(`path for ${unit.id} found to ${target.id}`);
        unit.custom.target = target;
        unit.custom.waypoint = path;
        unit.custom.state = 'ready';
      }
    });
    easystar.calculate();  
  } catch (error) {
    // try catch here because units that get pushed out of bounds crash the astar library
  }
}

function unit_attackTarget(a){
  if( !a.custom.target || Composite.get(world, a.custom.target.id, 'body') == null || Composite.get(world, a.id, 'body') == null ){
    return;
  }
  // check if you're within range, in which case, attack and reset attack timer
  // if target building is larger than 32, or taller than 32
  let target_points = a.custom.target.vertices;
  var hurt_point = false;
  if( getDistance(a.position, a.custom.target.position) <= a.custom.attackRange*GRID_SIZE ){
    if( a.custom.attackCD <= 0 ){
      unit_applyPain(a, a.custom.target);
      a.custom.attackCD = a.custom.attackCD_base;
    }
  }else if( wbb(a.custom.target.bounds) > GRID_SIZE || hbb(a.custom.target.bounds) > GRID_SIZE ){
    for( vert of target_points ){
      if( getDistance(a.position, new Coordinate( vert.x, vert.y )) <= a.custom.attackRange*GRID_SIZE ){
        if( a.custom.attackCD <= 0 ){
          unit_applyPain(a, a.custom.target);
          a.custom.attackCD = a.custom.attackCD_base;
          hurt_point = true;
        }
      }
    }
    if( !hurt_point ){
      unit_approachTarget(a);
    }
  }else{
    unit_approachTarget(a);
  }
}

function unit_approachTarget(a){
  // otherwise walk towards the closest waypoint, unless you're close, in which case,
  // shift if off the stack and repeat 
  var waypoint_raw = new Object;  
  if( a.custom.waypoint.length ){
    waypoint_raw = {x: ( a.custom.waypoint[0].x*GRID_SIZE )+( 0.5*GRID_SIZE ), y: ( a.custom.waypoint[0].y*GRID_SIZE )+( 0.5*GRID_SIZE )};
  }else{
    let target_points = a.custom.target.vertices;
    if( wbb(a.custom.target.bounds) > GRID_SIZE || hbb(a.custom.target.bounds) > GRID_SIZE ){
      for( vert of target_points ){
        if( getDistance(a.position, new Coordinate( vert.x, vert.y )) <= a.custom.attackRange*GRID_SIZE ){
          waypoint_raw = { x: vert.x, y: vert.y };
        }
      }
    }else{
      waypoint_raw = { x: a.custom.target.position.x, y: a.custom.target.position.y };
    }
  }

  if( getDistance(a.position, waypoint_raw) <= GRID_SIZE ){
    a.custom.waypoint.shift();
  }else{
    cycle_movement(unit, waypoint_raw);
  }
}

function unit_applyPain(a, t){
  console.log(`unit ${a.id} attacking ${t.id}`);
  let distance = getDistance(a.position, t.position);
  let distanceDiff = ( distance/( a.custom.attackRange*GRID_SIZE ) ); // percentage of distance travelled already

  let lifetime_adjusted = ( a.custom.attackRange * 10 ) * distanceDiff; // used to be 90

  if( a.custom.attackRange == 1 ){
    // TODO: melee units don't need projectile art, fix someday
    projectiles_Array.push(
      new ProjectileEnt(a.position, t.position, true, 1, t, a.custom.damage, a.custom.projectileArt)
    );
  }else{
    projectiles_Array.push(
      new ProjectileEnt(a.position, t.position, true, lifetime_adjusted, t, a.custom.damage, a.custom.projectileArt)
    );
  }
  
  particles_Array.push(
    new ParticleEnt({x: a.position.x+( 0.25*GRID_SIZE ), y: a.position.y-( 0.5*GRID_SIZE )}, 3, a.custom.attackArt, {x: 32, y: 16}, unitsImg.src)
  );
}

var test_allyGB2 = new UnitEnt( new Coordinate( GRID_SIZE*8, GRID_SIZE*2 ), 'Ratty' );
new UnitEnt( new Coordinate( GRID_SIZE*20, GRID_SIZE*2 ), 'Sling' );
new UnitEnt( new Coordinate( GRID_SIZE*21, GRID_SIZE*2 ), 'Sling' );
new UnitEnt( new Coordinate( GRID_SIZE*22, GRID_SIZE*2 ), 'Sling' );
new UnitEnt( new Coordinate( GRID_SIZE*23, GRID_SIZE*2 ), 'Sling' );

// =======================[ DOODAD ]====================================
function ripperoni_unit(a){
  // exploding into hunks of manga meat or gears / bolts would be funny too, but let's stick with this for now
  let tombstone = Bodies.rectangle(a.position.x, a.position.y, 8, 8, {
    label: 'doodad',
    label2: 'tombstone',
    collisionFilter: {
      category: draggable_false
    },
    isStatic: true,
    isSensor: true,
    custom: {
      graphics: {
        renderMode: 'sheet_static',
        sprite: buildingsImg.src,
        sprite_dim: {
            x: 16,
            y: 16
        },
        sheet_idle: getSprites('tombstone', 'idle') //placeholder
      }
    }
  });
  World.add(world, tombstone);
}
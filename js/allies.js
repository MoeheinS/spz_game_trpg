let unitList = [
  // name, rarity, spriteName, attackCD, moveSpeed, attackRange, damage, preferredTarget, hp
  // {name: 'Debug Ratty', rarity: 'SSR', spriteName: 'ratty', attackCD: 126, movespeed: 140, moveType: 'ground', attackRange: 1, damage: 254, attackArt: 'particle_atk_1', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 1800, amount: 15, artName: 'Ratty', notes:'Debug unit'},
  // {name: 'Debug Air Ratty', rarity: 'SSR', spriteName: 'ratty', attackCD: 126, movespeed: 140, moveType: 'air', attackRange: 1, damage: 254, attackArt: 'particle_atk_1', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 1800, amount: 15, artName: 'Ratty', notes:'Debug unit'},
  {name: 'Ratty', rarity: 'N', spriteName: 'ratty', attackCD: 126, movespeed: 140, moveType: 'ground', attackRange: 1, damage: 81, attackArt: 'particle_atk_1', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 270, amount: 15, artName: 'Ratty'},
  {name: 'Sling', rarity: 'N', spriteName: 'sling', attackCD: 144, movespeed: 110, moveType: 'ground', attackRange: 10, damage: 39, attackArt: 'particle_atk_11',  projectileArt: 'projectile_unit_sling', preferredTarget: 'any', hp: 105, amount: 15, artName: 'Sling'},
  {name: 'Thievel', rarity: 'N', spriteName: 'thievel', attackCD: 45, movespeed: 156, moveType: 'ground', attackRange: 1, damage: 12, attackArt: 'particle_atk_12', projectileArt: 'projectile_unit_melee', preferredTarget: 'economy', hp: 672, amount: 10, artName: 'Thievel', notes:'Thievel prefers to attack economy buildings, doing x5 damage.'},
  {name: 'Brownie', rarity: 'N', spriteName: 'brownie', attackCD: 168, movespeed: 65, moveType: 'ground', attackRange: 1, damage: 138, attackArt: 'particle_atk_12', projectileArt: 'projectile_unit_melee', preferredTarget: 'defense', hp: 2555, amount: 3, artName: 'Brownie', notes:'Brownie prefers to attack defensive buildings.'},
  {name: 'Huey', rarity: 'N', spriteName: 'huey', attackCD: 90, movespeed: 98, moveType: 'ground', attackRange: 1, damage: 75, attackArt: 'particle_atk_2', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 492, amount: 9, artName: 'Huey', notes:'--'},
  {name: 'Missile', rarity: 'N', spriteName: 'missile', attackCD: 60, movespeed: 175, moveType: 'ground', attackRange: 1, damage: 153, attackArt: 'particle_atk_12', projectileArt: 'projectile_unit_melee', preferredTarget: 'wall', hp: 201, amount: 4, artName: 'Missile', notes:'Missile moves in a straight line towards the closest wall, dealing x93 damage to walls. Explodes on impact.'},
  {name: 'Vogel', rarity: 'N', spriteName: 'vogel', attackCD: 72, movespeed: 143, moveType: 'ground', attackRange: 1, damage: 72, attackArt: 'particle_atk_12', projectileArt: 'projectile_unit_melee', preferredTarget: 'core', hp: 831, amount: 8, artName: 'Vogel', notes:'Vogel charges at the enemy core in a straight line, recklessly attacking anything in its path.'},
  // TODO: pointless if there's no traps to trigger
  //{name: 'Triptrap', rarity: 'N', spriteName: 'triptrap', attackCD: 66, movespeed: 195, moveType: 'ground', attackRange: 1, damage: 11, attackArt: 'particle_atk_12', projectileArt: 'projectile_unit_melee', preferredTarget: 'traps', hp: 852, amount: 28, artName: 'Triptrap', notes:'TODO: Triptrap loves to trip traps! Traps will be triggered!'},
  {name: 'Doomflap', rarity: 'N', spriteName: 'doomflap', attackCD: 90, movespeed: 114, moveType: 'air', attackRange: 1, damage: 57, attackArt: 'particle_atk_12', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 399, amount: 8, artName: 'Doomflap', notes:'--'},
  {name: 'Blossom', rarity: 'N', spriteName: 'blossom', attackCD: 192, movespeed: 80, moveType: 'ground', attackRange: 12, damage: 34, attackArt: 'particle_atk_9', projectileArt: 'projectile_unit_sling', preferredTarget: 'any', hp: 105, amount: 30, artName: 'Blossom', notes:'--'},

  {name: 'Swordsman Ratty', rarity: 'R', spriteName: 'ratty_2', attackCD: 120, movespeed: 150, moveType: 'ground', attackRange: 1, damage: 166, attackArt: 'particle_atk_3', projectileArt: 'projectile_unit_melee', preferredTarget: 'any', hp: 590, amount: 15, artName: 'Ratty_2', shortName: 'Ratty(R)'},
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
          break;
        }
      }
      //this.body = Bodies.circle(spawnCoord.x+(GRID_SIZE*0.5), spawnCoord.y+(GRID_SIZE*0.5), 8, {
      this.body = Bodies.rectangle(spawnCoord.x+(GRID_SIZE*0.5), spawnCoord.y+(GRID_SIZE*0.5), 16, 16, {
        label: 'ally',
        frictionAir: 1, // magic numbers
        mass: 2,        // magic numbers
        collisionFilter: {
          category: ( info.moveType == 'air' ? ground | air : ground ),
          mask: ( info.moveType == 'air' ? air : ground )
        },
        custom: {
          shape: 'circle',

          unitName: info.name,
          charger: false, // set to true seperately
          damageMultiplier: false,
          kamikaze: false,

          hp_max: info.hp,
          hp_current: info.hp,
          attackRange: ( info.attackRange === 1 ? 1 : info.attackRange/2 ),
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
            sheet_down: getSprites(info.spriteName, 'idle'),
            sheet_left: getSprites(info.spriteName, 'left'),
            sheet_right: getSprites(info.spriteName, 'right'),
            sheet_up: getSprites(info.spriteName, 'up')
          }
        }
      //}, 10);
      });
      // special stats and settings
      switch (this.body.custom.unitName) {
        case 'Thievel':
          this.body.custom.damageMultiplier  = { "type": "economy", "factor": 5 };
          break;
        case 'Vogel':
          this.body.custom.charger = true;
          break;
        case 'Missile':
          this.body.custom.damageMultiplier  = { "type": "wall", "factor": 93 };
          this.body.custom.charger = true;
          this.body.custom.kamikaze = true;
          break;
        default:
          break;
      }
      World.add(world, this.body);
      //console.log(this.body.position);

      // pick a target once spawned
      unit_sortTargets(this.body);

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

/*
  Flow:
  unit_sortTargets        : list targets by distance and preference
  unit_acquireTarget      : if there's a target list 
  unit_pathfind           : attempt to path to target, consuming a target from the list
  unit_astar              : pathfinding, sets unit state to 'ready' if succesful
  unit_attackTarget       : if target, attack or approach
  unit_approachTarget     : move closer
*/

/** list targets by distance and preference */
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
        nearTargets_byDist_byCategory = target_economy.concat(target_defenses).concat(target_walls);
        break;
      case 'core':
        // only push the core? 
        nearTargets_byDist_byCategory.push({"target": building_CORE, "distance": getDistance(a.position, building_CORE.position), "category": building_CORE.custom.category});
        nearTargets_byDist_byCategory.concat(target_walls);
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

/** target the closest building, according to preference if there's a target list */
function unit_acquireTarget(a){
  if( a.custom.targetsArray && a.custom.targetsArray.length ){
    if( a.custom.target ){
      // empty out target if it's dead
      if( a.custom.target.custom.hp_current <= 0 ){
        a.custom.target = false;
        // optional but probably unnecessary
        //a.custom.targetsArray = [];
      }
    }else{
      // we shift the topmost off the stack of potentials, making the list shorter
      var tryTarget = a.custom.targetsArray.shift();
      //console.warn(`searching path from ${a.id} to ${tryTarget.target.id}`);
      unit_pathfind(a, tryTarget.target.id, tryTarget.target);
    }
  //}else{
    //console.warn(`${a.id} ran out of targets`);
  }
}

/** attempt to path to target, consuming a target from the list */
function unit_pathfind(bod, exceptID, exceptBod){

  // charger logic
  if( bod.custom.charger ){
    bod.custom.target = exceptBod;
    bod.custom.waypoint = exceptBod.position;
    bod.custom.state = 'ready';

    particles_Array.push(
      new ParticleEnt({x: exceptBod.position.x, y: exceptBod.position.y}, 2, 'particle_target', {x: 16, y: 16}, unitsImg.src)
    );
    return;
  }

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

/** pathfinding, sets unit state to 'ready' if succesful */
function unit_astar(astar_grid, start_pos, goal_pos, unit, target){
  // for ranged units
  // TODO: IT APPEARS TO WORK? But needs more testing
  // TODO: This doesn't consider vertices, expand later if necessary
  if( getDistance(unit.position, target.position) <= unit.custom.attackRange*GRID_SIZE ){
    unit.custom.target = target;
    unit.custom.waypoint = [target.position];
    unit.custom.state = 'ready';
    return;
  }

  var easystar = new EasyStar.js();
  easystar.setGrid(astar_grid);
  //easystar.enableDiagonals();
  easystar.setAcceptableTiles([0]);
  try {
    easystar.findPath(start_pos.x, start_pos.y, goal_pos.x, goal_pos.y, function( path ) {
      if (path === null) {
        //console.error(`path for ${unit.id} NOT found`);
      } else {
        //console.warn(`path for ${unit.id} found to ${target.id}`);
        unit.custom.target = target;
        unit.custom.waypoint = path;
        unit.custom.state = 'ready';

        particles_Array.push(
          new ParticleEnt({x: target.position.x, y: target.position.y}, 2, 'particle_target', {x: 16, y: 16}, unitsImg.src)
        );
      }
    });
    easystar.calculate();  
  } catch (error) {
    // try catch here because units that get pushed out of bounds crash the astar library
  }
}

/** if target, attack or approach */
function unit_attackTarget(a){
  if( !a.custom.target || Composite.get(world, a.custom.target.id, 'body') == null || Composite.get(world, a.id, 'body') == null ){
    return;
  }
  if( a.custom.charger && a.custom.attackCD <= 0 ){
    // TODO: run this entire function for EVERY building that's within attack range...
    // seems expensive. Maybe only the 1-grid building part
    let charger_collisions = Query.collides(a, buildings_all_Array);
    if( charger_collisions.length ){
      let notMyself = ( charger_collisions[0].bodyA.label == 'ally' ? charger_collisions[0].bodyB : charger_collisions[0].bodyA );
      unit_applyPain(a, notMyself);
      a.custom.attackCD = a.custom.attackCD_base;
      return;
    }
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
          break;
        }
      }
    }
    if( !hurt_point && a.custom.attackCD <= 0 ){
      // this prevents units walking into non-existence
      //if( a.custom.waypoint.length ){
        //console.log('cant reach vertex');
        unit_approachTarget(a);
      //}
    }
  }else{
    // this prevents units walking into non-existence
    //if( a.custom.waypoint.length ){
      unit_approachTarget(a);
    //}
  }
}

/** move actor closer */
function unit_approachTarget(a){
  // otherwise walk towards the closest waypoint, unless you're close, in which case,
  // shift if off the stack and repeat 
  var waypoint_raw = new Object;  
  if( a.custom.waypoint.length ){
    waypoint_raw = {x: ( a.custom.waypoint[0].x*GRID_SIZE )+( 0.5*GRID_SIZE ), y: ( a.custom.waypoint[0].y*GRID_SIZE )+( 0.5*GRID_SIZE )};
  }else{
    let target_points = a.custom.target.vertices;
    if( wbb(a.custom.target.bounds) > GRID_SIZE || hbb(a.custom.target.bounds) > GRID_SIZE ){
      var vert_bucket = [];
      for( vert of target_points ){
        vert_bucket.push( {pos: new Coordinate( vert.x, vert.y ), dist: getDistance(a.position, vert)} );
      }
      vert_bucket = vert_bucket.sort(function(apple,orange){
        return apple.dist-orange.dist;
      });
      if( vert_bucket.length ){
        waypoint_raw = { x: vert_bucket[0].pos.x, y: vert_bucket[0].pos.y };
      }else{
        // TODO: cleanup later
        console.error('fixme later!');
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

/** create a harmful projectile */
function unit_applyPain(a, t){
  //console.log(`unit ${a.id} attacking ${t.id}`);
  let distance = getDistance(a.position, t.position);
  let distanceDiff = ( distance/( a.custom.attackRange*GRID_SIZE ) ); // percentage of distance travelled already

  let lifetime_adjusted = ( a.custom.attackRange * 10 ) * distanceDiff; // used to be 90

  var damagePending = a.custom.damage;
  // if the unit has a damage multiplier, check if the target matches the type
  // I only support 1 type for bonus damage; if units exist with multiple TODO: make a.custom.damageMultiplier an array
  if( a.custom.damageMultiplier && a.custom.damageMultiplier.type == t.custom.category ){
    damagePending = damagePending * a.custom.damageMultiplier.factor;
  }

  if( a.custom.attackRange == 1 ){
    // TODO: melee units don't need projectile art, fix someday
    projectiles_Array.push(
      new ProjectileEnt(a.position, t.position, true, 1, t, damagePending, a.custom.projectileArt)
    );
  }else{
    projectiles_Array.push(
      new ProjectileEnt(a.position, t.position, true, lifetime_adjusted, t, damagePending, a.custom.projectileArt)
    );
  }
  
  particles_Array.push(
    new ParticleEnt({x: a.position.x+( 0.25*GRID_SIZE ), y: a.position.y-( 0.5*GRID_SIZE ) - ( unit.custom.moveType == 'air' ? UNIT_AIR_OFFSET : 0 )}, 3, a.custom.attackArt, {x: 32, y: 16}, unitsImg.src)
  );

  // if you're a kamikaze unit, die
  if( a.custom.kamikaze ){
    ripperoni_unit(a);
    a.custom.hp_current = 0;
    World.remove(world, a, true);
  }
}

// var test_allyGB2 = new UnitEnt( new Coordinate( GRID_SIZE*8, GRID_SIZE*2 ), 'Ratty' );
// new UnitEnt( new Coordinate( GRID_SIZE*20, GRID_SIZE*2 ), 'Sling' );
// new UnitEnt( new Coordinate( GRID_SIZE*21, GRID_SIZE*2 ), 'Sling' );
// new UnitEnt( new Coordinate( GRID_SIZE*22, GRID_SIZE*2 ), 'Sling' );
// new UnitEnt( new Coordinate( GRID_SIZE*23, GRID_SIZE*2 ), 'Sling' );

// =======================[ DOODAD ]====================================
function ripperoni_unit(a){
  // exploding into hunks of manga meat or gears / bolts would be funny too, but let's stick with this for now
  let tombstone = Bodies.rectangle(a.position.x, a.position.y-16, 8, 8, {
    label: 'doodad',
    label2: 'tombstone',
    collisionFilter: {
      category: ground | defaultCategory
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

// =======================[ DOM Functions ]====================================
function dom_listUnits(){
  for( unit of unitList ){
    // STUB: append to DOM element
  }
}
function dom_selectUnits(el){
  // STUB on choosing from DOM, update game_state.squad
}
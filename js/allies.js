let unitList = [
  // name, rarity, spriteName, attackCD, moveSpeed, attackRange, damage, preferredTarget, hp
  {name: 'Ratty', rarity: 'N', spriteName: 'ratty', attackCD: 210, movespeed: 140, moveType: 'ground', attackRange: 1, damage: 54, preferredTarget: 'any', hp: 180, amount: 15},
  {name: 'Sling', rarity: 'N', spriteName: 'sling', attackCD: 240, movespeed: 110, moveType: 'ground', attackRange: 10, damage: 26, preferredTarget: 'any', hp: 70, amount: 15}
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
      this.body = Bodies.circle(spawnCoord.x+(GRID_SIZE*0.5), spawnCoord.y+(GRID_SIZE*0.75), 8, {
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
          attackCD_base: 10,
          moveType: info.moveType,
          damage: info.damage,
          preferredTarget: info.preferredTarget,

          waypoint: false,
          target: false,

          state: 'idle',

          graphics: {
            renderMode: 'sheet_directional',
            sprite: './assets/origin.png',
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
  advance() { 
    // STUB
    /*
      acquire target, move to target
    */
  }
  applyPain() {
    //STUB
    console.log('ow!');
  }
}

// target the closest building, according to preference
function unit_acquireTarget(a){
  if( a.custom.target && a.custom.target.custom.hp_current <= 0 ){
    a.custom.target = false;
    a.custom.state = 'idle';
  }

  var eligibleTargets = new Array;

  switch (a.custom.preferredTarget) {
    case 'wall':
      eligibleTargets = walls_Array;
      break;
    case 'defense':
      eligibleTargets = defenses_Array;
      break;
    case 'economy':
      eligibleTargets = economy_Array;
      break;
    case 'any':
    default:
      eligibleTargets = buildings_Array;
      break;
  }
  
  var nearTargets = new Array;
  var nearTargets_byDist = new Array;
  for( e of eligibleTargets ){
    let e_dist = getDistance(a.position, e.position);
    nearTargets.push({"target": e, "distance": e_dist});
  }
  if( nearTargets.length ){
    // closest target is [0]
    nearTargets_byDist = nearTargets.sort(function(a,b){
      return a.distance-b.distance;
    });
    a.custom.target = nearTargets_byDist[0].target;
    //turret_atkTarget(a, nearTargets_byDist[0].target);

    /*
     TODO: for each from nearTargets_byDist 
     grid_pathfind
     push the result of the astar calc to a "potentialTargets" array
     as an object; target, distance

     then do the same for walls

     in the main cycle, check if there's anything in potentialTargets
    */

  }else{
    console.warn(`seeking out a wall for ${a.id} instead`);
    return;// return unit_acquireTarget_wall(a);
  }

  if( nearTargets_byDist.length && nearTargets_byDist[0].distance <= a.custom.attackRange ){
    a.custom.state = 'attacking';
  }else{
    // pathfind
    console.log('pathfinding!');
    grid_pathfind(a, GRID_SIZE, GRID_SIZE/8, a.custom.target.id);
  }
}

//target the closest wall
function unit_acquireTarget_wall(a){
  a.custom.target = false;
  a.custom.state = 'idle';

  var eligibleTargets = walls_Array;

  var nearTargets = new Array;
  var nearTargets_byDist = new Array;
  for( e of eligibleTargets ){
    let e_dist = getDistance(a.position, e.position);
    nearTargets.push({"target": e, "distance": e_dist});
  }
  if( nearTargets.length ){
    // closest target is [0]
    nearTargets_byDist = nearTargets.sort(function(a,b){
      return a.distance-b.distance;
    });
      
    a.custom.target = nearTargets_byDist[0].target;
  }else{
    a.custom.target = false;
    a.custom.state = 'idle';
    return;
  }

  if( nearTargets_byDist.length && nearTargets_byDist[0].distance <= a.custom.attackRange ){
    a.custom.state = 'attacking';
  }else{
    // pathfind
    console.log('pathfinding to a wall!');
    grid_pathfind(a, GRID_SIZE, GRID_SIZE/8, a.custom.target.id);
  }
}

function unit_attackTarget(a){
  if( a.custom.target && a.custom.target.custom.hp_current <= 0 ){
    a.custom.target = false;
    a.custom.state = 'idle';
    return;
  }
  if( getDistance(a.position, a.custom.target.position) <= a.custom.attackRange ){
    if( a.custom.attackCD <= 0 ){
      unit_applyPain(a);
      a.custom.attackCD = a.custom.attackCD_base;
    }
  }else{
    a.custom.state = 'moving';
  }
}

function unit_applyPain(a){
  console.log('take that, evildoer!');
}

var test_allyGB2 = new UnitEnt( new Coordinate( GRID_SIZE*8, GRID_SIZE*2 ), 'Ratty' );
new UnitEnt( new Coordinate( GRID_SIZE*20, GRID_SIZE*2 ), 'Sling' );

// =======================[ DOODAD ]====================================
function ripperoni(a){
  // exploding into hunks of manga meat or gears / bolts would be funny too, but let's stick with this for now
  let tombstone = Bodies.rectangle(a.position.x, a.position.y, 8, 8, {
    label: 'doodad',
    collisionFilter: {
      category: draggable_false
    },
    isStatic: true,
    isSensor: true,
    custom: {
      graphics: {
        renderMode: 'sheet_static',
        sprite: './assets/origin.png',
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


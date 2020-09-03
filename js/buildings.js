let buildingList = [
  {
    name: 'Wall',
    category: 'wall',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 16},
    levels: [
      { spriteName: 'wall_01', hp: 1125 },
      { spriteName: 'wall_02', hp: 2800 },
      { spriteName: 'wall_03', hp: 5805 }
    ]
  },
  {
    name: 'Turret',
    category: 'defense',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 16},
    levels: [
      { spriteName: 'turret_basic', hp: 1500, attackCD: 90, attackRange: 10, damage: 20/*200*/, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 1750, attackCD: 90, attackRange: 12, damage: 260, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 2200, attackCD: 90, attackRange: 14, damage: 349, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_basic', hp: 2750, attackCD: 90, attackRange: 17, damage: 468, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 3500, attackCD: 90, attackRange: 20, damage: 617, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 5000, attackCD: 90, attackRange: 23, damage: 795, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_basic', hp: 6250, attackCD: 90, attackRange: 24, damage: 1003, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 7500, attackCD: 90, attackRange: 24, damage: 1241, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 9000, attackCD: 90, attackRange: 24, damage: 1508, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_basic', hp: 10750, attackCD: 90, attackRange: 24, damage: 1800, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 11000, attackCD: 90, attackRange: 27, damage: 2500, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' }
    ]
  },
  {
    name: 'Rapid Turret',
    category: 'defense',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 16},
    levels: [
      { spriteName: 'turret_rapid', hp: 5250,  attackCD: 10, attackRange: 36, damage: 160, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' },
      { spriteName: 'turret_rapid', hp: 6750,  attackCD: 10, attackRange: 36, damage: 163, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' },
      { spriteName: 'turret_rapid', hp: 8750,  attackCD: 10, attackRange: 36, damage: 168, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' },
      { spriteName: 'turret_rapid', hp: 11750, attackCD: 10, attackRange: 36, damage: 174, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' },
      { spriteName: 'turret_rapid', hp: 15500, attackCD: 6,  attackRange: 36, damage: 200, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' },
      { spriteName: 'turret_rapid', hp: 24000, attackCD: 6,  attackRange: 36, damage: 250, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' },
      { spriteName: 'turret_rapid', hp: 29000, attackCD: 6,  attackRange: 36, damage: 280, element: false, target: 'any', attackType: 'single', projectileArt: 'projectile_rapid' }
    ]
  },
  {
    name: 'Core',
    category: 'economy',
    dim: {x: 5*GRID_SIZE, y: 4*GRID_SIZE},
    sprite_dim: {x: 5*16, y: 5*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'core_e', hp: 6000 },
      { spriteName: 'core_e', hp: 7500 },
      { spriteName: 'core_e', hp: 9500 },

      { spriteName: 'core_e', hp: 12500 },
      { spriteName: 'core_e', hp: 16125 },
      { spriteName: 'core_e', hp: 20500 },

      { spriteName: 'core_e', hp: 25500 },
      { spriteName: 'core_e', hp: 31250 },
      { spriteName: 'core_e', hp: 37750 },

      { spriteName: 'core_e', hp: 45000 }
    ]
  },
  {
    name: 'rock_s',
    category: 'terrain',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 16},
    levels: [
      { spriteName: 'terrain_rock_s', hp: 1125 }
    ]
  },
  {
    name: 'rock_l',
    category: 'terrain',
    dim: {x: 2*GRID_SIZE, y: 2*GRID_SIZE},
    sprite_dim: {x: 32, y: 32},
    levels: [
      { spriteName: 'terrain_rock_l', hp: 1125 }
    ]
  },
  {
    name: 'tree_s',
    category: 'terrain',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 16},
    levels: [
      { spriteName: 'terrain_tree_s', hp: 1125 }
    ]
  },
  {
    name: 'tree_l',
    category: 'terrain',
    dim: {x: 2*GRID_SIZE, y: 2*GRID_SIZE},
    sprite_dim: {x: 32, y: 32},
    levels: [
      { spriteName: 'terrain_tree_l', hp: 1125 }
    ]
  },
];

class BuildingEnt {
  constructor(
    unitID,
    level,
    spawnCoord
  ) {
      let info = new Object;
      for( let building of buildingList ){
        if( building.name == unitID ){
          info = building.levels[level];
          info.category = building.category;
          info.width = building.dim.x;
          info.height = building.dim.y;
          info.sprite_dim = building.sprite_dim;
          info.sprite_offset = (building.sprite_offset ? building.sprite_offset : false);
        }
      }
      //this.body = Bodies.rectangle(spawnCoord.x+(GRID_SIZE*0.5), spawnCoord.y+(GRID_SIZE*0.5), info.width, info.height, {
      this.body = Bodies.rectangle(spawnCoord.x+(info.width*0.5), spawnCoord.y+(info.height*0.5), info.width, info.height, {
        label: 'building',
        frictionAir: 1, // magic numbers
        mass: 2,        // magic numbers
        collisionFilter: {
          category: draggable_false
        },
        isStatic: true,
        custom: {
          hp_max: info.hp,
          hp_current: info.hp,
          category: info.category,
          level: level,
          name: unitID,

          turret: {
            range: (info.attackRange ? info.attackRange : false),
            attackCD: (info.attackCD ? info.attackCD : false),
            attackCD_base: (info.attackCD ? info.attackCD : false),
            damage: (info.damage ? info.damage : false),
            preferredTarget: (info.target ? info.target : false),
            aType: (info.attackType ? info.attackType : false),
            ammo: ( unitID == 'Rapid Turret' ? 15000 : false ),
            projectileArt: info.projectileArt
          },

          graphics: {
            renderMode: 'sheet_animation',
            sprite: buildingsImg.src,
            sprite_dim: info.sprite_dim,
            sheet_idle: getSprites(info.spriteName, 'idle'),
            sprite_offset: (info.sprite_offset ? info.sprite_offset : false)
          }
        }
      });
      World.add(world, this.body);
      //console.log(this.body.position);
      return this.body;
  }
}

function turret_acqTarget(a, range){
  var nearEnemies = new Array;
  for( e of units_Array ){
      let e_dist = getDistance(a.position, e.position);
      if( e_dist <= range ){
          nearEnemies.push({"target": e, "distance": e_dist});
      }
  }
  if( nearEnemies.length ){
      // closest target is [0]
      nearEnemies_byDist = nearEnemies.sort(function(a,b){
          return a.distance-b.distance;
      });
      turret_atkTarget(a, nearEnemies_byDist[0].target);
  }
}

function turret_atkTarget(a, t){
    console.log(`${a.id} attacking ${t.id}`);

    let distance = getDistance(a.position, t.position);
    let distanceDiff = ( distance/( a.custom.turret.range*GRID_SIZE ) ); // percentage of distance travelled already
    
    let lifetime_adjusted = 90 * distanceDiff;

    projectiles_Array.push(
        new ProjectileEnt(a.position, t.position, true, lifetime_adjusted, t, a.custom.turret.damage, a.custom.turret.projectileArt)
    );
}

// =======================[ DOODAD ]====================================
function ripperoni_building(a){
  // exploding into hunks of manga meat or gears / bolts would be funny too, but let's stick with this for now
  // MAGIC NUMBERS. MAGIC NUMBERS. UP ON THE MOUNTAIN. MAGIC NUMBERS.
  for( let hi = a.region.startCol; hi < a.region.endCol; hi++ ){
    for( let vi = a.region.startRow; vi < a.region.endRow; vi++ ){
      //let rubble = Bodies.rectangle(a.position.x, a.position.y+0.25*GRID_SIZE, GRID_SIZE, GRID_SIZE, {
      let rubble = Bodies.rectangle(hi*GRID_SIZE+( a.custom.category == 'wall' || a.custom.category == 'terrain' ? 0.5*GRID_SIZE : 1*GRID_SIZE ), vi*GRID_SIZE+( a.custom.category == 'wall' || a.custom.category == 'terrain' ? 0.5*GRID_SIZE : 1*GRID_SIZE ), GRID_SIZE, GRID_SIZE, {
        label: 'doodad',
        label2: 'rubble',
        collisionFilter: {
          category: draggable_false
        },
        isStatic: true,
        isSensor: true,
        custom: {
          graphics: {
            renderMode: 'sheet_static',
            sprite: buildingsImg.src,
            sprite_offset: 0.25*GRID_SIZE,
            sprite_dim: {
                x: 16,
                y: 16
            },
            sheet_idle: getSprites('rubble_'+(Math.ceil(Math.random()*3)), 'idle') // place rubble_1 to rubble_3, randomly
          }
        }
      });
      World.add(world, rubble);
    }
  }

  if( wbb(a.bounds) > GRID_SIZE || hbb(a.bounds) > GRID_SIZE ){
    for( vert of a.vertices ){
      particles_Array.push(
        new ParticleEnt({x: a.bounds.min.x+( Math.random()*wbb(a.bounds) ), y: a.bounds.min.y+( Math.random()*hbb(a.bounds) )}, 3, 'particle_explosion')
      );
    }
  }else{
    particles_Array.push(
      new ParticleEnt({x: a.position.x, y: a.position.y}, 3, 'particle_explosion')
    );
  }
}

var test_turret = new BuildingEnt( 'Turret', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*20.5) ) );

var building_CORE = new BuildingEnt( 'Core', 0, new Coordinate( (GRID_SIZE*25.5), (GRID_SIZE*23.5) ) );

// a circle of walls
new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*20) ) );
new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*18), (GRID_SIZE*20) ) );
new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*19), (GRID_SIZE*20) ) );
new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*20), (GRID_SIZE*20) ) );

new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*21) ) );
new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*20), (GRID_SIZE*21) ) );
new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*22) ) );
new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*20), (GRID_SIZE*22) ) );

new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*23) ) );
new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*18), (GRID_SIZE*23) ) );
new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*19), (GRID_SIZE*23) ) );
new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*20), (GRID_SIZE*23) ) );

new BuildingEnt( 'Turret', 0, new Coordinate( (GRID_SIZE*18.5), (GRID_SIZE*21.5) ) );
//new BuildingEnt( 'Turret', 0, new Coordinate( (GRID_SIZE*25), (GRID_SIZE*22) ) );

new BuildingEnt( 'rock_l', 0, new Coordinate( (GRID_SIZE*2), (GRID_SIZE*18) ) );

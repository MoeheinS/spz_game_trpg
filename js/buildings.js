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
    sprite_offset: {x: 0, y: 0},
    levels: [
      { spriteName: 'turret_basic', hp: 1500,  attackCD: 90, attackRange: 10, damage: 200,  element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 1750,  attackCD: 90, attackRange: 12, damage: 260,  element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 2200,  attackCD: 90, attackRange: 14, damage: 349,  element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_basic', hp: 2750,  attackCD: 90, attackRange: 17, damage: 468,  element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 3500,  attackCD: 90, attackRange: 20, damage: 617,  element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 5000,  attackCD: 90, attackRange: 23, damage: 795,  element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_basic', hp: 6250,  attackCD: 90, attackRange: 24, damage: 1003, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 7500,  attackCD: 90, attackRange: 24, damage: 1241, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 9000,  attackCD: 90, attackRange: 24, damage: 1508, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_basic', hp: 10750, attackCD: 90, attackRange: 24, damage: 1800, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_basic', hp: 11000, attackCD: 90, attackRange: 27, damage: 2500, element: false, target: 'ground', attackType: 'single', projectileArt: 'projectile_basic' }
    ]
  },
  {
    name: 'Tower Turret',
    category: 'defense',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 2*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'turret_tower', hp: 1500, attackCD: 33, attackRange: 24, damage: 66,  element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_tower', hp: 1750, attackCD: 33, attackRange: 25, damage: 73,  element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_tower', hp: 2000, attackCD: 33, attackRange: 26, damage: 83,  element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_tower', hp: 2500, attackCD: 33, attackRange: 27, damage: 96,  element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_tower', hp: 3000, attackCD: 33, attackRange: 28, damage: 113, element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_tower', hp: 4250, attackCD: 33, attackRange: 29, damage: 133, element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_tower', hp: 5250, attackCD: 33, attackRange: 30, damage: 156, element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_tower', hp: 6250, attackCD: 33, attackRange: 30, damage: 182, element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      { spriteName: 'turret_tower', hp: 7250, attackCD: 33, attackRange: 30, damage: 211, element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' },
      
      { spriteName: 'turret_tower', hp: 8500, attackCD: 33, attackRange: 31, damage: 300, element: false, target: 'any', attackType: 'closest', projectileArt: 'projectile_basic' }
    ]
  },
  {
    name: 'Mermage',
    category: 'defense',
    // wizard
    // dim: {x: GRID_SIZE, y: GRID_SIZE},
    // sprite_dim: {x: 16, y: 2*16},
    // sprite_offset: {x: 0, y: 1*GRID_SIZE},
    
    // mermaid
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 3*16},
    sprite_offset: {x: 0, y: 2*GRID_SIZE},
    levels: [
      { spriteName: 'turret_aa', hp: 3000,  attackCD: 120, attackRange: 30, damage: 66,  element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      { spriteName: 'turret_aa', hp: 3500,  attackCD: 120, attackRange: 30, damage: 73,  element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      { spriteName: 'turret_aa', hp: 4000,  attackCD: 120, attackRange: 30, damage: 83,  element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      
      { spriteName: 'turret_aa', hp: 4750,  attackCD: 120, attackRange: 30, damage: 96,  element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      { spriteName: 'turret_aa', hp: 7000,  attackCD: 120, attackRange: 30, damage: 113, element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      { spriteName: 'turret_aa', hp: 8250,  attackCD: 120, attackRange: 30, damage: 133, element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      
      { spriteName: 'turret_aa', hp: 10000, attackCD: 120, attackRange: 30, damage: 156, element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      { spriteName: 'turret_aa', hp: 12000, attackCD: 120, attackRange: 31, damage: 182, element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' },
      { spriteName: 'turret_aa', hp: 15000, attackCD: 105, attackRange: 33, damage: 211, element: false, target: 'air', attackType: 'area', projectileArt: 'projectile_aa' }
    ]
  },
  {
    name: 'Curse Box',
    category: 'defense',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 2*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'turret_aoe', hp: 750,   attackCD: 120, attackRange: 9,  damage: 800,  element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      { spriteName: 'turret_aoe', hp: 1250,  attackCD: 120, attackRange: 10, damage: 878,  element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      { spriteName: 'turret_aoe', hp: 2000,  attackCD: 120, attackRange: 11, damage: 995,  element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      
      { spriteName: 'turret_aoe', hp: 3000,  attackCD: 120, attackRange: 13, damage: 1151, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      { spriteName: 'turret_aoe', hp: 4000,  attackCD: 120, attackRange: 14, damage: 1346, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      { spriteName: 'turret_aoe', hp: 5500,  attackCD: 120, attackRange: 14, damage: 1580, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      
      { spriteName: 'turret_aoe', hp: 7000,  attackCD: 120, attackRange: 14, damage: 1852, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      { spriteName: 'turret_aoe', hp: 9000,  attackCD: 120, attackRange: 14, damage: 2160, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' },
      { spriteName: 'turret_aoe', hp: 11000, attackCD: 120, attackRange: 14, damage: 2470, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_aoe' }
    ]
  },
  // name: 'Lobber Golem',
  {
    name: 'Hidden Turret', // attacks all units in range
    category: 'defense',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 2*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'turret_hidden', hp: 1500, attackCD: 150, attackRange: 10, damage: 700,  element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_hidden' },
      { spriteName: 'turret_hidden', hp: 2500, attackCD: 150, attackRange: 10, damage: 927,  element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_hidden' },
      { spriteName: 'turret_hidden', hp: 3750, attackCD: 150, attackRange: 10, damage: 1110, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_hidden' },
      
      { spriteName: 'turret_hidden', hp: 5750, attackCD: 150, attackRange: 10, damage: 1354, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_hidden' },
      { spriteName: 'turret_hidden', hp: 8100, attackCD: 150, attackRange: 10, damage: 1656, element: false, target: 'any', attackType: 'area', projectileArt: 'projectile_hidden' }
    ]
  },
  {
    name: 'Rapid Turret',
    category: 'defense',
    dim: {x: GRID_SIZE, y: GRID_SIZE},
    sprite_dim: {x: 16, y: 2*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
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
  // name: 'Campy Mage',
  // name: 'Air Elemental',
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
    name: 'Gold Harvester',
    category: 'economy',
    dim: {x: 1*GRID_SIZE, y: 1*GRID_SIZE},
    sprite_dim: {x: 1*16, y: 2*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'bld_gold_harvester', hp: 1200, storage: 500, ppm: 5 },
      { spriteName: 'bld_gold_harvester', hp: 1500, storage: 1200, ppm: 8 },
      { spriteName: 'bld_gold_harvester', hp: 1750, storage: 1800, ppm: 12 },

      { spriteName: 'bld_gold_harvester', hp: 2250, storage: 2900, ppm: 16 },
      { spriteName: 'bld_gold_harvester', hp: 2750, storage: 10000, ppm: 20 },
      { spriteName: 'bld_gold_harvester', hp: 3500, storage: 20000, ppm: 25 },

      { spriteName: 'bld_gold_harvester', hp: 4250, storage: 30000, ppm: 30 },
      { spriteName: 'bld_gold_harvester', hp: 5000, storage: 60000, ppm: 35 },
      { spriteName: 'bld_gold_harvester', hp: 6000, storage: 95000, ppm: 40 },

      { spriteName: 'bld_gold_harvester', hp: 7200, storage: 130000, ppm: 45 }
    ]
  },
  {
    name: 'Mana Harvester',
    category: 'economy',
    dim: {x: 1*GRID_SIZE, y: 1*GRID_SIZE},
    sprite_dim: {x: 1*16, y: 2*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'bld_mana_harvester', hp: 1200, storage: 500, ppm: 5 },
      { spriteName: 'bld_mana_harvester', hp: 1500, storage: 1200, ppm: 8 },
      { spriteName: 'bld_mana_harvester', hp: 1750, storage: 1800, ppm: 12 },

      { spriteName: 'bld_mana_harvester', hp: 2250, storage: 2900, ppm: 16 },
      { spriteName: 'bld_mana_harvester', hp: 2750, storage: 10000, ppm: 20 },
      { spriteName: 'bld_mana_harvester', hp: 3500, storage: 20000, ppm: 25 },

      { spriteName: 'bld_mana_harvester', hp: 4250, storage: 30000, ppm: 30 },
      { spriteName: 'bld_mana_harvester', hp: 5000, storage: 60000, ppm: 35 },
      { spriteName: 'bld_mana_harvester', hp: 6000, storage: 95000, ppm: 40 },

      { spriteName: 'bld_mana_harvester', hp: 7200, storage: 130000, ppm: 45 }
    ]
  },
  {
    name: 'Gold Storage',
    category: 'economy',
    dim: {x: 3*GRID_SIZE, y: 2*GRID_SIZE},
    sprite_dim: {x: 3*16, y: 3*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'bld_gold_storage', hp: 1200, storage: 1500 },
      { spriteName: 'bld_gold_storage', hp: 2000, storage: 9000 },
      { spriteName: 'bld_gold_storage', hp: 3250, storage: 36000 },

      { spriteName: 'bld_gold_storage', hp: 5000, storage: 112500  },
      { spriteName: 'bld_gold_storage', hp: 7000, storage: 360000  },
      { spriteName: 'bld_gold_storage', hp: 9500, storage: 1000000 },

      { spriteName: 'bld_gold_storage', hp: 12250, storage: 1500000 },
      { spriteName: 'bld_gold_storage', hp: 15500, storage: 2100000 },
      { spriteName: 'bld_gold_storage', hp: 19250, storage: 2300000 },

      { spriteName: 'bld_gold_storage', hp: 23500, storage: 2500000 }
    ]
  },
  {
    name: 'Mana Storage',
    category: 'economy',
    dim: {x: 2*GRID_SIZE, y: 2*GRID_SIZE},
    sprite_dim: {x: 2*16, y: 3*16},
    sprite_offset: {x: 0, y: 1*GRID_SIZE},
    levels: [
      { spriteName: 'bld_mana_storage', hp: 1200, storage: 1500 },
      { spriteName: 'bld_mana_storage', hp: 2000, storage: 9000 },
      { spriteName: 'bld_mana_storage', hp: 3250, storage: 36000 },

      { spriteName: 'bld_mana_storage', hp: 5000, storage: 112500 },
      { spriteName: 'bld_mana_storage', hp: 7000, storage: 360000 },
      { spriteName: 'bld_mana_storage', hp: 9500, storage: 1000000 },

      { spriteName: 'bld_mana_storage', hp: 12250, storage: 1500000 },
      { spriteName: 'bld_mana_storage', hp: 15500, storage: 2100000 },
      { spriteName: 'bld_mana_storage', hp: 19250, storage: 2300000 },

      { spriteName: 'bld_mana_storage', hp: 23500, storage: 2500000 }
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
          category: ( info.category == 'wall' ? ground : ground | air )
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
            // any, ground, air
            preferredTarget: (info.target ? info.target : false),
            // single, closest, area
            aType: (info.attackType ? info.attackType : false),
            ammo: ( unitID == 'Rapid Turret' ? 15000 : false ),
            projectileArt: info.projectileArt,
            targetID: false
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
        if( a.custom.turret.preferredTarget == 'any' || e.custom.moveType == a.custom.turret.preferredTarget ){
          nearEnemies.push({"target": e, "distance": e_dist});
        }
      }
  }
  if( nearEnemies.length ){
      // closest target is [0]
      nearEnemies_byDist = nearEnemies.sort(function(a,b){
          return a.distance-b.distance;
      });

      switch (a.custom.turret.aType) { // aType == single, closest, area
        case 'single':
          var chosenTarget = Composite.get(world, a.custom.turret.targetID, 'body');
          // no target yet, target dead, or target out of range -> switch target
          if( a.custom.turret.targetID == false || chosenTarget == null || getDistance(a.position, chosenTarget.position) > range ){
            a.custom.turret.targetID = nearEnemies_byDist[0].target.id;
          }
          chosenTarget = Composite.get(world, a.custom.turret.targetID, 'body');
          turret_atkTarget(a, chosenTarget);
          break;
        case 'closest':
          turret_atkTarget(a, nearEnemies_byDist[0].target);
          break;
        case 'area':
          for( ne of nearEnemies_byDist ){
            turret_atkTarget(a, ne.target);
          }
          break;
        default:
          break;
      }
  }
}

function turret_atkTarget(a, t){
    if( a.custom.name == 'Rapid Turret' ){
      if( a.custom.turret.ammo > 0 ){
        a.custom.turret.ammo--;
      }else{
        return;
      }
    }
    if( a.custom.name == 'Mermage' ){
      particles_Array.push(
        new ParticleEnt({x: t.position.x, y: t.position.y}, 3, 'projectile_aa_ground')
      );
      projectiles_Array.push(
        new ProjectileEnt({x: t.position.x, y:t.position.y - UNIT_AIR_OFFSET}, t.position, true, 18, t, a.custom.turret.damage, a.custom.turret.projectileArt)
      );
      return;
    }
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
          category: ground
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

building_CORE = new BuildingEnt( 'Core', 0, new Coordinate( (GRID_SIZE*25.5), (GRID_SIZE*23.5) ) );

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

new BuildingEnt( 'rock_l', 0, new Coordinate( (GRID_SIZE*2), (GRID_SIZE*18) ) );

new BuildingEnt( 'Gold Harvester', 0, new Coordinate( (GRID_SIZE*2.5), (GRID_SIZE*2.5) ) );
new BuildingEnt( 'Gold Storage', 0, new Coordinate( (GRID_SIZE*2.5), (GRID_SIZE*4.5) ) );
new BuildingEnt( 'Mana Harvester', 0, new Coordinate( (GRID_SIZE*36.5), (GRID_SIZE*34.5) ) );
new BuildingEnt( 'Mana Storage', 0, new Coordinate( (GRID_SIZE*36.5), (GRID_SIZE*36.5) ) );

// turret testing range
new BuildingEnt( 'Turret', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*20.5) ) );
new BuildingEnt( 'Tower Turret', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*22.5) ) );
new BuildingEnt( 'Mermage', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*24.5) ) ); // AA tower
new BuildingEnt( 'Curse Box', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*26.5) ) ); // AoE tower
      //new BuildingEnt( 'Lobber Golem', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*28.5) ) ); // Artillery
new BuildingEnt( 'Hidden Turret', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*30.5) ) );
new BuildingEnt( 'Rapid Turret', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*32.5) ) );
      //new BuildingEnt( 'Campy Mage', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*34.5) ) ); // Magic Eye
      //new BuildingEnt( 'Air Elemental', 0, new Coordinate( (GRID_SIZE*7.5), (GRID_SIZE*36.5) ) ); // Fan
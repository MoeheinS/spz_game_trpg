let buildingList = [
  {
    name: 'Wall',
    category: 'wall',
    levels: [
      { spriteName: 'wall_01', hp: 1125 },
      { spriteName: 'wall_02', hp: 2800 },
      { spriteName: 'wall_03', hp: 5805 }
    ]
  },
  {
    name: 'Turret',
    category: 'defense',
    levels: [
      { spriteName: 'turret_basic', hp: 1650, attackCD: 5400, attackRange: 14, damage: 220, element: false, target: 'ground', attackType: 'single', projectileArt: 'bullet_basic' },
      { spriteName: 'turret_basic', hp: 1956, attackCD: 5400, attackRange: 17, damage: 286, element: false, target: 'ground', attackType: 'single', projectileArt: 'bullet_basic' },
      { spriteName: 'turret_basic', hp: 2415, attackCD: 5400, attackRange: 20, damage: 384, element: false, target: 'ground', attackType: 'single', projectileArt: 'bullet_basic' }
    ]
  },
  {
    name: 'Core',
    category: 'economy',
    levels: [
      { spriteName: 'core', hp: 6000 }
    ]
  }
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
          }
        }
        this.body = Bodies.rectangle(spawnCoord.x+(GRID_SIZE*0.5), spawnCoord.y+(GRID_SIZE*0.5), 16, 16, {
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

            turret: {
              range: (info.attackRange ? info.attackRange : false),
              attackCD: (info.attackCD ? info.attackCD : false),
              attackCD_base: (info.attackCD ? 10 : false),
              damage: (info.damage ? info.damage : false),
              preferredTarget: (info.target ? info.target : false),
              aType: (info.attackType ? info.attackType : false),
            },
  
            graphics: {
              renderMode: 'sheet_animation',
              sprite: './assets/origin.png',
              sprite_dim: {
                x: 16,
                y: 16
              },
              sheet_idle: getSprites(info.spriteName, 'idle'),
            }
          }
        });
        World.add(world, this.body);
        //console.log(this.body.position);
        return this.body;
    }
    aimAndFire() { 
      // STUB
      /*
        acquire target, shoot at target
      */
    }
    applyPain() {
      //STUB
      console.log('owie!');
    }
    die() {
      if( this.body.custom.hp_current <= 0 ){
        // TODO: need a ripperoni for buildings
        ripperoni(this.body);
        World.remove(world, this.body, true);
      }
    }
  }

  var test_turret = new BuildingEnt( 'Turret', 0, new Coordinate( (GRID_SIZE*7), (GRID_SIZE*20) ) );

  // a circle of walls
  new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*20) ) );
  new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*18), (GRID_SIZE*20) ) );
  new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*19), (GRID_SIZE*20) ) );
  new BuildingEnt( 'Wall', 0, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*21) ) );
  new BuildingEnt( 'Core', 0, new Coordinate( (GRID_SIZE*18), (GRID_SIZE*21) ) );
  new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*19), (GRID_SIZE*21) ) );
  new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*17), (GRID_SIZE*22) ) );
  new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*18), (GRID_SIZE*22) ) );
  new BuildingEnt( 'Wall', 1, new Coordinate( (GRID_SIZE*19), (GRID_SIZE*22) ) );
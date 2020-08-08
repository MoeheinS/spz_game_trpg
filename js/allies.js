let unitList = [
  // name, rarity, spriteName, attackCD, moveSpeed, attackRange, damage, preferredTarget, hp
  {name: 'Ratty', rarity: 'N', spriteName: 'ratty', attackCD: 210, movespeed: 140, attackRange: 1, damage: 54, preferredTarget: 'any', hp: 180, amount: 15},
  {name: 'Sling', rarity: 'N', spriteName: 'sling', attackCD: 240, movespeed: 110, attackRange: 10, damage: 26, preferredTarget: 'any', hp: 70, amount: 15}
];

class UnitEnt {
  constructor(
      spawnCoord,
      faction,
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
          faction: faction,
          shape: 'circle',

          hp_max: info.hp,
          hp_current: info.hp,
          attackRange: info.attackRange,
          attackCD: info.attackCD,
          attackCD_base: 10,
          damage: info.damage,
          preferredTarget: info.preferredTarget,

          state: 'idle',

          graphics: {
            sheet: true,
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
      console.log(this.body.position);
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
  die() {
    // STUB
    // spawn a little tombstone doodad
  }
}

var test_allyGB2 = new UnitEnt( new Coordinate( GRID_SIZE*8, GRID_SIZE*2 ), 'friendlies', 'Ratty' );
new UnitEnt( new Coordinate( GRID_SIZE*20, GRID_SIZE*2 ), 'friendlies', 'Sling' );
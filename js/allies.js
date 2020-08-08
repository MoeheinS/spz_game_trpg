class UnitEnt {
  constructor(
      spawnCoord,
      faction,
      spriteName,
      hp,
      attackCD,
      moveSpeed,
      damage // all these things should be taken from a unit index, but for now...
  ) {
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
          hp_max: hp,
          hp_current: hp,
          state: 'idle',

          graphics: {
            sheet: true,
            sprite: './assets/origin.png',
            sprite_dim: {
              x: 16,
              y: 16
            },
            sheet_idle: getSprites(spriteName, 'idle'),
            sheet_left: getSprites(spriteName, 'left'),
            sheet_right: getSprites(spriteName, 'right'),
            sheet_up: getSprites(spriteName, 'up')
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

var test_allyGB2 = new UnitEnt( new Coordinate( GRID_SIZE*8, GRID_SIZE*2 ), 'friendlies', 'ratty', 100 );
new UnitEnt( new Coordinate( GRID_SIZE*20, GRID_SIZE*2 ), 'friendlies', 'warrior_human', 100 );
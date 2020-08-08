// 8 radius; 16 w/h, then render a 32x32 sprite with the physics body at the foot
var test_allyGB = Bodies.circle(reWi-(GRID_SIZE*5), 300, 8, {
//var test_allyGB = Bodies.rectangle(reWi-(GRID_SIZE*5), 300, 16, 16, {
  label: 'ally',
  frictionAir: 1,
  mass: 2,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*5,
    maxMove: GRID_SIZE*5,
    startPoint: { 
      x: reWi-(GRID_SIZE*5),
      y: 300
    },
    shape: 'circle',
    graphics: {
      sheet: true,
      sprite: './assets/origin.png',
      sprite_dim: {
        x: 16,
        y: 16
      },
      sheet_idle: getSprites('warrior_human', 'idle'),
      sheet_left: getSprites('warrior_human', 'left'),
      sheet_right: getSprites('warrior_human', 'right'),
      sheet_up: getSprites('warrior_human', 'up')
    }
  }
}, 10);
//});
World.add(world, test_allyGB);

var test_allyGB2 = Bodies.circle(reWi-(GRID_SIZE*5), 600, 8, {
  label: 'ally',
  frictionAir: 1,
  mass: 2,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*5,
    maxMove: GRID_SIZE*5,
    startPoint: { 
      x: reWi-(GRID_SIZE*5),
      y: 300
    },
    shape: 'circle',
    graphics: {
      sheet: true,
      sprite: './assets/origin.png',
      sprite_dim: {
        x: 16,
        y: 16
      },
      sheet_idle: getSprites('ratty', 'idle'),
      sheet_left: getSprites('ratty', 'left'),
      sheet_right: getSprites('ratty', 'right'),
      sheet_up: getSprites('ratty', 'up')
    }
  }
}, 10);
World.add(world, test_allyGB2);



class UnitEnt {
  constructor(
      spawnCoord,
      faction
  ) {
      this.body = Bodies.circle(spawnCoord.x, spawnCoord.y, 8, {
        label: 'ally',
        frictionAir: 1, // magic numbers
        mass: 2,        // magic numbers
        collisionFilter: {
          category: draggable_false
        },
        custom: {
          faction: faction,
          shape: 'circle',
          graphics: {
            sheet: true,
            sprite: './assets/origin.png',
            sprite_dim: {
              x: 16,
              y: 16
            },
            sheet_idle: getSprites('ratty', 'idle'),
            sheet_left: getSprites('ratty', 'left'),
            sheet_right: getSprites('ratty', 'right'),
            sheet_up: getSprites('ratty', 'up')
          }
        }
      }, 10);
  }
  advance() { // advance the projectile
      if( this.lifetime >= this.lifetimeMax ){
          // mostly STUB. apply pain? stop rendering this? remove this from something?
          // TODO: if there's an array, remove self from said array
          projectiles_Array.splice(projectiles_Array.indexOf(this), 1);
          this.applyPain();
      }else{
          this.lifetime++;
          let progress = 1 - ( this.lifetime / this.lifetimeMax );
          // console.warn('goal');
          // console.table(this.goal);
          // console.warn('origin');
          // console.table(this.origin);

          let diff_x = Math.abs( this.origin.x - this.goal.x ) * progress;
          let diff_y = Math.abs( this.origin.y - this.goal.y ) * progress;

          this.position.x = ( this.goal.x > this.origin.x ? this.goal.x - diff_x : this.goal.x + diff_x );
          this.position.y = ( this.goal.y > this.origin.y ? this.goal.y - diff_y : this.goal.y + diff_y );
          // TODO: this might be worthwhile, but the ends are too big?
          //this.arcHeight = Math.sin( Math.PI * ( progress - 0.00000001 ) );
      }
  }
  applyPain() {
      //STUB
      console.log('ow!');
  }
}
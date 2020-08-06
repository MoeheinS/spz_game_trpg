// 64 is a magic number. GRID_SIZE is 60ish and based on viewport. 
// I could decide to set GRID_SIZE based on static pixels in the future
var test_ally1 = Bodies.rectangle(reWi-(GRID_SIZE*4), reHi-(GRID_SIZE*12), 64, 64, {
  label: 'ally',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*5,
    maxMove: GRID_SIZE*5,
    startPoint: { 
      x: reWi-(GRID_SIZE*4),
      y: reHi-(GRID_SIZE*12)
    },
    graphics: {
      sprite: './assets/smt/mesian_4_1.png',
      sprite_dim: {
        x: 72,
        y: 64
      },
      animation: ['./assets/smt/mesian_4_1.png', './assets/smt/mesian_4_2.png']
    }
  }
});
World.add(world, test_ally1);

var test_ally2 = Bodies.rectangle(reWi-(GRID_SIZE*5), reHi-(GRID_SIZE*13), 64, 64, {
  label: 'ally',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*5,
    maxMove: GRID_SIZE*5,
    startPoint: { 
      x: reWi-(GRID_SIZE*5),
      y: reHi-(GRID_SIZE*13)
    },
    graphics: {
      sprite: './assets/smt/mesian_5_1.png',
      sprite_dim: {
        x: 62,
        y: 64
      },
      animation: ['./assets/smt/mesian_5_1.png', './assets/smt/mesian_5_2.png']
    }
  }
});
World.add(world, test_ally2);

var test_ally3 = Bodies.rectangle(reWi-(GRID_SIZE*5), reHi-(GRID_SIZE*12), 64, 64, {
  label: 'ally',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*5,
    maxMove: GRID_SIZE*5,
    startPoint: { 
      x: reWi-(GRID_SIZE*5),
      y: reHi-(GRID_SIZE*13)
    },
    graphics: {
      sprite: './assets/smt/mesian_3_1.png',
      sprite_dim: {
        x: 51,
        y: 79
      },
      animation: ['./assets/smt/mesian_3_1.png', './assets/smt/mesian_3_2.png', './assets/smt/mesian_3_3.png']
    }
  }
});
World.add(world, test_ally3);

var test_allyZ = buildCircle(reWi-(GRID_SIZE*4), reHi-(GRID_SIZE*4), GRID_SIZE*1, {
  label: 'ally',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi-(GRID_SIZE*4),
      y: reHi-(GRID_SIZE*4)
    },
    graphics: {
      sprite: './assets/3382.png'
    }
  }
});
//World.add(world, test_allyZ);

function getSprites(iname, key){
  for( sheet of spriteSheetCoords ){
    if( sheet.iname == iname ){
      let spriteCoords = [];
      for( o of sheet[key] ){
        spriteCoords.push({ x: o.x, y: o.y });
      }
      return spriteCoords;
    }
  }
}

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
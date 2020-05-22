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
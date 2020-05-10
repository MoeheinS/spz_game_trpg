var test_ally1 = Bodies.rectangle(reWi-(GRID_SIZE*4), reHi-(GRID_SIZE*12), 72, 64, {
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
    sprite: './assets/smt/mesian_4_1.png',
    animation: ['./assets/smt/mesian_4_1.png', './assets/smt/mesian_4_2.png']
  }
});
World.add(world, test_ally1);

var test_ally2 = Bodies.rectangle(reWi-(GRID_SIZE*5), reHi-(GRID_SIZE*13), 62, 64, {
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
    sprite: './assets/smt/mesian_5_1.png',
    animation: ['./assets/smt/mesian_5_1.png', './assets/smt/mesian_5_2.png']
  }
});
World.add(world, test_ally2);

var test_ally3 = Bodies.rectangle(reWi-(GRID_SIZE*5), reHi-(GRID_SIZE*12), 51, 79, {
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
    sprite: './assets/smt/mesian_3_1.png',
    animation: ['./assets/smt/mesian_3_1.png', './assets/smt/mesian_3_2.png', './assets/smt/mesian_3_3.png']
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
    sprite: './assets/3382.png'
  }
});
//World.add(world, test_allyZ);
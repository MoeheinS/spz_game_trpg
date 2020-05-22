var test_enemy = Bodies.rectangle(GRID_SIZE*4, GRID_SIZE*2, 80, 88, {
  label: 'enemy',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: GRID_SIZE*4, 
      y: GRID_SIZE*2 
    },
    graphics: {
      sprite: './assets/smt/suika.png',
      sprite_dim: {
        x: 80,
        y: 88
      }
    }
  }
});
World.add(world, test_enemy);
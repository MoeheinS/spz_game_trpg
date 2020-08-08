var test_turret = Bodies.rectangle(reWi-(GRID_SIZE*7), reHi-(GRID_SIZE*10), 16, 16, {
    label: 'ally',
    frictionAir: 1,
    collisionFilter: {
      category: draggable_false
    },
    custom: {
      faction: 'ally',
      turret: {
        range: 10,
        aType: 'direct'
      },
      baseMove: GRID_SIZE*5,
      maxMove: GRID_SIZE*5,
      startPoint: { 
        x: reWi-(GRID_SIZE*4),
        y: reHi-(GRID_SIZE*12)
      },
      graphics: {
        renderMode: 'sheet_animation',
        sprite: './assets/origin.png',
        sprite_dim: {
            x: 16,
            y: 16
        },
        sheet_idle: getSprites('turret_basic', 'idle')
      }
    }
  });
  World.add(world, test_turret);
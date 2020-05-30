var w_bot = buildRect(reWi*0.5, reHi+(GRID_SIZE*0.5), reWi, GRID_SIZE, { 
  label: 'wall',
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});
var w_top = buildRect(reWi*0.5, 0-(GRID_SIZE*0.5), reWi, GRID_SIZE, { 
  label: 'wall',
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});
var w_right = buildRect(reWi+(GRID_SIZE*0.5), (reHi*0.5), GRID_SIZE, reHi, {
  label: "wall",
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});
var w_left = buildRect(0-(GRID_SIZE*0.5), reHi*0.5, GRID_SIZE, reHi, {
  label: "wall",
  isStatic: true,
  collisionFilter: {
    category: draggable_false
  }
});

// basic world boundary
World.add(world, [
  w_bot,
  w_top,
  w_left,
  w_right
]);

var test_obstacle_pillar = Bodies.rectangle(reWi*0.5, reHi*0.25, GRID_SIZE*2, GRID_SIZE*1.5, {
  label: 'obstacle',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  isStatic: true,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi*0.5, 
      y: reHi*0.25
    },
    render: 'sprite'
  }
});
World.add(world, test_obstacle_pillar);

var test_obstacle_shape = Bodies.rectangle(reWi*0.5, GRID_SIZE*9, GRID_SIZE*1.5, GRID_SIZE*7.5, {
  label: 'shape',
  frictionAir: 1,
  collisionFilter: {
    category: draggable_false
  },
  isStatic: true,
  custom: {
    baseMove: GRID_SIZE*4,
    maxMove: GRID_SIZE*4,
    startPoint: { 
      x: reWi*0.5, 
      y: GRID_SIZE*9 
    },
    render: 'shape'
  }
});
World.add(world, test_obstacle_shape);
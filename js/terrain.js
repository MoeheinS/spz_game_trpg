var w_bot = buildRect(FIELD_SIZE*0.5, FIELD_SIZE+(GRID_SIZE*0.5), FIELD_SIZE, GRID_SIZE, { 
  label: 'boundary',
  isStatic: true,
  collisionFilter: {
    category: ground | air
  }
});
var w_top = buildRect(FIELD_SIZE*0.5, 0-(GRID_SIZE*0.5), FIELD_SIZE, GRID_SIZE, { 
  label: 'boundary',
  isStatic: true,
  collisionFilter: {
    category: ground | air
  }
});
var w_right = buildRect(FIELD_SIZE+(GRID_SIZE*0.5), (FIELD_SIZE*0.5), GRID_SIZE, FIELD_SIZE, {
  label: "boundary",
  isStatic: true,
  collisionFilter: {
    category: ground | air
  }
});
var w_left = buildRect(0-(GRID_SIZE*0.5), FIELD_SIZE*0.5, GRID_SIZE, FIELD_SIZE, {
  label: "boundary",
  isStatic: true,
  collisionFilter: {
    category: ground | air
  }
});

// basic world boundary
World.add(world, [
  w_bot,
  w_top,
  w_left,
  w_right
]);

// height: 40*32
// width: 40*32
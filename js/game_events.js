// actor, waypoint
function cycle_movement(a, w){
    moveToPoint(a, {x: w.x, y: w.y}, 0.01, true);
}
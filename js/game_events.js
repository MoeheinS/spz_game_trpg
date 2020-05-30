// actor, waypoint
function cycle_movement(a, w){
    // move speed differs based on a.mass
    //let force = 0.01;
    // uniform move speed
    let force = 0.01 * a.mass;

    let deltaVector = Vector.sub({x: w.x, y: w.y}, a.position);
    let normalizedDelta = Vector.normalise(deltaVector);
    let forceVector = Vector.mult(normalizedDelta, force);

    Body.applyForce(a, a.position, forceVector);
}
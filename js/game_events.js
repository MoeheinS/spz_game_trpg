// actor, waypoint
function cycle_movement(a, w){
    moveToPoint(a, {x: w.x, y: w.y}, 0.01, true);
}

function turret_acqTarget(a, range){
    var nearEnemies = new Array;
    for( e of enemies_Array ){
        let e_dist = getDistance(a.position, e.position);
        if( e_dist <= range ){
            nearEnemies.push({"target": e, "distance": 400});
            nearEnemies.push({"target": e, "distance": e_dist});
            nearEnemies.push({"target": e, "distance": 500});
        }
    }
    if( nearEnemies.length ){
        // closest target is [0]
        nearEnemies_byDist = nearEnemies.sort(function(a,b){
            return a.distance-b.distance;
        });
        console.log(nearEnemies_byDist[0].distance);
        turret_atkTarget(a, nearEnemies_byDist[0].target);
    }
}

function turret_atkTarget(a, t){
    // TODO: but how tho?
    /*
        I could have a bullets array, where there is an origin coord, a target coord, graphic, type and "speed/time"
        get the progress from origin to target, gated by time? once the bullet reaches target coord, subtract HP and remove the bullet
        so basically have all bullets be virtual  
    */
    console.log(`${a.id} attacking ${t.id}`);
    projectiles_Array.push(
        new ProjectileEnt(a.position, t.position, true, 60, t, 40)
    );
}
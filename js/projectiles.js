// basic ents in 4 directions, might as well do the exceptions manually
class ProjectileEnt {
    constructor(
        startCoords, 
        goalCoords, 
        tracking, 
        lifetimeMax,
        target,
        damage,
        arcHeight
    ) {
        // startCoords and goalCoords are body.position values; object {x: 0, y: 0}
        this.origin = new Object;
        this.origin.x = startCoords.x;
        this.origin.y = startCoords.y;

        // origin and position start off the same, but the projectile moves between the origin and goal based on lifetime
        this.position = new Object;
        this.position.x = startCoords.x;
        this.position.y = startCoords.y;

        this.goal = new Object;
        if(tracking){
            // hard set the goal coordinates so it moves towards a point
            this.goal.x = goalCoords.x;
            this.goal.y = goalCoords.y;
        }else{
            // reference the goal coordinates so it homes in
            this.goal = goalCoords;
        }

        this.lifetimeMax = lifetimeMax;
        this.lifetime = 0;
        // just reference an entire Body
        this.target = target;
        this.damage = damage;
        this.arcHeight = (arcHeight ? arcHeight : 0);
    }
    advance() { // advance the projectile
        if( this.lifetime >= this.lifetimeMax ){
            // mostly STUB. apply pain? stop rendering this? remove this from something?
            // TODO: if there's an array, remove self from said array
            //allTheBullets.splice(allTheBullets.indexOf(this), 1);
            this.applyPain();
        }else{
            this.lifetime++;
            let progress = this.lifetime / this.lifetimeMax;

            this.position.x = ( this.origin.x - this.goal.x ) * progress;
            this.position.y = ( this.origin.y - this.goal.y ) * progress;
            // TODO: this might be worthwhile, but the ends are too big?
            //this.arcHeight = Math.sin( Math.PI * ( progress - 0.00000001 ) );
        }
    }
    applyPain() {
        //STUB
        console.log('ow!');
    }

}

// TODO: all of this is test placeholder
var boo = new ProjectileEnt({x: 0, y: 0}, test_allyGB2.position, true, 10, test_allyGB2, 40);

var allTheBullets = [];
allTheBullets.push(1);
allTheBullets.push(boo);
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
        if(!tracking){
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

        this.graphics = {
            renderMode: 'sheet_animation',
            sprite: './assets/origin.png',
            sprite_dim: {
                x: 16,
                y: 16
            },
            sheet: getSprites('projectile_spinner', 'idle')
        };
    }
    advance() { // advance the projectile
        if( this.lifetime >= this.lifetimeMax ){
            // mostly STUB. apply pain? stop rendering this? remove this from something?
            // TODO: if there's an array, remove self from said array
            projectiles_Array.splice(projectiles_Array.indexOf(this), 1);
            this.applyPain();
        }else{
            this.lifetime++;
            let progress = 1 - ( this.lifetime / this.lifetimeMax );
            // console.warn('goal');
            // console.table(this.goal);
            // console.warn('origin');
            // console.table(this.origin);

            let diff_x = Math.abs( this.origin.x - this.goal.x ) * progress;
            let diff_y = Math.abs( this.origin.y - this.goal.y ) * progress;

            this.position.x = ( this.goal.x > this.origin.x ? this.goal.x - diff_x : this.goal.x + diff_x );
            this.position.y = ( this.goal.y > this.origin.y ? this.goal.y - diff_y : this.goal.y + diff_y );
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
projectiles_Array.push(new ProjectileEnt(test_turret.position, test_allyGB2.position, true, 60, test_allyGB2, 40));
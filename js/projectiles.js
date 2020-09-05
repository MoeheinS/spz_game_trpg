// basic ents in 4 directions, might as well do the exceptions manually
class ProjectileEnt {
    constructor(
        startCoords, 
        goalCoords, 
        tracking, 
        lifetimeMax,
        target,
        damage,
        projectileArt,
        arcHeight,
        scatter
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
        this.arcHeight = ( arcHeight ? arcHeight : false );
        this.scatter = ( scatter ? scatter : false );

        this.graphics = {
            renderMode: 'sheet_animation',
            sprite: buildingsImg.src,
            sprite_dim: {
                x: 16,
                y: 16
            },
            sheet: getSprites(projectileArt, 'idle')
        };
    }
    advance() { // advance the projectile
        if( this.lifetime >= this.lifetimeMax ){
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
            var diff_y = Math.abs( this.origin.y - this.goal.y ) * progress;
            if( this.target.custom.moveType == 'air' ){
                let flipper = ( this.goal.y > this.origin.y ? 1 : -1 );
                diff_y = Math.abs( this.origin.y - this.goal.y ) * progress + flipper * ( UNIT_AIR_OFFSET - ( UNIT_AIR_OFFSET * progress ) );
            }

            // can't believe this actually works lol
            let arcHeight = ( this.arcHeight ? Math.sin( Math.PI * ( progress - 0.00000001 ) ) * PROJECTILE_ARC_OFFSET : 0 );

            this.position.x = ( this.goal.x > this.origin.x ? this.goal.x - diff_x : this.goal.x + diff_x );
            this.position.y = ( this.goal.y > this.origin.y ? this.goal.y - diff_y - arcHeight : this.goal.y + diff_y - arcHeight );
            
        }
    }
    applyPain() {
        // scatter ; { damage, targetType, range, affect }
        // TODO: if I ever need an ally unit to do this, add switch based on affect ? allies : enemies
        if( this.scatter ){
            for( e of units_Array ){
                let e_dist = getDistance(this.position, e.position);
                
                if( e_dist <= this.scatter.range * GRID_SIZE && e.custom.moveType == this.scatter.targetType ){
                    projectiles_Array.push(
                        new ProjectileEnt(this.position, e.position, true, 12, e, this.scatter.damage, 'particle_explosion')
                    );
                }
            }
            return;
        }

        this.target.custom.hp_current = this.target.custom.hp_current - this.damage;

        //console.warn( Composite.get(world, this.target.id, 'body') );

        if( this.target.custom.hp_current <= 0 && Composite.get(world, this.target.id, 'body') != null ){
            switch (this.target.label) {
                case 'ally':
                    ripperoni_unit(this.target);    
                    break;
                case 'building':
                    ripperoni_building(this.target);    
                    break;
                default:
                    break;
            }
            World.remove(world, this.target, true);
        }
    }
}

function draw_Projectile(i){
    ctx.save();

    let img = new Image();
    img.src = i.graphics.sprite;

    if( i.graphics.sheet ){

        let whichSprite = Math.floor( (i.lifetime % 10) / 10 * i.graphics.sheet.length );

        var sx = i.graphics.sheet[whichSprite].x;
        var sy = i.graphics.sheet[whichSprite].y;
        var sw = i.graphics.sprite_dim.x;
        var sh = i.graphics.sprite_dim.y;

        var dw = sw*2;
        var dh = sh*2;
        var dx = i.position.x - (dw/2);
        var dy = i.position.y - (dh/2);
        
        // source, source x, y, source width, height, destination x, y, width x, y
        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    ctx.restore();
}
// basic ents in 4 directions, might as well do the exceptions manually
class ParticleEnt {
    constructor(
        startCoords, 
        lifetimeMax,
        particleArt
    ) {
        // startCoords is body.position values; object {x: 0, y: 0}
        this.position = new Object;
        this.position.x = startCoords.x;
        this.position.y = startCoords.y;

        this.lifetimeMax = lifetimeMax;
        // with current setup, each lifetime is 1 frame of animation
        this.lifetime = 0;
        
        this.graphics = {
            renderMode: 'sheet_animation',
            sprite: buildingsImg.src,
            sprite_dim: {
                x: 16,
                y: 16
            },
            sheet: getSprites(particleArt, 'idle')
        };
    }
    advance() { // advance the particle; used to run every tick, now runs every 15th
        if( this.lifetime >= this.lifetimeMax && this.lifetimeMax != -1 ){
            particles_Array.splice(particles_Array.indexOf(this), 1);
        }else{
            //if( ticker % 15 == 0 ){
                this.graphics.sheet = cycleArray(this.graphics.sheet);
                if( this.lifetimeMax != -1 ){
                    this.lifetime++;
                }
            //}
        }
    }
}

function draw_Particle(i){
    ctx.save();

    let img = new Image();
    img.src = i.graphics.sprite;

    if( i.graphics.sheet ){

        //let whichSprite = Math.floor( (i.lifetime % 10) / 10 * i.graphics.sheet.length );
        let whichSprite = 0;

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

// TODO: all of this is test placeholder
//particles_Array.push(new ParticleEnt({x: (3.5*GRID_SIZE), y: 3.5*GRID_SIZE}, -1, 'flower_1'));

for( let hi = 0; hi < 40; hi++ ){
    for( let vi = 0; vi < 40; vi++ ){
        let randoo = Math.round(Math.random()*120);
        if( randoo == 2 ){
            particles_Array.push(new ParticleEnt({x: 0.5*GRID_SIZE+vi*GRID_SIZE, y: 0.5*GRID_SIZE+hi*GRID_SIZE}, -1, 'flower_1'));
        }else if( randoo == 18 ){
            particles_Array.push(new ParticleEnt({x: 0.5*GRID_SIZE+vi*GRID_SIZE, y: 0.5*GRID_SIZE+hi*GRID_SIZE}, -1, 'flower_2'));
        }
        
    }
}
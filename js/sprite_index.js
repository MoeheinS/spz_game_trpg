// basic ents in 4 directions, might as well do the exceptions manually
class SpriteEnt {
    constructor(name, start_x, start_y, mode, steps) {
        this.iname = name;

        switch (mode) {
            case '4dir':
                let directions = ['idle', 'right', 'up', 'left'];
                for (let [i, v] of directions.entries()) {
                    this[v] = [];
                    this[v][0] = {x: start_x+(i*32), y: start_y};
                    this[v][1] = {x: start_x+(i*32)+16, y: start_y};
                }
                break;
            case '1dir':
            default:
                this['idle'] = [];
                for (let i = 0; i < steps; i++) {
                    this['idle'][i] = {x: start_x+(i*16), y: start_y};
                }
                break;
        }
        
    }
}

spriteSheetCoords = [];

var spriteList = [
    //['warrior_human', 0, 0, '4dir'],
    ['ratty', 0, 0, '4dir'],
    ['sling', 0, 16, '4dir'],

    ['turret_basic', 80, 464, '1dir', 3],
    ['turret_rapid', 80, 464, '1dir', 3],

    ['wall_01', 16, 416, '1dir', 1],
    ['wall_02', 48, 416, '1dir', 1],
    ['wall_03', 80, 416, '1dir', 1],

    // obviously not but eh
    ['core', 16, 0, '1dir', 1],
    ['core1', 96, 0, '1dir', 1],
    ['core2', 176, 0, '1dir', 1],
    ['core3', 256, 0, '1dir', 1],
    //['core_evil', 352, 0, '1dir', 1],

    ['projectile_basic', 32, 480, '1dir', 1],
    ['projectile_spinner', 160, 512, '1dir', 4],
    ['projectile_rapid', 80, 496, '1dir', 2],

    ['projectile_unit_sling', 736, 448, '1dir', 1],
    ['projectile_unit_melee', 752, 448, '1dir', 1],
    
    ['tombstone', 256, 240, '1dir', 1],
    ['rubble', 256, 192, '1dir', 1]
];

for( unit of spriteList ){
    spriteSheetCoords.push(new SpriteEnt(unit[0], unit[1], unit[2], unit[3], unit[4]));
}

function getSprites(iname, key){
    for( sheet of spriteSheetCoords ){
        if( sheet.iname == iname ){
            let spriteCoords = [];
            for( o of sheet[key] ){
                spriteCoords.push({ x: o.x, y: o.y });
            }
            return spriteCoords;
        }
    }
}  
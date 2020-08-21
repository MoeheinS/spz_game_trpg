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
    ['warrior_human', 0, 0, '4dir'],
    ['ratty', 256, 80, '4dir'],
    ['sling', 128, 560, '4dir'],

    ['turret_basic', 80, 464, '1dir', 3],
    ['wall_01', 16, 416, '1dir', 1],
    ['wall_02', 48, 416, '1dir', 1],
    ['wall_03', 80, 416, '1dir', 1],

    // obviously not but eh
    ['core', 160, 544, '1dir', 2],

    ['projectile_spinner', 160, 512, '1dir', 4],
    
    ['tombstone', 256, 240, '1dir', 1]
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
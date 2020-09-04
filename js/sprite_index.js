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
            case '1dir_32w':
                this['idle'] = [];
                for (let i = 0; i < steps; i++) {
                    this['idle'][i] = {x: start_x+(i*32), y: start_y};
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
    //['core_e', 352, 16, '1dir', 1],
    ['core_e', 768, 176, '1dir', 1],
    ['core', 16, 0, '1dir', 1],
    ['core1', 96, 0, '1dir', 1],
    ['core2', 176, 0, '1dir', 1],
    ['core3', 256, 0, '1dir', 1],

    ['projectile_basic', 32, 480, '1dir', 1],
    ['projectile_spinner', 160, 512, '1dir', 4],
    ['projectile_rapid', 80, 496, '1dir', 2],

    ['projectile_unit_sling', 624, 432, '1dir', 1],
    ['projectile_unit_melee', 640, 432, '1dir', 1],
    
    ['tombstone', 192, 192, '1dir', 1],
    ['rubble_1', 224, 192, '1dir', 1],
    ['rubble_2', 224, 160, '1dir', 1],
    ['rubble_3', 256, 160, '1dir', 1],
    ['terrain_rock_s', 352, 192, '1dir', 1],
    ['terrain_rock_l', 384, 176, '1dir_32w', 1],
    ['terrain_tree_s', 432, 192, '1dir', 2],
    ['terrain_tree_l', 448, 224, '1dir_32w', 1],

    ['flower_1', 528, 464, '1dir', 4],
    ['flower_2', 528, 480, '1dir', 4],

    ['particle_atk_1', 160, 272, '1dir_32w', 4], // dagger
    ['particle_atk_2', 160, 368, '1dir_32w', 4], // sword
    ['particle_atk_3', 160, 320, '1dir_32w', 4], // greatsword
    ['particle_atk_4', 160, 336, '1dir_32w', 4], // saber
    ['particle_atk_5', 160, 288, '1dir_32w', 4], // axe
    ['particle_atk_6', 160, 304, '1dir_32w', 4], // spear
    ['particle_atk_7', 160, 352, '1dir_32w', 4], // flail
    ['particle_atk_8', 160, 256, '1dir_32w', 4], // staff
    ['particle_atk_9', 160, 384, '1dir_32w', 4], // bow
    ['particle_atk_10', 160, 400, '1dir_32w', 4], // spear STAB

    ['particle_explosion', 448, 464, '1dir', 4],
    ['particle_target', 640, 64, '1dir', 2],

    ['ui_airship', 672, 368, '1dir_32w', 2],
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
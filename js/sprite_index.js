// basic ents in 4 directions, might as well do the exceptions manually
class SpriteEnt {
    constructor(name, start_x, start_y) {
        this.iname = name;
        let directions = ['idle', 'right', 'up', 'left'];
        for (let [i, v] of directions.entries()) {
            this[v] = [];
            this[v][0] = {x: start_x+(i*32), y: start_y};
            this[v][1] = {x: start_x+(i*32)+16, y: start_y};
        }
    }
}

spriteSheetCoords = [];

var unitList = [
    ['warrior_human', 0, 0],
    ['turret_basic', 912, 208],
    ['ratty', 256, 80],

    ['projectile_spinner', 928, 96]
]

for( unit of unitList ){
    spriteSheetCoords.push(new SpriteEnt(unit[0], unit[1], unit[2]));
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
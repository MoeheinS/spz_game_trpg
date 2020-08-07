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

// origin.png
// var spriteSheetCoords = [
//     {
//       "iname": "warrior_human",
//       "idle": [
//         {x: 0, y: 0},
//         {x: 16, y: 0}
//       ],
//       "right": [
//         {x: 32, y: 0},
//         {x: 48, y: 0}
//       ],
//       "up": [
//         {x: 64, y: 0},
//         {x: 80, y: 0}
//       ],
//       "left": [
//         {x: 96, y: 0},
//         {x: 112, y: 0}
//       ]
//     },
//     {
//       "iname": "turret_basic",
//       "idle": [
//         {x: 912, y: 208},
//         {x: 928, y: 208}
//       ],
//       "right": [
//         {x: 912, y: 208},
//         {x: 928, y: 208}
//       ],
//       "up": [
//         {x: 912, y: 208},
//         {x: 928, y: 208}
//       ],
//       "left": [
//         {x: 912, y: 208},
//         {x: 928, y: 208}
//       ]
//     }
//   ];
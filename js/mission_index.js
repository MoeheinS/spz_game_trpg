missionList = [];

var missionList = [
  {
    id: "Turret Playground",
    core: {
      level: 0,
      position: new Coordinate( 25.5*GRID_SIZE, 23.5*GRID_SIZE )
    },
    ents: [
      {
        name: "Turret",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 20.5*GRID_SIZE )
      },
      {
        name: "Tower Turret",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 22.5*GRID_SIZE )
      },
      {
        name: "Mermage",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 24.5*GRID_SIZE )
      },
      {
        name: "Curse Box",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 26.5*GRID_SIZE )
      },
      {
        name: "Lobber Golem",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 28.5*GRID_SIZE )
      },
      {
        name: "Hidden Turret",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 30.5*GRID_SIZE )
      },
      {
        name: "Rapid Turret",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 32.5*GRID_SIZE )
      },
      {
        name: "Watchdragon (S)",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 34.5*GRID_SIZE )
      },
      {
        name: "Watchdragon (E)",
        level: 0,
        position: new Coordinate( 9.5*GRID_SIZE, 34.5*GRID_SIZE )
      },
      {
        name: "Watchdragon (N)",
        level: 0,
        position: new Coordinate( 11.5*GRID_SIZE, 34.5*GRID_SIZE )
      },
      {
        name: "Watchdragon (W)",
        level: 0,
        position: new Coordinate( 13.5*GRID_SIZE, 34.5*GRID_SIZE )
      },
      {
        name: "Air Elemental",
        level: 0,
        position: new Coordinate( 7.5*GRID_SIZE, 36.5*GRID_SIZE )
      },

      {
        name: "Air Elemental",
        level: 0,
        position: new Coordinate( 18.5*GRID_SIZE, 21.5*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 17*GRID_SIZE, 20*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 18*GRID_SIZE, 20*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 19*GRID_SIZE, 20*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 20*GRID_SIZE, 20*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 21*GRID_SIZE, 20*GRID_SIZE )
      },

      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 17*GRID_SIZE, 21*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 17*GRID_SIZE, 22*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 17*GRID_SIZE, 23*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 21*GRID_SIZE, 21*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 21*GRID_SIZE, 22*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 0,
        position: new Coordinate( 21*GRID_SIZE, 23*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 1,
        position: new Coordinate( 17*GRID_SIZE, 24*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 1,
        position: new Coordinate( 18*GRID_SIZE, 24*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 1,
        position: new Coordinate( 19*GRID_SIZE, 24*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 1,
        position: new Coordinate( 20*GRID_SIZE, 24*GRID_SIZE )
      },
      {
        name: "Wall",
        level: 1,
        position: new Coordinate( 21*GRID_SIZE, 24*GRID_SIZE )
      }
    ]
  },
  {
    id: "Just a Core and Turret",// for testing the game loop
    core: {
      level: 0,
      position: new Coordinate( 17.5*GRID_SIZE, 17.5*GRID_SIZE ) // 34 - 6 
    },
    ents: [
      {
        name: "Turret",
        level: 0,
        position: new Coordinate( 12.5*GRID_SIZE, 12.5*GRID_SIZE )
      }
    ]
  },
  {
    id: 'Simple approach',
    core: {
      level: 0,
      position: new Coordinate( 13.5*GRID_SIZE, 13.5*GRID_SIZE )
    },
    ents: [
      {
        name: "Turret",
        level: 0,
        position: new Coordinate( 12.5*GRID_SIZE, 12.5*GRID_SIZE )
      },
      {
        name: "Turret",
        level: 0,
        position: new Coordinate( 18.5*GRID_SIZE, 12.5*GRID_SIZE )
      },
      {
        name: "Turret",
        level: 0,
        position: new Coordinate( 18.5*GRID_SIZE, 17.5*GRID_SIZE )
      },
      {
        name: "Turret",
        level: 0,
        position: new Coordinate( 12.5*GRID_SIZE, 17.5*GRID_SIZE )
      }
    ]
  }
];

// missions created with export_level() are JSON
// TODO: I can put in a fetch function here, for grabbing missions off the internet, someday
var missionList_JSON = [
  {
    "core": {
      "level": "0",
      "position": "new Coordinate( 13.5*GRID_SIZE, 13.5*GRID_SIZE )"
    },
    "ents": [
      {
        "name": "Turret",
        "level": "0",
        "position": "new Coordinate( 12.5*GRID_SIZE, 12.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "0",
        "position": "new Coordinate( 18.5*GRID_SIZE, 12.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "0",
        "position": "new Coordinate( 18.5*GRID_SIZE, 17.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "0",
        "position": "new Coordinate( 12.5*GRID_SIZE, 17.5*GRID_SIZE )"
      }
    ],
    "id": "Test JSON"
  },
  {
    "core": {
      "level": "4",
      "position": "new Coordinate( 14.5*GRID_SIZE, 19.5*GRID_SIZE )"
    },
    "ents": [
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 16*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 17*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 18*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 15*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 18*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 15*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "5",
        "position": "new Coordinate( 16.5*GRID_SIZE, 13.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 22*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 21*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 20*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 19*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 18*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 15*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 14*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 13*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "5",
        "position": "new Coordinate( 12*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 12*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 13*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 14*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 15*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 18*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 19*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 20*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 21*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 12*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 15*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 16*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 17*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 18*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 21*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "4",
        "position": "new Coordinate( 19.5*GRID_SIZE, 17.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "4",
        "position": "new Coordinate( 13.5*GRID_SIZE, 17.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 12*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 21*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "4",
        "position": "new Coordinate( 13.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "4",
        "position": "new Coordinate( 19.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 12*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 21*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 12*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 13*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 20*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 21*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 13*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 20*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 13*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 20*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 22*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 23*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 13*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 20*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 22*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 13*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 14*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 15*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 18*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 19*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 20*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 22*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 15*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "4",
        "position": "new Coordinate( 18*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 22*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 15*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 20*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 21*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 22*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 15*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 16*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 17*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 18*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 19*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "3",
        "position": "new Coordinate( 20*GRID_SIZE, 27*GRID_SIZE )"
      }
    ],
    "id": "Pathfinding"
  },
  {
    "core": {
      "level": "0",
      "position": "new Coordinate( 17.5*GRID_SIZE, 18.5*GRID_SIZE )"
    },
    "ents": [
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 4*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "0",
        "position": "new Coordinate( 19*GRID_SIZE, 5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "rock_s",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 7*GRID_SIZE )"
      },
      {
        "name": "Guild Hall",
        "level": "0",
        "position": "new Coordinate( 18*GRID_SIZE, 8*GRID_SIZE )"
      },
      {
        "name": "statue_1",
        "level": "0",
        "position": "new Coordinate( 13*GRID_SIZE, 7*GRID_SIZE )"
      },
      {
        "name": "statue_1",
        "level": "0",
        "position": "new Coordinate( 26*GRID_SIZE, 7*GRID_SIZE )"
      },
      {
        "name": "rock_s",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 8*GRID_SIZE )"
      },
      {
        "name": "rock_s",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 9*GRID_SIZE )"
      },
      {
        "name": "rock_s",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "0",
        "position": "new Coordinate( 25*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "0",
        "position": "new Coordinate( 13*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "0",
        "position": "new Coordinate( 10*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 17*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 18*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 19*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 20*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 22*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Anima Research Lab",
        "level": "0",
        "position": "new Coordinate( 19*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "statue_3",
        "level": "0",
        "position": "new Coordinate( 10*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "0",
        "position": "new Coordinate( 24.5*GRID_SIZE, 15.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "0",
        "position": "new Coordinate( 14.5*GRID_SIZE, 15.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "0",
        "position": "new Coordinate( 12.5*GRID_SIZE, 15.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "0",
        "position": "new Coordinate( 26.5*GRID_SIZE, 15.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "0",
        "position": "new Coordinate( 28.5*GRID_SIZE, 15.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "statue_2",
        "level": "0",
        "position": "new Coordinate( 31*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 24*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 25*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 26*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 27*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "0",
        "position": "new Coordinate( 12.5*GRID_SIZE, 17.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "0",
        "position": "new Coordinate( 24.5*GRID_SIZE, 19.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Friend Hall",
        "level": "0",
        "position": "new Coordinate( 12*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 24*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 25*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 26*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 27*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 28*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "0",
        "position": "new Coordinate( 14.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "0",
        "position": "new Coordinate( 24.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "0",
        "position": "new Coordinate( 26.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "0",
        "position": "new Coordinate( 30.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "0",
        "position": "new Coordinate( 10.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "0",
        "position": "new Coordinate( 6.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Crafting Station",
        "level": "0",
        "position": "new Coordinate( 18*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 16*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 17*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 19*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 18*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 20*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 21*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 22*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "0",
        "position": "new Coordinate( 23*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Rental Facility",
        "level": "0",
        "position": "new Coordinate( 18*GRID_SIZE, 30*GRID_SIZE )"
      }
    ],
    "id": "Training Forest 1"
  },
  {
    "core": {
      "level": "1",
      "position": "new Coordinate( 17.5*GRID_SIZE, 17.5*GRID_SIZE )"
    },
    "ents": [
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 28*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 29*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 30*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 11*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 12*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 13*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 14*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 25*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 26*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 19*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 20*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Curse Box",
        "level": "1",
        "position": "new Coordinate( 11.5*GRID_SIZE, 13.5*GRID_SIZE )"
      },
      {
        "name": "statue_1",
        "level": "1",
        "position": "new Coordinate( 22*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "statue_2",
        "level": "1",
        "position": "new Coordinate( 17*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "1",
        "position": "new Coordinate( 25*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "1",
        "position": "new Coordinate( 13*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Friend Hall",
        "level": "1",
        "position": "new Coordinate( 28*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 6*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 17*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 18*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 19*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 20*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 21*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 22*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 6*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "1",
        "position": "new Coordinate( 11.5*GRID_SIZE, 17.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "1",
        "position": "new Coordinate( 27.5*GRID_SIZE, 17.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "statue_1",
        "level": "1",
        "position": "new Coordinate( 14*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "statue_2",
        "level": "1",
        "position": "new Coordinate( 25*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 33*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 6*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Guild Hall",
        "level": "1",
        "position": "new Coordinate( 8*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 33*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 6*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Rental Facility",
        "level": "1",
        "position": "new Coordinate( 29*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 33*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 6*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "1",
        "position": "new Coordinate( 25*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "statue_3",
        "level": "1",
        "position": "new Coordinate( 14*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 33*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 10*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 9*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 8*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 7*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 6*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "1",
        "position": "new Coordinate( 27.5*GRID_SIZE, 20.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "1",
        "position": "new Coordinate( 11.5*GRID_SIZE, 20.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 29*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 30*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 31*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 32*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 33*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 10*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 17*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 18*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 19*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 20*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 21*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 22*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 28*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 29*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 11*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 10*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "1",
        "position": "new Coordinate( 25*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "1",
        "position": "new Coordinate( 13*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 28*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 11*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "1",
        "position": "new Coordinate( 17.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "1",
        "position": "new Coordinate( 20.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 28*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 11*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "1",
        "position": "new Coordinate( 29.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "1",
        "position": "new Coordinate( 8.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 12*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 13*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 14*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 15*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 17*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 18*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 19*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 20*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 21*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 22*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 23*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 24*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 25*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 26*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 27*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 28*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "1",
        "position": "new Coordinate( 11*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "1",
        "position": "new Coordinate( 26.5*GRID_SIZE, 26.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "1",
        "position": "new Coordinate( 10.5*GRID_SIZE, 26.5*GRID_SIZE )"
      },
      {
        "name": "Anima Research Lab",
        "level": "1",
        "position": "new Coordinate( 16*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Crafting Station",
        "level": "1",
        "position": "new Coordinate( 20*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "1",
        "position": "new Coordinate( 24.5*GRID_SIZE, 28.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "1",
        "position": "new Coordinate( 13.5*GRID_SIZE, 28.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "1",
        "position": "new Coordinate( 20.5*GRID_SIZE, 29.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "1",
        "position": "new Coordinate( 22.5*GRID_SIZE, 29.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "1",
        "position": "new Coordinate( 17.5*GRID_SIZE, 29.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "1",
        "position": "new Coordinate( 15.5*GRID_SIZE, 29.5*GRID_SIZE )"
      }
    ],
    "id": "Training Forest 2"
  },
  {
    "core": {
      "level": "2",
      "position": "new Coordinate( 17.5*GRID_SIZE, 17.5*GRID_SIZE )"
    },
    "ents": [
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 11*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 8*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "2",
        "position": "new Coordinate( 18*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "statue_1",
        "level": "2",
        "position": "new Coordinate( 21*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 28*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 31*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 22*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 21*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 20*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 19*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 18*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 17*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 14*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 15*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 24*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 25*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "2",
        "position": "new Coordinate( 24.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "2",
        "position": "new Coordinate( 14.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Guild Hall",
        "level": "2",
        "position": "new Coordinate( 9*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Mermage",
        "level": "2",
        "position": "new Coordinate( 19.5*GRID_SIZE, 15.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 14*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 15*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 25*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 24*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Friend Hall",
        "level": "2",
        "position": "new Coordinate( 28*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "statue_2",
        "level": "2",
        "position": "new Coordinate( 11*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "2",
        "position": "new Coordinate( 28*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Anima Research Lab",
        "level": "2",
        "position": "new Coordinate( 7*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "2",
        "position": "new Coordinate( 23.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 19*GRID_SIZE )"
      },
      {
        "name": "Crafting Station",
        "level": "2",
        "position": "new Coordinate( 31*GRID_SIZE, 18*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "2",
        "position": "new Coordinate( 14.5*GRID_SIZE, 19.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "statue_1",
        "level": "2",
        "position": "new Coordinate( 28*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "2",
        "position": "new Coordinate( 10*GRID_SIZE, 20*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 15*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 14*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 24*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 25*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Curse Box",
        "level": "2",
        "position": "new Coordinate( 19.5*GRID_SIZE, 22.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "2",
        "position": "new Coordinate( 28.5*GRID_SIZE, 22.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "2",
        "position": "new Coordinate( 30.5*GRID_SIZE, 22.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "2",
        "position": "new Coordinate( 10.5*GRID_SIZE, 22.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "2",
        "position": "new Coordinate( 8.5*GRID_SIZE, 22.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "2",
        "position": "new Coordinate( 14.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "2",
        "position": "new Coordinate( 24.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "2",
        "position": "new Coordinate( 28.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Gold Harvester",
        "level": "2",
        "position": "new Coordinate( 30.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "2",
        "position": "new Coordinate( 10.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Mana Harvester",
        "level": "2",
        "position": "new Coordinate( 8.5*GRID_SIZE, 24.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 16*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 17*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 18*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 19*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 20*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 21*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 22*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 13*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 14*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 15*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 24*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 25*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "2",
        "position": "new Coordinate( 26*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "statue_2",
        "level": "2",
        "position": "new Coordinate( 23*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "statue_3",
        "level": "2",
        "position": "new Coordinate( 18*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "2",
        "position": "new Coordinate( 20*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "2",
        "position": "new Coordinate( 15*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "statue_3",
        "level": "2",
        "position": "new Coordinate( 19*GRID_SIZE, 29*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "2",
        "position": "new Coordinate( 20.5*GRID_SIZE, 29.5*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "2",
        "position": "new Coordinate( 24.5*GRID_SIZE, 29.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "2",
        "position": "new Coordinate( 15.5*GRID_SIZE, 29.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "2",
        "position": "new Coordinate( 11.5*GRID_SIZE, 29.5*GRID_SIZE )"
      }
    ],
    "id": "Training Forest 3"
  },
  {
    "core": {
      "level": "7",
      "position": "new Coordinate( 17.5*GRID_SIZE, 17.5*GRID_SIZE )"
    },
    "ents": [
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 9*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 9*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 9*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 9*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "7",
        "position": "new Coordinate( 19*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 10*GRID_SIZE )"
      },
      {
        "name": "Curse Box",
        "level": "7",
        "position": "new Coordinate( 14.5*GRID_SIZE, 10.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 11*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 12*GRID_SIZE )"
      },
      {
        "name": "Mermage",
        "level": "7",
        "position": "new Coordinate( 19.5*GRID_SIZE, 12.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "7",
        "position": "new Coordinate( 24.5*GRID_SIZE, 12.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "7",
        "position": "new Coordinate( 14.5*GRID_SIZE, 12.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 28*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 29*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 30*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 31*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 32*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 33*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 11*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 6*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 7*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 8*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 9*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 10*GRID_SIZE, 13*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 14*GRID_SIZE )"
      },
      {
        "name": "Watchdragon (S)",
        "level": "7",
        "position": "new Coordinate( 24.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Watchdragon (E)",
        "level": "7",
        "position": "new Coordinate( 13.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "7",
        "position": "new Coordinate( 27.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "7",
        "position": "new Coordinate( 11.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "7",
        "position": "new Coordinate( 30.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Air Elemental",
        "level": "7",
        "position": "new Coordinate( 18.5*GRID_SIZE, 14.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 23*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 16*GRID_SIZE, 16*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 33*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 32*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 31*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 30*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 29*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 28*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 26*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 25*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 24*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 23*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 16*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 15*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 14*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 13*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 6*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 7*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 8*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 9*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 10*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 11*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 17*GRID_SIZE )"
      },
      {
        "name": "Air Elemental",
        "level": "7",
        "position": "new Coordinate( 14.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Air Elemental",
        "level": "7",
        "position": "new Coordinate( 23.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "7",
        "position": "new Coordinate( 10.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Gold Storage",
        "level": "7",
        "position": "new Coordinate( 6.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "7",
        "position": "new Coordinate( 27.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Mana Storage",
        "level": "7",
        "position": "new Coordinate( 31.5*GRID_SIZE, 18.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 23*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 24*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 25*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 26*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 28*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 29*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 30*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 31*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 32*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 33*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 6*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 7*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 8*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 9*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 10*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 11*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 13*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 14*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 15*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 16*GRID_SIZE, 21*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 23*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 16*GRID_SIZE, 22*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 23*GRID_SIZE )"
      },
      {
        "name": "Air Elemental",
        "level": "7",
        "position": "new Coordinate( 19.5*GRID_SIZE, 22.5*GRID_SIZE )"
      },
      {
        "name": "Watchdragon (W)",
        "level": "7",
        "position": "new Coordinate( 24.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Watchdragon (N)",
        "level": "7",
        "position": "new Coordinate( 13.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "7",
        "position": "new Coordinate( 11.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "7",
        "position": "new Coordinate( 27.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Lobber Golem",
        "level": "7",
        "position": "new Coordinate( 7.5*GRID_SIZE, 23.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 24*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 28*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 29*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 30*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 31*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 32*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 33*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 6*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 7*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 8*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 9*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 10*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 11*GRID_SIZE, 25*GRID_SIZE )"
      },
      {
        "name": "Mermage",
        "level": "7",
        "position": "new Coordinate( 19.5*GRID_SIZE, 25.5*GRID_SIZE )"
      },
      {
        "name": "Turret",
        "level": "7",
        "position": "new Coordinate( 14.5*GRID_SIZE, 25.5*GRID_SIZE )"
      },
      {
        "name": "Tower Turret",
        "level": "7",
        "position": "new Coordinate( 24.5*GRID_SIZE, 25.5*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 26*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 27*GRID_SIZE )"
      },
      {
        "name": "Curse Box",
        "level": "7",
        "position": "new Coordinate( 24.5*GRID_SIZE, 27.5*GRID_SIZE )"
      },
      {
        "name": "Builder Hut",
        "level": "7",
        "position": "new Coordinate( 19*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 28*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 17*GRID_SIZE, 29*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 22*GRID_SIZE, 29*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 27*GRID_SIZE, 29*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 12*GRID_SIZE, 29*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 9*GRID_SIZE, 15*GRID_SIZE )"
      },
      {
        "name": "Wall",
        "level": "7",
        "position": "new Coordinate( 30*GRID_SIZE, 23*GRID_SIZE )"
      }
    ],
    "id": "Exploring the undeveloped highlands"
  }
];
// undo the hard storage JSON imposes
if( missionList_JSON.length ){
  for( json_mission of missionList_JSON ){
    var newMission = json_mission;
    newMission.core.position = eval(newMission.core.position);
    //newMission.core.level = parseInt(newMission.core.level);
    for( ent of json_mission.ents ){
      ent.position = eval(ent.position);
      //ent.level = parseInt(ent.level);
    }
    missionList.push(newMission);
  }
}
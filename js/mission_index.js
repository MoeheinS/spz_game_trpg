missionList = [];

var missionList = [
  {
    id: "turret_test",
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
    id: "center_core",// for testing the game loop
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
    id: 1,
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
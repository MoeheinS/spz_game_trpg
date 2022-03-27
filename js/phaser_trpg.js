const fpsMeter = document.getElementById('fps');
const deltaMeter = document.getElementById('delta');
var group_allies;
var group_foes;
var cursor;
var collider;

unitsImg = new Image();
unitsImg.src = './assets/mouse.png';

class Example extends Phaser.Scene {
  constructor(customData) {
    super('Example');
    this.customData = customData;
  }

  preload () {
    //this.load.setBaseURL('https://spuznoah.000webhostapp.com/');
    //this.load.image('mouse', 'mouse.png');

    this.load.image('mouse', './assets/mouse.png');
    this.load.image('cursor', 'https://labs.phaser.io/assets/sprites/drawcursor.png');

    this.load.spritesheet('units', './assets/units.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('buildings', './assets/buildings.png', { frameWidth: 16, frameHeight: 16 });

    this.load.image('tiles', "./assets/buildings.png");
    this.load.tilemapTiledJSON('map', "./assets/test_map.json");
  }

  create () {

    var scene = this;
    var input = this.input;

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("battlechamps2", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const buildingLayer = map.createLayer("buildings", tileset, 0, 0);
    const aboveLayer = map.createLayer("buildings_over", tileset, 0, 0);

    aboveLayer.setDepth(1000);

    buildingLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    buildingLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
    
    // OBject layer to spawn in objects (ie towers?)
    // const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    // player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front");

    this.cameras.main.setBounds( 0, 0, map.widthInPixels, map.heightInPixels );

    cursor = scene.physics.add.image(0, 0, 'cursor').setVisible(false);

    // this.add.image(400, 300, 'sky');

    // var particles = this.add.particles('red');
    // var emitter = particles.createEmitter({
    //     speed: 100,
    //     scale: { start: 1, end: 0 },
    //     blendMode: 'ADD'
    // });

    // var logo = scene.physics.add.image(400, 100, 'logo');
    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    // emitter.startFollow(logo);

    scene.data.set('level', 5);
    scene.data.set('score', 2000);

    var text = scene.add.text(10, 10, '', { font: '14px Courier', fill: '#00ff00' });
    text.setText([
        scene.customData,
        'Seed: ' + game.config.seed, 
        'Level: ' + scene.data.get('level'),
        'Score: ' + scene.data.get('score')
    ]);

    // scene.add
    // .text(16, 16, "Arrow keys to scroll", {
    //   font: "18px monospace",
    //   fill: "#ffffff",
    //   padding: { x: 20, y: 10 },
    //   backgroundColor: "#000000"
    // })
    // .setScrollFactor(0);

    group_allies = scene.add.group();
    group_foes = scene.add.group();
    this.physics.add.collider(group_allies, buildingLayer);
    this.physics.add.collider(group_allies, group_foes);
    scene.physics.world.addCollider(group_allies, group_allies);

    new Tower(scene, 8*16, 8*16, group_foes);

    input.on('pointerdown', function(pointer){
      var touchX = pointer.worldX;
      var touchY = pointer.worldY; //worldX worldY instead of x y if you do zooming
      console.log(touchX, touchY);

      if (pointer.rightButtonDown()){

        cursor.setVisible(true).setPosition(pointer.worldX, pointer.worldY);
        collider = scene.physics.add.overlap(group_allies, cursor, function (mouseAtDestination){
          mouseAtDestination.body.stop();
          // scene.physics.world.removeCollider(collider);
          // cursor.setVisible(false);
        }, null, this); //this = scene

        // group_allies.getChildren().forEach(function(mic){
        //   scene.physics.moveToObject(mic, {x: pointer.worldX, y: pointer.worldY}, 70+(100*Math.random()))
        // });

      }else{

        new Mouse(scene, pointer.worldX, pointer.worldY, group_allies);
        console.log(group_allies);
        // group_allies.getChildren().forEach(function(mic){
        //   console.log(mic);
        // });

      }
    });

    input.keyboard
    .on('keydown-P', function() {
      game.renderer.snapshot(function (image) {
        image.style.width = '160px';
        image.style.height = '120px';
        image.style.paddingLeft = '2px';
        console.log('snap!');
        document.body.appendChild(image);
      });
    })
    .on('keydown-R', () => {
      this.cameras.main.zoom = 1;
    })
    .on('keydown-S', () => {
      group_allies.getChildren().forEach(function(mic){
        mic.body.stop();
      });
      this.physics.world.removeCollider(collider);
      cursor.setVisible(false);
    });

    // /* ZOOMING, PANNING */
    this.input.on("wheel",  (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      if (deltaY > 0) {
          var newZoom = this.cameras.main.zoom -.1;
          if (newZoom > 1) {
              this.cameras.main.zoom = newZoom;
          }
      }
      if (deltaY < 0) {
          var newZoom = this.cameras.main.zoom +.1;
          if (newZoom < 3) {
              this.cameras.main.zoom = newZoom;
          }
      }
    });

    this.input.on('pointermove', (pointer) => {
        if (!pointer.isDown) return;
        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });

    // var walls = this.physics.add.group({ immovable: true });
    // for (var i = 0; i < 8; i++){
    //   // rando coords
    //   // var p = Phaser.Geom.Rectangle.RandomOutside(outer, inner);
    //   var p = { x: 100, y: 100 };
    //   var w = walls.create(p.x, p.y, 'wall');

    //   this.physics.add.existing(w);

    //   w.body.setImmovable();
    // }

  }

  update() {
    let loop = this.sys.game.loop;

    fpsMeter.value = loop.actualFps;
    deltaMeter.value = loop.delta;

    if(game.getFrame() % 60 == 0){
      console.warn('sec!');
      // primitive brute force pathfinding
      if( cursor.visible ){
        group_allies.getChildren().forEach(function(mic){
          game.scene.scenes[0].physics.moveToObject(mic, cursor, 140)
        });
      }
    }
        
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'container__Phaser',
  width: 40*16, //800,
  height: 40*16, //600,
  seed: [ (Date.now() * Math.random()).toString() ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  render: {
    // antialias: false,
    pixelArt: true
  },
  // title: '',
  // url: 'https://phaser.io',
  // version: '',
  disableContextMenu: true,

  // input: {
  //   keyboard: {
  //       target: window
  //   },
  //   mouse: {
  //       target: null,
  //       capture: true
  //   },
  //   activePointers: 1,
  //   touch: {
  //       target: null,
  //       capture: true
  //   },
  //   smoothFactor: 0,
  //   gamepad: false,
  //   windowEvents: true,
  // },

  scene: [ new Example('customData example') ]
};

const game = new Phaser.Game(config);
  
  /*
  
  const animConfig = {
      key: 'walk',
      frames: 'walker',
      frameRate: 60,
      repeat: -1
  };
  this.anims.create(animConfig);
  
  https://labs.phaser.io/assets/animations/walker.json
  
  const sprite = this.add.sprite(400, 484, 'walker', 'frame_0000');
  sprite.play('walk');
  
  https://phaser.io/examples/v3/view/tweens/checkerboard-3
  
  https://phaser.io/examples/v3/view/utils/rbush/rbush-1
  
  ----
  
  var bullet = this.add.image(-10, -10, 'bullet');
  
  var ship = this.add.image(40, 40, 'ship').setInteractive();
  
  var tween;
  
  ship.on('pointerdown', function ()
  {
      if (tween)
      {
          tween.stop();
      }
  
      bullet.setPosition(40, 40);
  
      tween = this.tweens.add({
          targets: bullet,
          x: 200
      });
  
  }, this);
  
  ----
  
  create ()
      {
          //  All Game Objects can emit and receive events
          const plush1 = this.add.image(400, 300, 'plush');
  
          //  If the plush1 object emits the turnRed event, it will change itself to tint red
          plush1.on('turnRed', this.handler);
  
          //  Emit the event and pass over a reference to itself
          plush1.emit('turnRed', plush1);
      }
  
      handler (gameObject)
      {
          gameObject.setTint(0xff0000);
      }
  
  https://phaser.io/examples/v3/view/depth-sorting/isometric-map
      animation stuff
  
  https://phaser.io/examples/v3/view/components/data/set-data-event
  
  https://github.com/samme/phaser3-faq/wiki#why-dont-my-assets-load
  
  https://blog.ourcade.co/posts/2020/phaser3-how-to-communicate-between-scenes/
  
  https://phaser.io/examples/v3/view/physics/arcade/closest-furthest
      calc closest furthest on unit creation or death of target
  
  var d = {
    a: Math.floor(Math.random() * 100),
    b: Math.floor(Math.random() * 100)
  };
  console.log(d);
  localStorage.setItem('key', JSON.stringify(d));
  var value = JSON.parse(localStorage.getItem('key'));
  console.log(value);
  
  https://stackoverflow.com/questions/56289506/phaser-3-how-to-create-smooth-zooming-effect

  https://rexrainbow.github.io/phaser3-rex-notes/docs/site/awaytime/
    WE CLASH OF CLANS NOW BB
  
  https://rexrainbow.github.io/phaser3-rex-notes/docs/site/plugin-list/


  this.input.keyboard.once(‘keydown’, (event) => {
    theme.stop();
    this.sound.add(‘select’).play();
    this.scene.start(‘VictoryLap’);
  });


  game.scene.add(‘GameScene’, GameScene);
  game.scene.add(‘VictoryLap’, VictoryLap);

  */
  
  
  
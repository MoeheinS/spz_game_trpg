// const eventsCenter = new Phaser.Events.EventEmitter();

// class Mouse extends Phaser.GameObjects.Sprite {
  class Mouse extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, group) {
      super(scene, x, y, 'mouse');
  
      this.setTexture('mouse');
      // move texture info, animation stuff etc to params
      // perhaps Ally class and Enemy class
      this.setPosition(x, y);
  
      scene.add.existing(this);
      group.add(scene.physics.add.existing(this));
    }
  
    // update () {
    //   super();
    //   // do special mouse things
    // }
  }

  const fpsMeter = document.getElementById('fps');
  const deltaMeter = document.getElementById('delta');
  
function preload () {
  this.load.setBaseURL('https://spuznoah.000webhostapp.com/');

  this.load.image('mouse', 'mouse.png');
  this.load.image('cursor', 'https://labs.phaser.io/assets/sprites/drawcursor.png');
}

function create () {

  var cursor = this.physics.add.image(0, 0, 'cursor').setVisible(false);

  // this.add.image(400, 300, 'sky');

  // var particles = this.add.particles('red');

  // var emitter = particles.createEmitter({
  //     speed: 100,
  //     scale: { start: 1, end: 0 },
  //     blendMode: 'ADD'
  // });

  

  var logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  // emitter.startFollow(logo);

  this.data.set('level', 5);
  this.data.set('score', 2000);

  var text = this.add.text(10, 10, '', { font: '14px Courier', fill: '#00ff00' });

  text.setText([
      this.customData,
      'Seed: ' + game.config.seed, 
      'Level: ' + this.data.get('level'),
      'Score: ' + this.data.get('score')
  ]);

  var group_allies = this.add.group();
  
  new Mouse(this, 264, 250, group_allies);
  var maus = new Mouse(this, 700, 400, group_allies);
  // this.scene.physics.world.addCollider(group_allies, group_allies);

  this.input.on('pointerdown', function(pointer){
    var touchX = pointer.x;
    var touchY = pointer.y;
    console.log(touchX, touchY);

    if (pointer.rightButtonDown()){
      cursor.setVisible(true).setPosition(pointer.x, pointer.y);
      this.scene.physics.moveToObject(maus, pointer, 140);
      var collider = this.scene.physics.add.overlap(group_allies, cursor, function (mouseAtDestination){
        mouseAtDestination.body.stop();
        group_allies.getChildren().forEach(function(mic){
          mic.body.stop();
        });
        this.scene.physics.world.removeCollider(collider);
        cursor.setVisible(false);
      }, null, this);
      Phaser.Utils.Array.Each(
        group_allies.getChildren(),
        this.scene.physics.moveToObject,
        this.scene.physics,
        cursor, 
        120
      );
    }else{
      new Mouse(this.scene, pointer.x, pointer.y, group_allies); // ffs... this.scene instead of just this.
      console.log(group_allies);
      group_allies.getChildren().forEach(function(mic){
        console.log(mic);
      });
    }
  });

  this.input.keyboard
  .on('keydown-S', function() {
    game.renderer.snapshot(function (image) {
      image.style.width = '160px';
      image.style.height = '120px';
      image.style.paddingLeft = '2px';
      console.log('snap!');
      document.body.appendChild(image);
    });
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

function update() {
  let loop = this.sys.game.loop;

  fpsMeter.value = loop.actualFps;
  deltaMeter.value = loop.delta;

  // console.log(game.getFrame() % 60);
  if(game.getFrame() % 60 == 0){
    console.warn('sec!');
  }

  // this namespace bullshit is pissing me off, ditch Class for scene
  // this.group_allies.sort('y', Phaser.Group.SORT_ASCENDING);
  // game.scene.scenes[0].group_allies.sort('y', Phaser.Group.SORT_ASCENDING);
  // this.scene.group_allies.sort('y', Phaser.Group.SORT_ASCENDING);
  
  // var then = performance.now();
  // while ((performance.now() - then) < 0) {}
}
  
  
  const config = {
    type: Phaser.AUTO,
    parent: 'container__Phaser',
    width: 800,
    height: 600,
    seed: [ (Date.now() * Math.random()).toString() ],
    physics: {
        default: 'arcade',
        arcade: {
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
  
    scene: {
      create: create,
      preload: preload,
      update: update
    }
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
  
  */
  
  
  
class Mouse extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, group) {
    super(scene, x, y);
    // this.setTexture('mouse');
    // move texture info, animation stuff etc to params
    // perhaps Ally class and Enemy class
    this.setPosition(x, y);

    scene.add.existing(this);
    
    this.anims.create({
      key: 'ratty_s',
      frames: this.anims.generateFrameNumbers('units', { frames: [ 0, 1 ] }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'ratty_e',
      frames: this.anims.generateFrameNumbers('units', { frames: [ 2, 3 ] }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'ratty_n',
      frames: this.anims.generateFrameNumbers('units', { frames: [ 4, 5 ] }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'ratty_w',
      frames: this.anims.generateFrameNumbers('units', { frames: [ 6, 7 ] }),
      frameRate: 4,
      repeat: -1
    });
    this.play("ratty_s");

    group.add(
      scene.physics.add.existing(this)
      .setSize(16, 8)
      .setOffset(0,8)
      .setCollideWorldBounds( true, 0.01, 0.01)
    ); // lower body size to allow for some overlap <3
  }
  // .setGravityX(-1+(Math.random()*2)) works; 
  // we could use this for a localized wind force? random per mission, and/or with vector calcs for wind tower!

  preUpdate(time, delta){
    super.preUpdate(time, delta);
    
    this.depth = this.body.position.y; //depth sorting

    if(game.getFrame() % 30 == 0){
      let uAngle = Math.floor((this.body.angle / (Math.PI/4)) + 0.5) +4;
      if( !this.body.speed ){
        this.play('ratty_s');
      }else{
        switch (uAngle) {
          case 1:
          case 2:
            this.play('ratty_n');
            break;
          case 0:
          case 8:
            this.play('ratty_w');
            break;
          case 3:
          case 4:
          case 5:
            this.play('ratty_e');
            break;
          case 6:
          case 7:
          default:
            this.play('ratty_s');
            break;
        }
      }
    }
  }
}
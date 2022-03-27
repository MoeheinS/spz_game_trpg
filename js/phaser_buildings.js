class Tower extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, group) {
    super(scene, x, y);
    this.setPosition(x, y);

    scene.add.existing(this);
    
    let offset = ((74*32)+55);

    this.anims.create({
      key: 'tower_idle',
      frames: this.anims.generateFrameNumbers('buildings', { frames: [ offset, offset+1, offset+2, offset+3, offset+4, offset+5, offset+6, offset+7 ] }),
      frameRate: 4,
      repeat: -1
    });
    this.play("tower_idle");

    for (let i = 1; i < 16; i++) {
      this.anims.create({
        key: 'tower_'+i,
        frames: this.anims.generateFrameNumbers('buildings', { frames: [ offset+Math.floor(i/2) ] }),
        frameRate: 4,
        repeat: -1
      });
    }
    this.anims.create({
      key: 'tower_16',
      frames: this.anims.generateFrameNumbers('buildings', { frames: [ offset ] }),
      frameRate: 4,
      repeat: -1
    });

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

    // find some superior method of setting angle...
    // if(game.getFrame() % 30 == 0){
    //   let uAngle = Math.floor((this.body.angle / (Math.PI/4)) + 0.5) +4;
    // }    
    if(game.getFrame() % 20 == 0){
      var closest = null;
      var min = 90000;
      var x = this.body.position.x;
      var y = this.body.position.y;
      var maxDistance = 40*16;
      // console.warn(x,y);

      group_allies.getChildren().forEach((t)=>{
        var distance = Phaser.Math.Distance.Between(x, y, t.body.position.x, t.body.position.y);
        if (distance <= maxDistance) {
          if (distance < min) {
            closest = t;
            min = distance;
          }
        }
        // console.table(closest.body.position ? closest.body.position : 'bap');
        if( closest.body ){
          var angle = Phaser.Math.Angle.Between(x, y, closest.body.position.x, closest.body.position.y);
          // console.log(angle/Math.PI);
          // W = -1 and 1, s = 0.5, n = -0.5, e = 0
          var cleanAngle = 1+(angle/Math.PI); // go from 0 to 2, ie 8 segments of 0.25
          var angleSegment = Math.floor(cleanAngle/0.125)+1; //goes 1 to 16, 1 and 16 being W
          // console.log(angleSegment); 
          this.play("tower_"+angleSegment); 
        }
      });  
    } 
  }
}
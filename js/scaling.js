// use the engine tick event to control our view
Events.on(engine, 'beforeTick', function() {
  var translate;

  // mouse wheel controls zoom
  var scaleFactor = mouse.wheelDelta * -0.1;
  if (scaleFactor !== 0) {
      if ((scaleFactor < 0 && boundsScale.x >= 0.6) || (scaleFactor > 0 && boundsScale.x <= 1.2)) {
          boundsScaleTarget += scaleFactor;
      }
  }

  // if zoomed in, disable smoothing, once zoomed out enable it. To preserve pixel art
  render.context.imageSmoothingEnabled = (boundsScaleTarget >= 1) ? true : false;

  // if scale has changed
  if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
      // smoothly tween scale factor
      scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
      boundsScale.x += scaleFactor;
      boundsScale.y += scaleFactor;

      // scale the render bounds
      render.bounds.max.x = render.bounds.min.x + render.options.width * boundsScale.x;
      render.bounds.max.y = render.bounds.min.y + render.options.height * boundsScale.y;

      // translate so zoom is from centre of view
      translate = {
          x: render.options.width * scaleFactor * -0.5,
          y: render.options.height * scaleFactor * -0.5
      };

      Bounds.translate(render.bounds, translate);

      // update mouse
      Mouse.setScale(mouse, boundsScale);
      Mouse.setOffset(mouse, render.bounds.min);
  }

  // get vector from mouse relative to centre of viewport
  var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
      centreDist = Vector.magnitude(deltaCentre);

  // translate the view if mouse has moved over 50px from the centre of viewport
  var thresh = 50; //reHi / 6;
  if (centreDist > thresh && mouseConstraint.mouse.button === 2 && game_shift == false) {
      // create a vector to translate the view, allowing the user to control view speed
      var direction = Vector.normalise(deltaCentre),
          speed = Math.min(10, Math.pow(centreDist - thresh, 2) * 0.0002);

      translate = Vector.mult(direction, speed);

      // prevent the view moving outside the world bounds
      if (render.bounds.min.x + translate.x < world.bounds.min.x){
        translate.x = world.bounds.min.x - render.bounds.min.x;
      }
      if (render.bounds.max.x + translate.x > world.bounds.max.x){
        translate.x = world.bounds.max.x - render.bounds.max.x;
      }
      if (render.bounds.min.y + translate.y < world.bounds.min.y){
        translate.y = world.bounds.min.y - render.bounds.min.y;
      }
      if (render.bounds.max.y + translate.y > world.bounds.max.y){
        translate.y = world.bounds.max.y - render.bounds.max.y;
      }

      // move the view
      Bounds.translate(render.bounds, translate);

      // we must update the mouse too
      Mouse.setOffset(mouse, render.bounds.min);
  }

  // unsure if basing it on viewport centre is smart, but it works :D
  if (centreDist > thresh && mouseConstraint.mouse.button === 2 && game_shift == true) {
    // speed of rotation based on distance from center of viewport
    var speed = Math.min(0.03, Math.pow(centreDist - thresh, 2) * 0.0000002);
    // control direction of rotation based on what side the mouse is on
    if(mouseConstraint.mouse.position.x < viewportCentre.x ){
      speed = speed*-1;
    }

    Composite.rotate(world, speed, viewportCentre);

    // we must update the mouse too
    Mouse.setOffset(mouse, render.bounds.min);

    // NOTE
    /*
      This exposes several flaws;
      - whle body positions are updated, body-position-based custom coordinates are NOT
      - sprite rendering is based on body dimensions and rectangular -> fix by using circles or rendering sprites independant of body dimensions
    */
  }
});

class Inputs {
  static THRUST = 360;
  static REVERSE_THRUST = 180;
  static TURN_RATE = 2.4;

  magpie;

  constructor(magpie) {
    this.magpie = magpie;
  }

  handleKeyDown(delta) {
    // Forward
    if (keyIsDown("w")) {
      this.magpie.physics.thrust(Inputs.THRUST, delta);
    }

    // Reverse
    if (keyIsDown("s")) {
      this.magpie.physics.thrust(-Inputs.REVERSE_THRUST, delta);
    }

    // Turn left
    if (keyIsDown("a")) {
      this.magpie.physics.rotate(-Inputs.TURN_RATE, delta);
    }

    // Turn right
    if (keyIsDown("d")) {
      this.magpie.physics.rotate(Inputs.TURN_RATE, delta);
    }

    // Tractor beam
    this.magpie.enableBeam(keyIsDown(" "));
  }
}

const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

function keyPressed() {
  if (game && (key === "~" || key === "`")) {
    game.debug = !game.debug;
  }
  if (SCROLL_KEYS.includes(key)) {
    return false;
  }
}

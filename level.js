
class Level {
  static LIVES_PAD_BOTTOM = 40;
  static LIVES_PAD_LEFT = 40;
  static LIVES_GAP = 18;
  static LIVES_SCALE = 0.6;
  static HUD_TEXT_SIZE = 48;
  static HUD_PAD = 20;

  name;
  junk;
  time;

  constructor(levelConfig) {
    this.name = levelConfig.name;
    this.junk = [];
    for (let i = 0; i < levelConfig.junk; i++) {
      this.junk.push(new Junk());
    }
    this.time = {
      initial: levelConfig.time,
      elapsed: 0,
    };
  }

  timeLeft() {
    return Math.max(0, this.time.initial - this.time.elapsed);
  }

  draw(score, lives) {
    push();

    // Timer
    const time = timeToStringParts(this.timeLeft());

    fill("#ffffff");
    noStroke();
    textSize(Level.HUD_TEXT_SIZE);
    textAlign(LEFT, TOP);

    text(
      time.minutes + ":" + time.seconds,
      Level.HUD_PAD,
      Level.HUD_PAD
    );

    // Score
    textAlign(RIGHT, TOP);

    text(
      score,
      width - Level.HUD_PAD,
      Level.HUD_PAD
    );

    // Spare lives
    for (let i = 0; i < lives - 1; i++) {
      push();

      translate(
        Level.LIVES_PAD_LEFT + i * Level.LIVES_GAP,
        height - Level.LIVES_PAD_BOTTOM
      );

      scale(Level.LIVES_SCALE);

      Magpie.drawMagpie({
        rotation: 0,
        beam: false
      });

      pop();
    }

    // Draw junk
    for (const junk of this.junk) {
      junk.draw();
    }

    pop();
  }

  move(delta, { countTime = true } = {}) {
    if (countTime) {
      this.time.elapsed += delta;
    }

    for (const junk of this.junk) {
      junk.move(delta);
    }
  }

  removeJunk(junkToRemove) {
    this.junk = this.junk.filter((j) => j !== junkToRemove);
  }
}

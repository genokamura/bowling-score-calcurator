export class Bowling {
  private rolls: number[] = [];

  public roll(pins: number): void {
    this.rolls.push(pins);
  }

  public score(): number {
    let totalScore = 0;
    let rollIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        totalScore += 10 + this.strikeBonus(rollIndex);
        rollIndex++;
      } else if (this.isSpare(rollIndex)) {
        totalScore += 10 + this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        totalScore += this.framePins(rollIndex);
        rollIndex += 2;
      }
    }

    return totalScore;
  }

  public currentFrame(): number {
    let frame = 1;
    let rollIndex = 0;
  
    while (rollIndex < this.rolls.length && frame <= 10) {
      if (this.isStrike(rollIndex)) {
        rollIndex++;
      } else {
        rollIndex += 2;
      }
      frame++;
    }
  
    return frame > 10 ? 10 : frame;
  }

  public frameScores(): number[] {
    const frameScores: number[] = [];
    let rollIndex = 0;
  
    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        frameScores.push(10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2]);
        rollIndex++;
      } else if (this.isSpare(rollIndex)) {
        frameScores.push(10 + this.rolls[rollIndex + 2]);
        rollIndex += 2;
      } else {
        frameScores.push(this.rolls[rollIndex] + this.rolls[rollIndex + 1]);
        rollIndex += 2;
      }
    }
  
    return frameScores;
  }

  public isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10;
  }

  public isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  public isGameFinished(): boolean {
    return !isNaN(this.score());
  }

  public getRolls(): number[] {
    return this.rolls;
  }

  private strikeBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  private spareBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 2];
  }

  private framePins(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
  }
}

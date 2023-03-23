import React from 'react';
import { Bowling } from './bowling';
import Frame from './Frame';

type BowlingScoreboardProps = {
  bowling: Bowling;
  rolls: number[];
};

const BowlingScoreboard: React.FC<BowlingScoreboardProps> = ({ bowling, rolls }) => {
  const renderFrames = () => {
    const frameScores = bowling.frameScores();
    const frames = [];
    let rollIndex = 0;
    let totalScore = 0;

    for (let i = 0; i < 10; i++) {
      const isStrike = bowling.isStrike(rollIndex);
      const isSpare = !isStrike && bowling.isSpare(rollIndex);

      const roll1 = isStrike ? "X" : rolls[rollIndex] === undefined ? "" : rolls[rollIndex] || "-";
      let roll2 = isStrike ? "" : isSpare ? "/" : rolls[rollIndex + 1]  === undefined ? "" : rolls[rollIndex + 1] || "-";

      let roll3 = "";
      if (i === 9) {
        roll2 = bowling.isStrike(rollIndex + 1) ? "X" : isSpare ? "/" : rolls[rollIndex + 1]  === undefined ? "" : rolls[rollIndex + 1] || "-";
        if (isStrike || isSpare) {
          roll3 = bowling.isStrike(rollIndex + 2) ? "X" : bowling.isStrike(rollIndex + 1) && bowling.isSpare(rollIndex + 2) ? "/" : rolls[rollIndex + 2]  === undefined ? "" : rolls[rollIndex + 2].toString() || "-";
        }
        rollIndex += 2;
      } else {
        rollIndex += isStrike ? 1 : 2;
      }

      totalScore += frameScores[i] !== undefined ? frameScores[i] : 0;
      totalScore = isNaN(totalScore) ? 0 : totalScore;

      frames.push(
        <Frame key={i} frameNumber={i + 1} roll1={roll1.toString()} roll2={roll2.toString()} roll3={roll3} frameScore={totalScore} />
      );
    }

    return frames;
  };

  return <div className="frames">{renderFrames()}</div>;
};

export default BowlingScoreboard;

